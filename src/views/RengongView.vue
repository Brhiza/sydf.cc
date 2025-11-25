<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <h1 class="page-title">转人工 👨‍💻</h1>

    <!-- 内容卡片 -->
    <div class="content-card">
      <section class="contact-section">
        <h2 class="section-title">专业人工咨询</h2>
        <p class="content-text">
          如需了解八字、紫薇或者人工起卦等服务，又或者有任何建议、反馈或合作意向，或者有闲聊、交朋友的需求，都可以联系我
        </p>
        <img src="/static/weixin.jpg" alt="微信二维码" class="qr-code" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 转人工页面无需额外逻辑
</script>

<style scoped>
/* 页面特定样式 */
.contact-section {
  text-align: left;
}

.qr-code {
  display: block;
  margin: 0 0 var(--spacing-4) 0; /* 16px */
  max-width: 180px;
  border-radius: var(--radius-lg); /* 8px */
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.qr-code:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .qr-code {
    max-width: 150px;
  }
}
</style>
