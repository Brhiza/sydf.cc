<script setup lang="ts">
import ContentSectionCard from '@/components/common/ContentSectionCard.vue';
import InfoCalloutCard from '@/components/common/InfoCalloutCard.vue';
import { EXTERNAL_PROJECT_LINKS } from '@/shared/external-projects';
import { isCustomBuild } from '@/utils/build-target';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  // 组件挂载逻辑
});

const customBuildEnabled = isCustomBuild({
  buildTarget: import.meta.env.VITE_APP_BUILD_TARGET,
  mode: import.meta.env.MODE,
});

// 占卜工具数据
const divinationTools = [
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
  ...(!customBuildEnabled ? [{
    id: 'rengong',
    name: '转人工',
    description: '专业人工咨询，深度解答疑惑',
    path: '/rengong',
  }] : []),
  ...(!customBuildEnabled ? [{
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
      v-if="!customBuildEnabled"
      title="探索未来"
      accent-text="解读术数"
      description="一个基于国产前沿 AI 大模型及算法测试的免费网站，内容由 AI 生成，仅供娱乐参考。中国传统术数文化虽有趣，但现实生活中的相处与沟通更为重要。愿您在人生的路上，既能享受术数的神秘智慧，也能珍惜当下的每一份真挚情感。如果项目对你有帮助，可以将网站分享出去，或者点击下方功德箱跟主播一起助力中国公益事业。"
      :link="{ href: 'https://lk.sydf.cc/', label: '🙏 功德箱' }"
    >
      <template #before-link>
        <div class="hero-projects">
          <p class="content-text">
            下面是作者维护的其他独立项目，覆盖更完整的命理工具、专门的奇门排盘与小六壬起课；如果这里的功能不够细，可以直接前往对应项目使用。
          </p>
          <div class="external-projects-grid">
            <a
              v-for="project in EXTERNAL_PROJECT_LINKS"
              :key="project.id"
              class="external-project-card"
              :href="project.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="external-project-name">{{ project.name }}</span>
              <span class="external-project-description">{{ project.description }}</span>
            </a>
          </div>
        </div>
      </template>
    </InfoCalloutCard>

    <ContentSectionCard title="工具" use-header>
      <div class="tools-grid">
        <!-- 随机按钮 -->
        <div
          v-if="!customBuildEnabled"
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

.hero-projects {
  display: grid;
  gap: var(--spacing-3);
  margin-top: var(--spacing-5);
}

.external-projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-3);
}

.external-project-card {
  display: grid;
  grid-template-rows: auto minmax(calc(2 * 1.35em), auto);
  align-content: start;
  gap: var(--spacing-2);
  min-height: 96px;
  padding: var(--spacing-3);
  border: 1px solid color-mix(in srgb, var(--color-primary) 26%, var(--color-border));
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent),
    var(--color-background);
  color: var(--color-text-primary);
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-base);
}

.external-project-card:hover {
  border-color: var(--color-primary);
  background: var(--color-background-soft);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.external-project-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.external-project-name {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.external-project-description {
  display: -webkit-box;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  line-height: 1.35;
  overflow: hidden;
  white-space: pre-line;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

@media (max-width: 768px) {
  .external-projects-grid {
    gap: var(--spacing-2);
  }

  .external-project-card {
    min-height: 78px;
    padding: var(--spacing-2);
  }

  .external-project-name {
    font-size: var(--font-size-sm);
  }

  .external-project-description {
    font-size: 11px;
  }
}
</style>
