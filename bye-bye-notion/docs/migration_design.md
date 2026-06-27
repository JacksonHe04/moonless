# Notion to OKF Markdown Migration Design

本文档记录了将 Notion 文档备份拉取并转换为符合 Google OKF（Open Knowledge Format）规范的 Markdown 的技术方案设计。

## 1. 迁移目标与范围

将 Notion 个人工作空间中的所有页面（以指定的顶级页面为根节点）拉取到本地，并转换为树状结构的本地 Markdown 文件夹：
- 所有导出的文档存放于 `leave-the-moon/local/` 目录。
- 保持 Notion 中的父子包含关系（即嵌套目录结构）。
- **扁平/嵌套自适应路径规范**：
  - 如果一个 Notion 文档（Page 或 Database）**没有子节点**（对页面代表无子页面/子数据库，对数据库代表行数为 0），则它直接被导出为叶子文件 `标题.md`。
  - 如果文档**拥有子节点**，则在父级目录下创建以该文档标题命名的子文件夹，将其内容导出为该目录下的 `index.md`，其子文档作为其下的文件或子文件夹存在。
- 生成的 Markdown 文档包含符合 OKF 规范的 YAML frontmatter 以及解析后的 Markdown 正文。
- 目录名冲突时，添加自增数字后缀（如 `-1`）进行区分。

## 2. 字段映射关系

根据 `AGENTS.md` 的规定，Notion 属性与 OKF YAML 属性映射如下：

| Notion Field | OKF Frontmatter Key | 说明 |
|---|---|---|
| `id` | `notion_id` | Notion 的页面/数据库 UUID |
| `title` | `title` | 文档标题 |
| `url` | `resource` | 指向原 Notion 页面的 URL |
| `created_time` | `created_time` | Notion 创建时间 |
| `last_edited_time` | `last_edited_time` | Notion 最后修改时间，同时也是 OKF 的 `timestamp` |
| `parent.type` | `notion_parent_type` | 父节点类型 (如 workspace, page_id, database_id, data_source_id) |
| `parent.page_id` / `database_id` | `notion_parent_id` | 父节点 UUID |

同时，对于属于数据库行（Row Page）的文档，所有的自定义 properties 属性经过扁平化转换，存放在 frontmatter 的 `properties` 嵌套组中以避免字段名与核心 OKF 字段冲突。

OKF Frontmatter 示例（数据库行页面，UUID 均为占位符）：
```yaml
---
type: Notion Page
title: "SS HW 8"
resource: "https://app.notion.com/p/SS-HW-8-00000000000000000000000000000abc"
timestamp: "2026-05-25T08:35:00.000Z"
notion_id: "00000000-0000-0000-0000-000000000abc"
created_time: "2026-05-08T11:21:00.000Z"
last_edited_time: "2026-05-25T08:35:00.000Z"
notion_parent_type: "data_source_id"
notion_parent_id: "00000000-0000-0000-0000-000000000def"
properties:
  Course:
    - 00000000-0000-0000-0000-000000000012
  Done: false
  Type: Homework
---
```

## 3. 技术方案设计

### 3.1 页面发现与目录树预构建（Pre-scan）
由于我们需要在渲染 Markdown 正文时把指向 Notion 其他页面的 URL 重写为本地的**相对路径链接**，并且要根据文档是否拥有子节点来区分是创建 `Title.md` 文件还是 `Title/index.md`，我们采用**两阶段设计**：

#### 第一阶段：预扫描与路径映射（Pre-scan）
1. **拉取搜索缓存**：使用 `searchAll` 一次性拉取工作空间可见的 Page 与 Data Source 缓存。
2. **递归构建嵌套树**：从根页面 UUID 出发自顶向下建立页面父子树。
3. **识别叶子节点与路径分配**：
   - 每一个 Page 在扫描之初会结合 block layers 和 search 缓存分析其子页面/子数据库数量。
   - 如果子实体总数等于 0，则该 Page 标记为叶子节点（isLeaf = true），分配路径为 `parentDir / SanitizedTitle.md`。
   - 如果子实体总数大于 0，分配路径为 `parentDir / SanitizedTitle / index.md`。
   - 数据库实体则通过检索它关联的 Notion 新数据模型（2025 Model）下的所有 data sources 里的行数。若所有 data sources 的行数汇总为 0，则为叶子节点 `SanitizedTitle.md`；若有数据，则为 `SanitizedTitle / index.md`，并在其下级目录递归扫描行页面。
4. **处理冲突**：检查分配的路径是否已被之前的实体抢占。如果重名冲突，追加 `-1`, `-2` 后缀防覆盖。
5. 记录 `notion_id -> local_path` 的映射。

#### 第二阶段：内容拉取与渲染写入（Export）
- 对树中的每一个节点进行具体的数据抓取和渲染，并将转换后的 Markdown 内容写入到预分配的 `localPath`。

### 3.2 Block 树拉取优化
在 BFS 抓取 block tree（`fetchAllBlocks`）时，为保证各页面正文相互隔离：
- 如果遇到 `c.type === "child_page"` 或 `c.type === "child_database"` 类型的 block，则**不把它们加入 BFS 的队列**。
- 这样能保证每次对指定页面抓取 blocks 时只拉取该页面自身包含的段落和表格等。子页面内容由后续递归它的 TreeNode 独立处理。

### 3.3 数据库新数据模型（2025 Model）多数据源支持
在 Notion 的新版 API 数据模型下，内联或全页数据库是一个外层 Database 容器，并不直接挂靠 rows 页面。
- 当扫描到 `child_database` 时，首先调用 `client.databases.retrieve` 拿到它关联的 `data_sources` 数组。
- 遍历 `data_sources` 数组，对每个有效的 `data_source_id` 分别调用 `queryAllRows` 获取该数据源下的所有行。
- 将这些数据源下的行全部合并并去重，建立其与父级 Database 的子集包含关系。

### 3.4 数据库自定义属性（Properties）扁平化解析
为了保留数据库行重要的多维元数据，在导出行页面为 Markdown 时，设计了 `flattenProperties` 转化函数：
- 支持 `checkbox`（布尔值）、`number`（数值）、`select` / `status`（字符串名）、`multi_select`（多选字符串数组）、`date`（日期或日期段 `start ~ end`）、`rich_text`（组合纯文本）、`formula` 等类型。
- 将解析后的数据结构扁平化后写入 frontmatter 下的 `properties` 组内。

### 3.5 页面正文与汇总渲染规范
- **超链接无损改写**：在渲染 rich_text 的 href 时，如果指向已有的 Notion 页面 ID，根据两阶段的路径映射计算出当前页面文件到目标相对文件的相对路径并写入，以保护本地交叉引用的有效性。在此过程中，**不添加任何 `📄` 或 `📊` 前缀**，以尊重原数据，防范对源信息的破坏。
- **数据库汇总列表按数据源分组**：对于 Database 实体的 `index.md`，不再将所有数据行混在单一列表，而是根据有数据的 `Data Source`（例如“Great Escape Database”和“New data source”）分别作为二级标题分组展示，并且自动忽略 0 行的空白数据源，以清晰还原 Notion 表格的分类结构。
