'use client';

import { useEffect, useRef, useState } from 'react';

type ContextMenuProps = {
  x: number;
  y: number;
  onClose: () => void;
  actions: { label: string; onClick: () => void; danger?: boolean }[];
};

/**
 * ContextMenu — 右键菜单（完全重构为 Tailwind CSS）。
 */
export function ContextMenu({ x, y, onClose, actions }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed z-[1000] min-w-[160px] bg-appBg border border-borderSubtle rounded-md shadow-xl py-1 font-sans text-[13px] text-fg"
      style={{ left: x, top: y }}
    >
      {actions.map((a, i) => (
        <div
          key={i}
          className={`px-3 py-1.5 cursor-pointer transition-colors duration-120 hover:bg-sidebarHoverBg ${
            a.danger ? 'text-danger' : ''
          }`}
          onClick={() => {
            a.onClick();
            onClose();
          }}
        >
          {a.label}
        </div>
      ))}
    </div>
  );
}

type PromptDialogProps = {
  title: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
};

/**
 * PromptDialog — 文本输入弹窗（完全重构为 Tailwind CSS）。
 */
export function PromptDialog({ title, defaultValue, onConfirm, onCancel }: PromptDialogProps) {
  const [value, setValue] = useState(defaultValue ?? '');
  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center font-sans"
      onClick={onCancel}
    >
      <div
        className="bg-appBg border border-borderSubtle rounded-lg shadow-2xl p-6 min-w-[340px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="m-0 mb-3.5 text-[15px] font-semibold text-fg">{title}</h3>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) onConfirm(value.trim());
            if (e.key === 'Escape') onCancel();
          }}
          className="w-full px-2.5 py-2 mb-4 border border-borderSubtle rounded-sm text-sm text-fg bg-appBg outline-none focus:border-accent"
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-3.5 py-1.5 border border-borderSubtle bg-sidebarBg rounded-sm cursor-pointer text-sm text-fg hover:bg-sidebarHoverBg transition-colors duration-120"
          >
            取消
          </button>
          <button
            onClick={() => value.trim() && onConfirm(value.trim())}
            disabled={!value.trim()}
            className="px-3.5 py-1.5 border border-borderSubtle bg-sidebarBg rounded-sm cursor-pointer text-sm text-fg hover:bg-sidebarHoverBg transition-colors duration-120 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}

type ConfirmDialogProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * ConfirmDialog — 确认弹窗（完全重构为 Tailwind CSS）。
 */
export function ConfirmDialog({ title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center font-sans"
      onClick={onCancel}
    >
      <div
        className="bg-appBg border border-borderSubtle rounded-lg shadow-2xl p-6 min-w-[340px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="m-0 mb-3.5 text-[15px] font-semibold text-fg">{title}</h3>
        <p className="m-0 mb-4 text-[13px] text-fgSecondary leading-relaxed">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-3.5 py-1.5 border border-borderSubtle bg-sidebarBg rounded-sm cursor-pointer text-sm text-fg hover:bg-sidebarHoverBg transition-colors duration-120"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-3.5 py-1.5 border border-danger bg-danger text-white rounded-sm cursor-pointer text-sm hover:opacity-90 transition-opacity duration-120"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
}