<script setup lang="ts">
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
    id: 'daily-fortune',
    name: '今日运势',
    description: '基于日家奇门遁甲的专业运势解读',
    path: '/daily-fortune',
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

    <!-- 欢迎语卡片 -->
    <div v-if="!isCustomBuild" class="content-card">
      <h2 class="section-title">探索未来 <span class="highlight-text">解读术数</span></h2>
      <p class="content-text">
        一个基于国产前沿 AI 大模型及算法测试的免费网站，内容由AI生成，仅供娱乐参考。中国传统术数文化虽有趣，但现实生活中的相处与沟通更为重要。愿您在人生的路上，既能享受术数的神秘智慧，也能珍惜当下的每一份真挚情感。<br>
        如果项目对你有帮助，可以将网站分享给出去，或者点击下方功德箱跟主播一起助力中国公益事业。
      </p>
      <p class="content-text">
        
      </p>
      <div class="merit-box-link" v-if="!isCustomBuild">
        <a href="/#/gongdebox">
          🙏 功德箱
        </a>
      </div>
    </div>

    <!-- 工具卡片 -->
    <div class="content-card">
      <div class="section-header">
        <h2 class="section-title">工具</h2>
      </div>

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
    </div>
  </div>
</template>

<style scoped>
/* 页面特定样式 */
.highlight-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.section-header {
  margin-bottom: var(--spacing-6); /* 24px */
}

.merit-box-link {
  margin-top: var(--spacing-4); /* 16px */
  text-align: center;
}

.merit-box-link a {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2); /* 8px */
  padding: var(--spacing-2) var(--spacing-4); /* 8px 16px */
  background: #eae7f8;
  color: #6b46c1;
  text-decoration: none;
  border-radius: var(--radius-md); /* 8px */
  font-weight: 500;
  transition: all 0.3s ease;
}

html.dark .merit-box-link a {
  background: #262628;
  color: #a78bfa;
}

.merit-box-link a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.6);
  border-color: #ffd700;
}

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
