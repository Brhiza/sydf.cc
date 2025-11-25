<template>
  <div class="page-container">
    <div class="content-card not-found-content">
      <div class="error-icon">🔮</div>
      <h1 class="error-title">404</h1>
      <h2 class="section-title">页面未找到</h2>
      <p class="content-text">您访问的页面不存在，可能已被移动或删除</p>
      <div class="form-actions">
        <router-link to="/" class="btn-primary">返回首页</router-link>
        <button class="btn-secondary" @click="goBack">返回上页</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
}
</script>

<style scoped>
/* 页面特定样式 */
.not-found-content {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-8); /* 64px 32px */
}

.error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-4); /* 16px */
}

.error-title {
  font-size: 4rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 var(--spacing-4) 0; /* 16px bottom */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-content {
    padding: var(--spacing-10) var(--spacing-5); /* 40px 20px */
  }

  .error-title {
    font-size: 3rem;
  }

  .error-icon {
    font-size: 3rem;
  }
}
</style>
