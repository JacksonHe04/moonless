'use client';

/**
 * Spinner — 加载指示（完全重构为 Tailwind CSS）。
 */

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md';
}

export function Spinner({ size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    xs: 'w-3 h-3 border',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
  }[size];

  return (
    <span
      className={`inline-block rounded-full border-t-transparent animate-spin border-current ${sizeClasses}`}
      role="status"
      aria-label="loading"
    />
  );
}