/**
 * MOON Design Tokens — Spacing
 *
 * 4px 基线，参考 Tailwind 的 4pt 节奏 + Notion 的紧凑感。
 * 不引入 Tailwind，仅用这套常量。
 */

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export type SpacingKey = keyof typeof spacing;

// 语义化间距别名
export const space = {
  // 组件内部 padding
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[3],
  lg: spacing[4],
  xl: spacing[6],
  // 区块之间
  section: spacing[8],
  page: spacing[12],
} as const;