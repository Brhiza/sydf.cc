/**
 * 紫薇AI适配器
 * 用于将原项目的AI功能适配到紫薇排盘项目中
 * 这个文件独立于编译过程，不会被覆盖
 */

(function() {
  'use strict';

  console.log('🔄 开始加载紫薇 AI 适配器...');

  // 等待原项目的 AI 功能加载
  const waitForOriginalAI = () => {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 50;

      const checkAI = () => {
        attempts++;
        console.log(`🔍 检查原项目 AI 功能 (尝试 ${attempts}/${maxAttempts})`);

        if (typeof window.queryAI === 'function') {
          console.log('✅ 原项目 queryAI 函数已找到');
          resolve(window.queryAI);
          return;
        }

        if (attempts >= maxAttempts) {
          console.error('❌ 超时：未找到原项目的 queryAI 函数');
          reject(new Error('原项目 AI 功能未找到'));
          return;
        }

        setTimeout(checkAI, 200);
      };

      checkAI();
    });
  };

  // 创建适配器
  const createAIAdapter = (originalQueryAI) => {
    return async function*(prompt, options = {}) {
      try {
        console.log('🚀 调用原项目 AI:', prompt.substring(0, 50) + '...');

        // 调用原项目的 queryAI 函数
        const response = await originalQueryAI(prompt);

        // 如果返回的是生成器，直接转发
        if (response && typeof response[Symbol.asyncIterator] === 'function') {
          for await (const chunk of response) {
            yield chunk;
          }
        }
        // 如果返回的是对象，尝试调用 streamResponse 方法
        else if (response && typeof response.streamResponse === 'function') {
          for await (const chunk of response.streamResponse()) {
            yield chunk;
          }
        }
        // 如果是字符串，直接返回
        else if (typeof response === 'string') {
          yield response;
        }
        // 其他情况，尝试转换为字符串
        else {
          yield String(response || '');
        }
      } catch (error) {
        console.error('❌ 原项目 AI 调用失败:', error);
        throw error;
      }
    };
  };

  // 替换紫薇项目中的 AI 实例
  const replaceZiWeiAI = (adaptedQueryAI) => {
    let replaced = false;

    // 尝试替换全局 ye 实例
    if (window.ye && typeof window.ye.queryAI === 'function') {
      console.log('✅ 找到 ye 实例，替换其 queryAI 方法');
      const originalMethod = window.ye.queryAI;
      window.ye.queryAI = adaptedQueryAI;
      replaced = true;

      // 验证替换是否成功
      if (window.ye.queryAI === adaptedQueryAI) {
        console.log('✅ ye.queryAI 替换成功');
      } else {
        console.warn('⚠️ ye.queryAI 替换可能失败');
      }
    }

    // 检查其他可能的 AI 实例
    if (window.pn && typeof window.pn === 'function') {
      console.log('✅ 找到 pn 类，尝试替换原型方法');
      if (window.pn.prototype && typeof window.pn.prototype.queryAI === 'function') {
        window.pn.prototype.queryAI = adaptedQueryAI;
        replaced = true;
      }
    }

    return replaced;
  };

  // 主要初始化逻辑
  const initializeAIAdapter = () => {
    console.log('🔄 开始 AI 功能适配...');

    waitForOriginalAI()
      .then(originalQueryAI => {
        console.log('🔧 创建 AI 适配器...');
        const adaptedQueryAI = createAIAdapter(originalQueryAI);

        // 立即尝试替换
        let replaced = replaceZiWeiAI(adaptedQueryAI);

        // 如果没有成功替换，继续尝试
        if (!replaced) {
          console.log('🔄 首次替换未成功，继续尝试...');

          const retryReplace = () => {
            const success = replaceZiWeiAI(adaptedQueryAI);
            if (success) {
              console.log('✅ AI 功能适配成功！');
            } else {
              console.log('🔄 继续等待紫薇 AI 实例加载...');
            }
            return success;
          };

          // 多次重试
          setTimeout(() => retryReplace(), 1000);
          setTimeout(() => retryReplace(), 3000);
          setTimeout(() => retryReplace(), 5000);
          setTimeout(() => retryReplace(), 8000);
        } else {
          console.log('✅ AI 功能适配成功！');
        }
      })
      .catch(error => {
        console.error('❌ AI 功能适配失败:', error);
        console.log('💡 请确保原项目的 AI 功能已正确加载');
      });
  };

  // 当 DOM 加载完成时初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAIAdapter);
  } else {
    // 如果 DOM 已经加载完成，立即初始化
    initializeAIAdapter();
  }

  // 导出到全局作用域，以便调试
  window.ZiweiAIAdapter = {
    waitForOriginalAI,
    createAIAdapter,
    replaceZiWeiAI,
    initializeAIAdapter
  };

  console.log('✅ 紫薇 AI 适配器已加载');

})();
