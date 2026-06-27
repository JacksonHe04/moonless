'use client';

/**
 * SearchResults — 搜索结果列表（完全重构为 Tailwind CSS）。
 */

import type { SearchResult } from '@/hooks/useSearchIndex';

type SearchResultsProps = {
  results: SearchResult[];
  query: string;
  onPick: (result: SearchResult) => void;
};

export function SearchResults({ results, query, onPick }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-xs text-fgMuted p-6 text-center select-none font-sans">
        {query ? '无匹配结果' : '输入关键词开始搜索'}
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-0.5 max-h-80 overflow-y-auto list-none m-0 p-0">
      {results.map((r) => (
        <li
          key={r.id}
          onClick={() => onPick(r)}
          className="p-2.5 rounded cursor-pointer transition-colors duration-120 hover:bg-sidebarHoverBg select-none font-sans"
        >
          <div className="text-xs font-semibold text-fg">{r.title}</div>
          <div className="text-[10px] text-fgMuted font-mono mt-0.5 truncate" title={r.path || r.id}>
            {r.path || r.id}
          </div>
        </li>
      ))}
    </ul>
  );
}
