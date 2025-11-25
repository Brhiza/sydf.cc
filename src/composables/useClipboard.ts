import { ref, readonly } from 'vue';

/**
 * 一个可组合函数，用于处理复制文本到剪贴板的操作。
 * @returns copy - 执行复制操作的函数。
 * @returns copied - 一个只读的 ref，指示复制是否成功（2秒后自动重置）。
 * @returns error - 一个只读的 ref，用于捕获复制过程中可能发生的错误。
 */
export function useClipboard() {
  const copied = ref(false);
  const error = ref<Error | null>(null);

  const copy = (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        copied.value = true;
        error.value = null;
        setTimeout(() => { copied.value = false; }, 2000);
      }).catch(err => {
        error.value = err;
        fallbackCopy(text); // 如果现代API失败，则尝试备用方法
      });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // 避免在屏幕上显示或引起滚动
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        copied.value = true;
        error.value = null;
        setTimeout(() => { copied.value = false; }, 2000);
      } else {
        error.value = new Error('Fallback copy: document.execCommand failed');
        console.error('Fallback copy: document.execCommand failed');
      }
    } catch (err) {
      error.value = err as Error;
      console.error('Fallback copy: Exception', err);
    }

    document.body.removeChild(textArea);
  };

  return {
    copy,
    copied: readonly(copied),
    error: readonly(error),
  };
}
