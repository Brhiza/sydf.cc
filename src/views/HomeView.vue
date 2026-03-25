<script setup lang="ts">
import ContentSectionCard from '@/components/common/ContentSectionCard.vue';
import InfoCalloutCard from '@/components/common/InfoCalloutCard.vue';
import { useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';

const router = useRouter();

onMounted(() => {
  // 组件挂载逻辑
});

const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM');

// 占卜工具数据
const divinationTools = [
  {
    id: 'divination-daily',
    name: '今日运势',
    description: '基于日家奇门遁甲的专业运势解读',
    path: '/divination/daily',
  },
  {
    id: 'liuyao',
    name: '六爻占卜',
    description: '传统易学精髓，剖析事情发展趋势',
    path: '/divination/liuyao',
  },
  {
    id: 'meihua',
    name: '梅花易数',
    description: '快速判断吉凶，抓住关键发展点',
    path: '/divination/meihua',
  },
  {
    id: 'qimen',
    name: '奇门遁甲',
    description: '分析复杂局势，为决策提供参考',
    path: '/divination/qimen',
  },
  {
    id: 'tarot',
    name: '塔罗占卜',
    description: '多种专业牌阵，探索内心指引',
    path: '/divination/tarot',
  },
  {
    id: 'ssgw',
    name: '三山国王灵签',
    description: '灵签指点迷津，解答人生困惑',
    path: '/divination/ssgw',
  },
  ...(!isCustomBuild.value ? [{
    id: 'rengong',
    name: '转人工',
    description: '专业人工咨询，深度解答疑惑',
    path: '/rengong',
  }] : []),
  ...(!isCustomBuild.value ? [{
    id: 'about',
    name: '关于本站',
    description: '了解网站信息，使用说明指南',
    path: '/about',
  }] : []),
];

// 导航到页面
function navigateToPage(path: string) {
  if (router && router.push) {
    router.push(path);
  }
}

// 随机导航到占卜工具
function goToRandomDivination() {
  if (!router || !router.push) {
    return;
  }
  
  const divinationRoutes = [
    '/divination/liuyao',
    '/divination/meihua',
    '/divination/qimen',
    '/divination/tarot',
    '/divination/ssgw'
  ];
  
  const randomIndex = Math.floor(Math.random() * divinationRoutes.length);
  const randomRoute = divinationRoutes[randomIndex];
  
  router.push(randomRoute);
}
</script>

<template>
  <div class="page-container">
    <!-- 欢迎标题 -->
    <h1 class="page-title">欢迎 👋</h1>

    <InfoCalloutCard
      v-if="!isCustomBuild"
      title="探索未来"
      accent-text="解读术数"
      description="一个基于国产前沿 AI 大模型及算法测试的免费网站，内容由 AI 生成，仅供娱乐参考。中国传统术数文化虽有趣，但现实生活中的相处与沟通更为重要。愿您在人生的路上，既能享受术数的神秘智慧，也能珍惜当下的每一份真挚情感。如果项目对你有帮助，可以将网站分享出去，或者点击下方功德箱跟主播一起助力中国公益事业。"
      :link="{ href: '/gongdebox', label: '🙏 功德箱' }"
    />

    <ContentSectionCard title="工具" use-header>
      <div class="tools-grid">
        <!-- 随机按钮 -->
        <div
          v-if="!isCustomBuild"
          class="tool-item random-button"
          @click="goToRandomDivination"
        >
          <div class="tool-content">
            <div class="tool-name">🎲 随便</div>
            <div class="tool-description">随便给你选一个</div>
          </div>
        </div>
        
        <div
          v-for="tool in divinationTools"
          :key="tool.id"
          class="tool-item"
          @click="navigateToPage(tool.path)"
        >
          <div class="tool-content">
            <div class="tool-name">{{ tool.name }}</div>
            <div class="tool-description">{{ tool.description }}</div>
          </div>
        </div>
      </div>
    </ContentSectionCard>
  </div>
</template>

<style scoped>
html.dark .tool-item:hover {
  background: var(--color-background-elevated);
  border-color: var(--color-primary);
}

@keyframes goldGlow {
  0%, 100% {
    background-position: 0% 50%, 0% 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 215, 0, 0.3);
  }
  50% {
    background-position: 100% 50%, 100% 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 215, 0, 0.5);
  }
}
</style>
