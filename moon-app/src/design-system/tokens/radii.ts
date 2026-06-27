/**
 * MOON Design Tokens — Radii
 *
 * 圆角克制，不卡通。Notion 用 3-4px 一档，本设计统一 6px 一档。
 */

export const radii = {
  none: '0',
  sm: '3px', // tag、badge、property row 左 icon 容器
  md: '6px', // 按钮、输入框、卡片（统一默认）
  lg: '8px', // 大卡片、modal
  xl: '12px', // 浮层、tooltip
  pill: '9999px', // 头像、tag 圆头
} as const;

export type RadiusKey = keyof typeof radii;