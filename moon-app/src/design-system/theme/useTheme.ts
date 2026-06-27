'use client';

/**
 * useTheme — 消费 ThemeContext 的 hook。
 * 必须包在 ThemeProvider 内。
 */

import { useContext } from 'react';
import { ThemeContext, type ThemeMode, type ResolvedTheme } from './ThemeProvider';
import type { SemanticColors } from '../tokens/colors';

export interface UseThemeResult {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  colors: SemanticColors;
  // 工具
  isDark: boolean;
}

export function useTheme(): UseThemeResult {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within <ThemeProvider>');
  }
  return {
    ...ctx,
    isDark: ctx.resolved === 'dark',
  };
}