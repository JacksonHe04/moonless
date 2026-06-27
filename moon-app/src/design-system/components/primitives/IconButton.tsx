'use client';

/**
 * IconButton — 方形按钮，只放图标（完全重构为 Tailwind CSS）。
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type IconButtonSize = 'sm' | 'md';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: IconButtonSize;
  active?: boolean;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, size = 'md', active = false, className = '', ...rest },
    ref,
  ) {
    const sizeClasses = size === 'sm' ? 'w-7 h-7 text-sm' : 'w-9 h-9 text-base';
    const activeClasses = active
      ? 'bg-accentMuted text-accent border-accent/20'
      : 'text-fgSecondary hover:bg-sidebarHoverBg hover:text-fg';

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded border border-transparent transition-colors duration-120 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none ${sizeClasses} ${activeClasses} ${className}`}
        {...rest}
      >
        <span className="flex items-center justify-center w-full h-full flex-shrink-0">{icon}</span>
      </button>
    );
  },
);