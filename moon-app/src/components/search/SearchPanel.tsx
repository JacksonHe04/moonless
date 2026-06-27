'use client';

/**
 * SearchPanel — 全局搜索面板弹窗（完全重构为 Tailwind CSS，消除 search.css 依赖）。
 */

import { useState, useEffect, useRef } from 'react';
import { SearchResults } from './SearchResults';
import type { SearchResult } from '@/hooks/useSearchIndex';

type SearchPanelProps = {
  open: boolean;
  onClose: () => void;
  search: (query: string) => SearchResult[];
  onPick: (result: SearchResult) => void;
};

export function SearchPanel({ open, onClose, search, onPick }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;
  const results = search(query);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 z-[100]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-appBg border border-borderSubtle rounded-lg shadow-2xl w-full max-w-lg overflow-hidden flex flex-col p-2 gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索文件名或内容… (Esc 关闭)"
          className="w-full bg-sidebarBg/50 text-fg text-sm font-sans border border-borderSubtle rounded-md px-3.5 py-2.5 outline-none focus:border-accent focus:bg-appBg transition-colors"
        />
        <SearchResults
          results={results}
          query={query}
          onPick={(r) => {
            onPick(r);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
