/**
 * MOON Design Tokens — Motion
 *
 * 过渡时长与缓动函数。Notion 风格：快、轻、不浮夸。
 */

export const duration = {
  instant: '0ms',
  fast: '120ms', // hover / active
  base: '180ms', // 大部分过渡
  slow: '280ms', // 浮层进出
  slower: '400ms', // modal
} as const;

export const easing = {
  // 标准 ease，温和不夸张
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // 进入（菜单展开、tooltip 出现）
  enter: 'cubic-bezier(0, 0, 0.2, 1)',
  // 离开
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

export const transition = {
  fast: `all ${duration.fast} ${easing.standard}`,
  base: `all ${duration.base} ${easing.standard}`,
  slow: `all ${duration.slow} ${easing.standard}`,
} as const;