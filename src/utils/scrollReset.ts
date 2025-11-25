/**
 * 简单的滚动重置工具函数
 * 替代那些过度工程化的实现
 */
export function resetScroll(): void {
  // 简单直接的滚动重置，不需要那些花里胡哨的嵌套requestAnimationFrame
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
