'use client';

/**
 * Button — 按钮组件（完全重构为 Tailwind CSS）。
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'ghost',
    size = 'md',
    loading = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    children,
    disabled,
    className = '',
    ...rest
  },
  ref,
) {
  // 变体样式
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accentHover active:bg-accent',
    ghost: 'text-fgSecondary hover:bg-sidebarHoverBg hover:text-fg',
    danger: 'bg-danger text-white hover:opacity-90 active:opacity-100',
  }[variant];

  // 尺寸样式
  const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-xs gap-1.5 h-7' : 'px-3.5 py-1.5 text-sm gap-2 h-9';
  const widthClasses = fullWidth ? 'w-full flex' : 'inline-flex';

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${widthClasses} items-center justify-center font-medium font-sans rounded transition-colors duration-120 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none ${variantClasses} ${sizeClasses} ${className}`}
      {...rest}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : iconLeft ? (
        <span className="flex items-center justify-center flex-shrink-0">{iconLeft}</span>
      ) : null}
      {children && <span className="truncate">{children}</span>}
      {iconRight && !loading && (
        <span className="flex items-center justify-center flex-shrink-0">{iconRight}</span>
      )}
    </button>
  );
});