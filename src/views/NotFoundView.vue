<template>
  <div class="page-container">
    <StatusPageCard
      icon="🔮"
      headline="404"
      title="页面未找到"
      description="您访问的页面不存在，可能已被移动或删除"
      title-tag="h2"
      spacious
    >
      <template #actions>
        <router-link to="/" class="btn-primary">返回首页</router-link>
        <button class="btn-secondary" @click="goBack">返回上页</button>
      </template>
    </StatusPageCard>
  </div>
</template>

<script setup lang="ts">
import StatusPageCard from '@/components/common/StatusPageCard.vue';
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
