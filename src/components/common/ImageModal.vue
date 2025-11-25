<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

defineProps<{
  imageUrl: string;
  isVisible: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  close: [];
  'image-loaded': [];
  'image-error': [];
}>();

// 关闭模态框
function closeModal() {
  emit('close');
}

// 点击背景关闭
function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

// ESC键关闭
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isVisible" 
        class="modal-backdrop"
        @click="handleBackdropClick"
      >
        <div class="modal-content">
          <!-- 关闭按钮 -->
          <button 
            class="close-button"
            aria-label="关闭"
            @click="closeModal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          <!-- 图片容器 -->
          <div class="image-container">
            <img 
              :src="imageUrl" 
              :alt="title || '证书图片'"
              class="certificate-image"
              @load="$emit('image-loaded')"
              @error="$emit('image-error')"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 模态框背景 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

/* 模态框内容 */
.modal-content {
  position: relative;
  background: var(--color-background);
  border-radius: 16px;
  max-width: 95vw;
  max-height: 95vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

/* 暗色模式 */
html.dark .modal-content {
  background: var(--color-background-elevated);
  border: 1px solid var(--color-border);
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: var(--color-background);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

html.dark .close-button {
  background: var(--color-background-elevated);
}

.close-button:hover {
  background: var(--color-danger);
  transform: scale(1.1);
}

.close-button svg {
  width: 20px;
  height: 20px;
  stroke: var(--color-text-primary);
}

html.dark .close-button svg {
  stroke: var(--color-text-primary);
}

.close-button:hover svg {
  stroke: var(--color-text-primary-inverse);
}

/* 图片容器 */
.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background-page);
  min-height: 400px;
}

html.dark .image-container {
  background: var(--color-background-page-dark);
}

/* 证书图片 */
.certificate-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}


/* 动画效果 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modal-content {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .close-button {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }
  
  .image-container {
    min-height: 300px;
  }
  
  .certificate-image {
    max-height: 70vh;
  }
  
  .action-hints {
    bottom: 12px;
    padding: 6px 12px;
    gap: 12px;
  }
  
  .hint-item {
    font-size: 11px;
  }
}

/* PWA模式优化 */
@media (display-mode: standalone) {
  .modal-backdrop {
    /* 在PWA模式下确保全屏覆盖 */
    position: fixed;
    top: env(safe-area-inset-top);
    left: env(safe-area-inset-left);
    right: env(safe-area-inset-right);
    bottom: env(safe-area-inset-bottom);
  }
  
  .close-button {
    /* 在PWA模式下考虑安全区域 */
    top: calc(16px + env(safe-area-inset-top));
    right: calc(16px + env(safe-area-inset-right));
  }
}
</style>
