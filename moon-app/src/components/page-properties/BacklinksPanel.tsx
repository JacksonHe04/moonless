'use client';

/**
 * BacklinksPanel — 反向链接面板（完全重构为 Tailwind CSS，并使用 Lucide 图标）。
 */

import { useEffect, useState } from 'react';
import { extractMdLinks } from '@/lib/double-link';
import { ChevronDown, ChevronRight } from 'lucide-react';

type BacklinksPanelProps = {
  currentPath: string;
  currentNotionId: string | undefined;
  allFiles: { path: string; text: string }[];
  onPickFile: (path: string) => void;
};

export function BacklinksPanel({ currentPath, currentNotionId, allFiles, onPickFile }: BacklinksPanelProps) {
  const [open, setOpen] = useState(false);
  const [backlinks, setBacklinks] = useState<{ path: string; snippet: string }[]>([]);

  useEffect(() => {
    const result: { path: string; snippet: string }[] = [];
    const currentFileName = currentPath.split('/').pop() ?? '';
    for (const f of allFiles) {
      if (f.path === currentPath) continue;
      const links = extractMdLinks(f.text);
      for (const link of links) {
        const matchByFile = link.href.endsWith(currentFileName);
        const matchById = currentNotionId ? link.href.includes(currentNotionId) : false;
        if (matchByFile || matchById) {
          result.push({ path: f.path, snippet: link.text });
        }
      }
    }
    setBacklinks(result);
  }, [currentPath, currentNotionId, allFiles]);

  return (
    <div className="flex flex-col border border-borderSubtle bg-sidebarBg/30 p-2.5 rounded hover:border-accent/40 transition-colors">
      <div
        className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-fg select-none"
        onClick={() => setOpen(!open)}
      >
        <span className="text-fgMuted">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <span>反向链接 ({backlinks.length})</span>
      </div>
      {open && (
        <ul className="flex flex-col gap-1 mt-2 pl-3 border-l border-borderSubtle/60 list-none">
          {backlinks.length === 0 ? (
            <li className="text-[11px] text-fgMuted font-sans italic p-1">暂无反向链接</li>
          ) : (
            backlinks.map((b, i) => (
              <li
                key={i}
                onClick={() => onPickFile(b.path)}
                className="text-[11px] font-sans text-fgSecondary hover:text-accent hover:underline cursor-pointer py-0.5 truncate"
                title={b.path}
              >
                {b.path}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
