/**
 * 关联文档解析器。
 *
 * 输入：所有 markdown 文件的 { path, text } 列表 + 当前文件路径。
 * 输出：
 * - outgoing: 当前文件里 [[link]] 或 [label](path) 链出去的目标（按出现顺序）
 * - incoming: 别的文件链向当前文件（按文件名排序，即反向链接）
 *
 * 双链识别：
 * - [[path]]           → 精确路径
 * - [[path|alias]]     → 精确路径 + 显示别名
 * - [label](./path.md) → 标准 Markdown 相对路径链接
 */

import { resolveMdPath } from './double-link';

export interface RelatedDoc {
  /** 相对工作区的目标路径（解析后） */
  path: string;
  /** 显示名（取 basename，无后缀） */
  label: string;
  /** 引用类型：outgoing（当前文档主动链出去）/ incoming（被引用） */
  refType: 'outgoing' | 'incoming';
}

export interface ResolvedRelated {
  outgoing: RelatedDoc[];
  incoming: RelatedDoc[];
}

interface Input {
  /** 当前文档的相对路径（不含工作区） */
  currentPath: string;
  /** 全部 .md 文件 */
  allFiles: { path: string; text: string }[];
}

const WIKILINK_RE = /\[\[([^\]\n]+?)\]\]/g;

// 从路径拿 label（basename 去掉 .md）
function labelOf(path: string): string {
  const base = path.split('/').pop() ?? path;
  return base.replace(/\.md$/i, '');
}

// 抽取所有链接（包括 Wikilink 与标准 Markdown 链接）
function extractAllLinks(text: string): { label: string; href: string; isWiki: boolean }[] {
  if (!text) return [];
  // 清理代码块，防止误识别
  const cleaned = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  const out: { label: string; href: string; isWiki: boolean }[] = [];

  // 1. 匹配 Wikilinks [[path]] 或 [[path|alias]]
  let m: RegExpExecArray | null;
  WIKILINK_RE.lastIndex = 0;
  while ((m = WIKILINK_RE.exec(cleaned)) !== null) {
    const inner = (m[1] ?? '').trim();
    if (!inner) continue;
    const parts = inner.split('|');
    const target = parts[0]?.trim() ?? '';
    const label = parts[1]?.trim() ?? target;
    if (target) {
      out.push({ label, href: target, isWiki: true });
    }
  }

  // 2. 匹配标准 Markdown 相对链接 [label](./path.md)
  const mdLinkRe = /\[([^\]]*?)\]\(([^)\n]+?)\)/g;
  while ((m = mdLinkRe.exec(cleaned)) !== null) {
    const label = (m[1] ?? '').trim();
    const href = (m[2] ?? '').trim();
    // 排除外部链接 (如 http://, https://, mailto:, etc.)
    if (href && !/^[a-z]+:\/\//i.test(href) && !href.startsWith('mailto:') && !href.startsWith('#')) {
      out.push({ label, href, isWiki: false });
    }
  }

  return out;
}

export function resolveRelated({ currentPath, allFiles }: Input): ResolvedRelated {
  const allPaths = new Set(allFiles.map((f) => f.path));

  // outgoing：当前文档链出去的目标
  const current = allFiles.find((f) => f.path === currentPath);
  const outgoing: RelatedDoc[] = [];
  if (current) {
    const links = extractAllLinks(current.text);
    const seen = new Set<string>();
    for (const link of links) {
      let resolved: string | null = null;
      if (link.isWiki) {
        if (link.href.includes('/') || link.href.endsWith('.md')) {
          resolved = resolveMdPath(current.path, link.href, allPaths);
        } else {
          // 尝试以 basename 进行匹配
          const lower = link.href.toLowerCase();
          const candidate = Array.from(allPaths).find((p) => labelOf(p).toLowerCase() === lower);
          resolved = candidate ?? null;
        }
      } else {
        resolved = resolveMdPath(current.path, link.href, allPaths);
      }

      if (resolved && resolved !== currentPath && !seen.has(resolved)) {
        seen.add(resolved);
        outgoing.push({
          path: resolved,
          label: link.label || labelOf(resolved),
          refType: 'outgoing',
        });
      }
    }
  }

  // incoming：所有其他文件里链向当前文件的链接 (反向链接)
  const currentLabel = labelOf(currentPath);
  const incoming: RelatedDoc[] = [];
  for (const file of allFiles) {
    if (file.path === currentPath) continue;
    const links = extractAllLinks(file.text);
    const matched = links.some((link) => {
      if (link.isWiki) {
        if (link.href === currentPath) return true;
        if (link.href.toLowerCase() === currentLabel.toLowerCase()) return true;
        if (link.href.endsWith('.md') && resolveMdPath(file.path, link.href, allPaths) === currentPath) {
          return true;
        }
      } else {
        if (resolveMdPath(file.path, link.href, allPaths) === currentPath) {
          return true;
        }
      }
      return false;
    });
    if (matched) {
      incoming.push({
        path: file.path,
        label: labelOf(file.path),
        refType: 'incoming',
      });
    }
  }

  // incoming 按 label 排序
  incoming.sort((a, b) => a.label.localeCompare(b.label));

  return { outgoing, incoming };
}