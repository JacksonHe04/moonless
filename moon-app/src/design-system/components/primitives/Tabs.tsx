'use client';

/**
 * Tabs — 图标切换（完全重构为 Tailwind CSS，高度增加，仅显示 3 个图标不需要文字）。
 */

import { type ReactNode } from 'react';

export interface TabItem {
  id: string;
  icon: ReactNode;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div className="flex items-center gap-1 w-full justify-around" role="tablist">
      {items.map((item) => {
        const isActive = item.id === activeId;
        const activeClasses = isActive
          ? 'border-accent text-accent font-semibold bg-accentMuted/30'
          : 'border-transparent text-fgSecondary hover:text-fg hover:bg-sidebarHoverBg/40';

        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            title={item.label}
            className={`flex-1 flex items-center justify-center py-2.5 rounded-md border-b-2 transition-all duration-120 cursor-pointer focus:outline-none ${activeClasses}`}
          >
            <span className="flex items-center justify-center">
              {item.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}