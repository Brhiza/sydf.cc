<template>
  <div class="inspiration-card">
    <h3 class="inspiration-title">问题灵感</h3>
    <div class="inspiration-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- 牌阵专属问题 -->
    <div
      v-if="showSpreadTab"
      id="spread"
      class="tab-pane"
      :class="{ active: activeTab === 'spread' }"
    >
      <InspirationQuestionSection
        :heading="`${spreadName}专属问题`"
        :questions="spreadDefaultQuestions"
        :clicked-question="clickedQuestion"
        @select="selectAndSubmitQuestion"
      />
    </div>

    <div v-for="tab in baseTabs" :id="tab.id" :key="tab.id" class="tab-pane" :class="{ active: activeTab === tab.id }">
      <InspirationQuestionSection
        v-for="section in questionSections[tab.id]"
        :key="section.heading"
        :heading="section.heading"
        :questions="section.questions"
        :clicked-question="clickedQuestion"
        @select="selectAndSubmitQuestion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSpreadDefaultQuestions, tarotSpreads } from '@/utils/tarot';
import { computed, ref, watch } from 'vue';
import InspirationQuestionSection from './inspiration/InspirationQuestionSection.vue';
import {
  INSPIRATION_CONTENT,
  INSPIRATION_TABS,
  type InspirationTabId,
} from './inspiration/inspiration-data';

// 定义Props
const props = defineProps<{
  spreadType?: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', question: string): void;
  (e: 'submit', question: string): void;
}>();

// 计算牌阵相关数据
const spreadDefaultQuestions = computed(() => {
  if (!props.spreadType) return [];
  return getSpreadDefaultQuestions(props.spreadType as keyof typeof tarotSpreads);
});

const spreadName = computed(() => {
  if (!props.spreadType) return '';
  return tarotSpreads[props.spreadType as keyof typeof tarotSpreads]?.name || '';
});

const questionSections = INSPIRATION_CONTENT;
const baseTabs = INSPIRATION_TABS;
const showSpreadTab = computed(() => !!props.spreadType && spreadDefaultQuestions.value.length > 0);

// 定义标签数据
const tabs = computed(() => {
  if (showSpreadTab.value) {
    return [{ id: 'spread', name: '牌阵' }, ...baseTabs];
  }

  return [...baseTabs];
});

function getDefaultTab(): InspirationTabId {
  return showSpreadTab.value ? 'spread' : 'ganqing';
}

const activeTab = ref<InspirationTabId>(getDefaultTab());
const clickedQuestion = ref<string | null>(null);

watch(showSpreadTab, (visible) => {
  if (visible) {
    activeTab.value = 'spread';
  } else if (activeTab.value === 'spread') {
    activeTab.value = 'ganqing';
  }
});

function animateQuestion(question: string) {
  clickedQuestion.value = question;
  setTimeout(() => {
    if (clickedQuestion.value === question) {
      clickedQuestion.value = null;
    }
  }, 300);
}

// 选择问题
function selectQuestion(question: string) {
  emit('select', question);
  animateQuestion(question);
}

// 暴露selectQuestion函数供外部使用
defineExpose({
  selectQuestion
});

// 选择问题并直接提交
function selectAndSubmitQuestion(question: string) {
  animateQuestion(question);
  emit('submit', question);
}
</script>

<style scoped>
/* 问题灵感卡片样式 */
.inspiration-card {
  width: 100%;
  background: var(--color-background);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border-light);
  padding: 32px;
  box-sizing: border-box;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
}

html.dark .inspiration-card {
  background: var(--color-background-elevated);
}

.inspiration-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(107, 70, 193, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  z-index: 0;
}

.inspiration-title {
  text-align: center;
  color: var(--color-text-primary);
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.6em;
  font-weight: 700;
  position: relative;
}

.inspiration-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.tab-btn {
  padding: 10px 18px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  color: var(--color-text-secondary);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.tab-btn:hover {
  background: var(--color-background-muted);
  color: var(--color-text-primary);
  transform: translateY(-2px);
}

.tab-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

.tab-btn.active::before {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}


.tab-pane {
  display: none;
  animation: fadeIn 0.3s ease-in-out;
  position: relative;
  z-index: 1;
}

.tab-pane.active {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .inspiration-card {
    padding: 24px 16px;
  }

  .inspiration-tabs {
    gap: 4px;
  }

  .tab-btn {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>
