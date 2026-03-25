<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <h1 class="page-title">转人工 👨‍💻</h1>

    <QrContactCard
      title="专业人工咨询"
      title-tag="h2"
      description="如需了解八字、紫薇或者人工起卦等服务，又或者有任何建议、反馈或合作意向，或者有闲聊、交朋友的需求，都可以联系我"
      image-src="/static/weixin.jpg"
      image-alt="微信二维码"
      max-width="180px"
    />
  </div>
</template>

<script setup lang="ts">
import QrContactCard from '@/components/common/QrContactCard.vue';
</script>

<style scoped>
/* 响应式设计 */
@media (max-width: 768px) {
  :deep(.qr-code) {
    max-width: 150px;
  }
}
</style>
