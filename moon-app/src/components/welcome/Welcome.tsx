'use client';

/**
 * Welcome — 主区空状态（完全重构为 Tailwind CSS，消除 Welcome.css 依赖）。
 */

import { FileText, Search, PanelLeft, PanelRight, Command, Save, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Kbd } from '@/design-system/components/primitives/Kbd';
import { SidebarItem } from '@/design-system/components/composed/SidebarItem';

export interface WelcomeProps {
  recentPaths: string[];
  hasWorkspace: boolean;
  onPickRecent?: (path: string) => void;
}

export function Welcome({ recentPaths, hasWorkspace, onPickRecent }: WelcomeProps) {
  return (
    <div className="max-w-2xl mx-auto py-16 px-6 flex flex-col gap-10 select-none font-sans text-fg">
      {/* Hero section */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-wider text-accent">MOON</h1>
        <p className="text-lg text-fgSecondary font-medium">
          你的知识，已经回到你的硬盘。
        </p>
        <p className="text-sm text-fgMuted mt-1 max-w-md mx-auto">
          {hasWorkspace
            ? '在左侧选择一个 Markdown 页面开始，或者使用顶栏搜索与全局快捷键。'
            : '点击左上方"选择工作区"，选择 Notion 数据拉取后存储的本地目录。'}
        </p>
      </div>

      {/* Intro cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="p-4 border border-borderSubtle/60 rounded-lg flex flex-col gap-2 bg-sidebarBg/40 hover:bg-sidebarHoverBg/60 transition-colors duration-150">
          <h2 className="flex items-center gap-1.5 text-sm font-bold text-fg">
            <ArrowDownToLine size={14} className="text-accent" />
            ESCAPE
          </h2>
          <p className="text-xs text-fgSecondary leading-relaxed">
            从 Notion / 飞书 / 语雀拉回本地，遵循 Google OKF 标准。
          </p>
        </section>
        <section className="p-4 border border-borderSubtle/60 rounded-lg flex flex-col gap-2 bg-sidebarBg/40 hover:bg-sidebarHoverBg/60 transition-colors duration-150">
          <h2 className="flex items-center gap-1.5 text-sm font-bold text-fg">
            <FileText size={14} className="text-accent" />
            MOON
          </h2>
          <p className="text-xs text-fgSecondary leading-relaxed">
            本地 WYSIWYG 编辑器：三栏布局、双链跳转、自适应侧栏。
          </p>
        </section>
        <section className="p-4 border border-borderSubtle/60 rounded-lg flex flex-col gap-2 bg-sidebarBg/40 hover:bg-sidebarHoverBg/60 transition-colors duration-150">
          <h2 className="flex items-center gap-1.5 text-sm font-bold text-fg">
            <ArrowUpFromLine size={14} className="text-accent" />
            SHOT
          </h2>
          <p className="text-xs text-fgSecondary leading-relaxed">
            混合检索、图谱分析与 Agent API — 让本地知识无缝对接 AI。
          </p>
        </section>
      </div>

      {/* Shortcuts */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-fg border-b border-borderSubtle/60 pb-1.5 flex items-center gap-1.5">
          快捷键
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2.5 text-xs text-fgSecondary">
            <Kbd>⌘ K</Kbd>
            <span>全局搜索</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-fgSecondary">
            <Kbd>⌘ S</Kbd>
            <span>立即保存</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-fgSecondary">
            <Kbd>⌘ B</Kbd>
            <span>折叠 / 展开左栏</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-fgSecondary">
            <Kbd>⌘ .</Kbd>
            <span>折叠 / 展开右栏</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-fgSecondary">
            <Kbd>⌘ + 点击</Kbd>
            <span>跟随双向链接</span>
          </div>
        </div>
      </section>

      {/* Panes */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-fg border-b border-borderSubtle/60 pb-1.5">
          界面说明
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5 text-xs text-fgSecondary leading-relaxed">
            <PanelLeft size={14} className="text-fgMuted mt-0.5" />
            <span>
              <strong>左栏</strong>：本地文档树，支持新建、重命名、删除及拖拽大小。
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-fgSecondary leading-relaxed">
            <Command size={14} className="text-fgMuted mt-0.5" />
            <span>
              <strong>顶栏</strong>：当前页面面包屑路径，支持返回首页或跳出浏览器查看。
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-fgSecondary leading-relaxed">
            <PanelRight size={14} className="text-fgMuted mt-0.5" />
            <span>
              <strong>右栏</strong>：包含文档的 Frontmatter 属性、大纲目录 (TOC) 与双向反向链接。
            </span>
          </div>
        </div>
      </section>

      {/* Recent Files */}
      {recentPaths.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-bold text-fg border-b border-borderSubtle/60 pb-1.5 flex items-center gap-1.5">
            <Search size={14} className="text-fgMuted" />
            最近打开
          </h2>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1">
            {recentPaths.map((p) => (
              <div key={p} className="hover:bg-sidebarHoverBg/40 rounded transition-colors duration-100">
                <SidebarItem
                  label={p}
                  depth={0}
                  onClick={() => onPickRecent?.(p)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-8 flex items-center justify-center gap-1.5 text-[10px] text-fgMuted border-t border-borderSubtle/30 pt-6">
        <Save size={12} />
        <span>MOON · ESCAPE · SHOT — knowledge, no monthly seat fee.</span>
      </footer>
    </div>
  );
}