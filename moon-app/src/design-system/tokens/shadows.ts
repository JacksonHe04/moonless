/**
 * MOON Design Tokens — Shadows
 *
 * 克制。Notion 几乎不靠 shadow 制造层次，全靠 hairline border。
 * 这里只给浮层 / popover / modal 准备三档。
 */

export const shadows = {
  none: 'none',
  // 极轻，用于 tooltip、小 popover
  sm: '0 1px 2px var(--moon-shadow-color)',
  // 标准，菜单、combobox 下拉
  md: '0 4px 12px var(--moon-shadow-color)',
  // 重要，modal、dialog
  lg: '0 12px 36px var(--moon-shadow-color)',
} as const;

export type ShadowKey = keyof typeof shadows;