<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <h1 class="page-title">关于本站 ℹ️</h1>

    <ContentSectionCard title="关于">
      <p class="content-text">
        有点家传、师传，会八字、紫薇、风水、六壬、六爻等，毕竟大家都在用AI算命，那为什么不做一个更好的AI呢？于是引用了传统的计算方法和排盘逻辑，做出了本站。
      </p>
    </ContentSectionCard>

    <ContentSectionCard title="免责声明" title-tag="h3">
      <p class="content-text">
        切记，AI算命仅供娱乐。生成的内容完全基于 AI
        模型的胡言乱语，不构成任何形式的建议。作者对您基于本工具做出的任何决定不负任何责任。如果您真的相信了这个工具的分析结果，那么......祝您好运！
      </p>
    </ContentSectionCard>

    <QrContactCard
      title="联系我"
      title-tag="h3"
      description="如果您有任何建议、反馈或合作意向，或者有闲聊、交朋友的需求欢迎通过以下方式联系我："
      image-src="/static/weixin.jpg"
      image-alt="微信二维码"
      max-width="160px"
    />
  </div>
</template>

<script setup lang="ts">
import ContentSectionCard from '@/components/common/ContentSectionCard.vue';
import QrContactCard from '@/components/common/QrContactCard.vue';
</script>

<style scoped></style>
