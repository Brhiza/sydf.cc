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
      v-if="spreadType && spreadDefaultQuestions.length > 0"
      id="spread"
      class="tab-pane"
      :class="{ active: activeTab === 'spread' }"
    >
      <h4 class="category-heading">{{ spreadName }}专属问题</h4>
      <div class="questions-wrapper">
        <p
          v-for="question in spreadDefaultQuestions"
          :key="question"
          @click="selectAndSubmitQuestion(question)"
        >
          {{ question }}
        </p>
      </div>
    </div>

    <!-- 感情类问题 -->
    <div id="ganqing" class="tab-pane" :class="{ active: activeTab === 'ganqing' }">
      <h4 class="category-heading">情感发展</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我近期的桃花运怎么样？')">我近期的桃花运怎么样？</p>
        <p @click="selectAndSubmitQuestion('我们目前的感情走向如何？')">我们目前的感情走向如何？</p>
        <p @click="selectAndSubmitQuestion('他/她对我的真实情感是什么？')">
          他/她对我的真实情感是什么？
        </p>
        <p @click="selectAndSubmitQuestion('我们之间有未来吗？')">我们之间有未来吗？</p>
        <p @click="selectAndSubmitQuestion('如何改善我们目前的关系？')">如何改善我们目前的关系？</p>
        <p @click="selectAndSubmitQuestion('这段感情对我的影响？')">这段感情对我的影响？</p>
      </div>

      <h4 class="category-heading">正缘婚姻</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我的正缘什么时候出现？')">我的正缘什么时候出现？</p>
        <p @click="selectAndSubmitQuestion('我的另一半是什么样的人？')">我的另一半是什么样的人？</p>
        <p @click="selectAndSubmitQuestion('我何时会结婚？')">我何时会结婚？</p>
        <p @click="selectAndSubmitQuestion('我适合和现在的对象结婚吗？')">
          我适合和现在的对象结婚吗？
        </p>
        <p @click="selectAndSubmitQuestion('我的婚姻生活会幸福吗？')">我的婚姻生活会幸福吗？</p>
        <p @click="selectAndSubmitQuestion('如何吸引我的正缘桃花？')">如何吸引我的正缘桃花？</p>
      </div>

      <h4 class="category-heading">关系难题</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我们之间出了什么问题？')">我们之间出了什么问题？</p>
        <p @click="selectAndSubmitQuestion('如何解决现在的感情危机？')">如何解决现在的感情危机？</p>
        <p @click="selectAndSubmitQuestion('我们有机会复合吗？')">我们有机会复合吗？</p>
        <p @click="selectAndSubmitQuestion('我应该放弃这段感情吗？')">我应该放弃这段感情吗？</p>
        <p @click="selectAndSubmitQuestion('我和Ta的缘分有多深？')">我和Ta的缘分有多深？</p>
        <p @click="selectAndSubmitQuestion('我的灵魂伴侣有什么特征？')">我的灵魂伴侣有什么特征？</p>
      </div>
    </div>

    <!-- 事业类问题 -->
    <div id="shiye" class="tab-pane" :class="{ active: activeTab === 'shiye' }">
      <h4 class="category-heading">事业发展</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我适合现在的工作/行业吗？')">
          我适合现在的工作/行业吗？
        </p>
        <p @click="selectAndSubmitQuestion('我的事业什么时候能成功？')">我的事业什么时候能成功？</p>
        <p @click="selectAndSubmitQuestion('我适合跳槽还是继续坚守？')">我适合跳槽还是继续坚守？</p>
        <p @click="selectAndSubmitQuestion('我事业上的贵人会是谁？')">我事业上的贵人会是谁？</p>
        <p @click="selectAndSubmitQuestion('我未来的事业走向怎么样？')">我未来的事业走向怎么样？</p>
        <p @click="selectAndSubmitQuestion('我什么时候能找到满意的工作？')">
          我什么时候能找到满意的工作？
        </p>
      </div>

      <h4 class="category-heading">职场机遇</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我今年有机会升职加薪吗？')">我今年有机会升职加薪吗？</p>
        <p @click="selectAndSubmitQuestion('如何得到领导的赏识和重用？')">
          如何得到领导的赏识和重用？
        </p>
        <p @click="selectAndSubmitQuestion('我在公司的发展前景如何？')">我在公司的发展前景如何？</p>
        <p @click="selectAndSubmitQuestion('如何改善当前的工作状态？')">如何改善当前的工作状态？</p>
        <p @click="selectAndSubmitQuestion('我最近的职场人际运如何？')">我最近的职场人际运如何？</p>
      </div>

      <h4 class="category-heading">创业之路</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我适合创业吗？')">我适合创业吗？</p>
        <p @click="selectAndSubmitQuestion('我的创业最佳时机是什么时候？')">
          我的创业最佳时机是什么时候？
        </p>
        <p @click="selectAndSubmitQuestion('我该和什么样的人合伙？')">我该和什么样的人合伙？</p>
        <p @click="selectAndSubmitQuestion('我的创业项目前景如何？')">我的创业项目前景如何？</p>
        <p @click="selectAndSubmitQuestion('创业过程中需要注意哪些风险？')">
          创业过程中需要注意哪些风险？
        </p>
        <p @click="selectAndSubmitQuestion('我的创业会成功吗？')">我的创业会成功吗？</p>
      </div>
    </div>

    <!-- 财富类问题 -->
    <div id="caifu" class="tab-pane" :class="{ active: activeTab === 'caifu' }">
      <h4 class="category-heading">财运趋势</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我近期的财运怎么样？')">我近期的财运怎么样？</p>
        <p @click="selectAndSubmitQuestion('我这辈子财运的整体趋势？')">我这辈子财运的整体趋势？</p>
        <p @click="selectAndSubmitQuestion('我什么时候能发财？')">我什么时候能发财？</p>
        <p @click="selectAndSubmitQuestion('我适合靠什么方式赚钱？')">我适合靠什么方式赚钱？</p>
        <p @click="selectAndSubmitQuestion('如何有效提升我的财运？')">如何有效提升我的财运？</p>
        <p @click="selectAndSubmitQuestion('我近期会有意外之财吗？')">我近期会有意外之财吗？</p>
      </div>

      <h4 class="category-heading">投资理财</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我适合做投资吗？')">我适合做投资吗？</p>
        <p @click="selectAndSubmitQuestion('我应该选择什么样的投资方向？')">
          我应该选择什么样的投资方向？
        </p>
        <p @click="selectAndSubmitQuestion('这个投资项目能赚钱吗？')">这个投资项目能赚钱吗？</p>
        <p @click="selectAndSubmitQuestion('如何才能守住我的财富？')">如何才能守住我的财富？</p>
        <p @click="selectAndSubmitQuestion('我的投资风险大吗？')">我的投资风险大吗？</p>
        <p @click="selectAndSubmitQuestion('如何更好地管理我的财富？')">如何更好地管理我的财富？</p>
      </div>

      <h4 class="category-heading">财务状况</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我为什么总是存不住钱？')">我为什么总是存不住钱？</p>
        <p @click="selectAndSubmitQuestion('是什么原因导致我财务紧张？')">
          是什么原因导致我财务紧张？
        </p>
        <p @click="selectAndSubmitQuestion('我最近会有破财风险吗？')">我最近会有破财风险吗？</p>
        <p @click="selectAndSubmitQuestion('如何避免不必要的财务损失？')">
          如何避免不必要的财务损失？
        </p>
        <p @click="selectAndSubmitQuestion('我需要注意哪些年份的破财？')">
          我需要注意哪些年份的破财？
        </p>
        <p @click="selectAndSubmitQuestion('我该如何处理我的债务问题？')">
          我该如何处理我的债务问题？
        </p>
      </div>
    </div>

    <!-- 人际关系类问题 -->
    <div id="renji" class="tab-pane" :class="{ active: activeTab === 'renji' }">
      <h4 class="category-heading">社交模式</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我的人际交往模式有何优缺点？')">
          我的人际交往模式有何优缺点？
        </p>
        <p @click="selectAndSubmitQuestion('如何拓展我的高质量社交圈？')">
          如何拓展我的高质量社交圈？
        </p>
        <p @click="selectAndSubmitQuestion('我目前的人际关系状态如何？')">
          我目前的人际关系状态如何？
        </p>
        <p @click="selectAndSubmitQuestion('我会吸引哪些人进入我的生活？')">
          我会吸引哪些人进入我的生活？
        </p>
        <p @click="selectAndSubmitQuestion('如何获得他人的信任与支持？')">
          如何获得他人的信任与支持？
        </p>
        <p @click="selectAndSubmitQuestion('如何处理与朋友的矛盾？')">如何处理与朋友的矛盾？</p>
      </div>

      <h4 class="category-heading">贵人善缘</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('什么样的朋友是我的贵人？')">什么样的朋友是我的贵人？</p>
        <p @click="selectAndSubmitQuestion('我应该远离什么样的朋友？')">我应该远离什么样的朋友？</p>
        <p @click="selectAndSubmitQuestion('如何结交更多志同道合的朋友？')">
          如何结交更多志同道合的朋友？
        </p>
        <p @click="selectAndSubmitQuestion('我该如何维系重要的友谊？')">我该如何维系重要的友谊？</p>
        <p @click="selectAndSubmitQuestion('我该信任我身边的朋友吗？')">我该信任我身边的朋友吗？</p>
        <p @click="selectAndSubmitQuestion('如何获得领导或长辈的赏识？')">
          如何获得领导或长辈的赏识？
        </p>
      </div>

      <h4 class="category-heading">家庭关系</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我和家人的关系怎么样？')">我和家人的关系怎么样？</p>
        <p @click="selectAndSubmitQuestion('我的家庭对我有什么样的影响？')">
          我的家庭对我有什么样的影响？
        </p>
        <p @click="selectAndSubmitQuestion('如何改善我与家人的关系？')">如何改善我与家人的关系？</p>
        <p @click="selectAndSubmitQuestion('我该如何处理家庭矛盾？')">我该如何处理家庭矛盾？</p>
        <p @click="selectAndSubmitQuestion('我与家人的缘分有多深？')">我与家人的缘分有多深？</p>
        <p @click="selectAndSubmitQuestion('如何更好地与家人沟通？')">如何更好地与家人沟通？</p>
      </div>
    </div>

    <!-- 人生成长类问题 -->
    <div id="rensheng" class="tab-pane" :class="{ active: activeTab === 'rensheng' }">
      <h4 class="category-heading">学业规划</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我的学业运势如何？')">我的学业运势如何？</p>
        <p @click="selectAndSubmitQuestion('我适合考研/考公吗？')">我适合考研/考公吗？</p>
        <p @click="selectAndSubmitQuestion('我适合继续深造还是工作？')">我适合继续深造还是工作？</p>
        <p @click="selectAndSubmitQuestion('如何提升我的学习效率？')">如何提升我的学习效率？</p>
        <p @click="selectAndSubmitQuestion('我该选择哪个专业/学校？')">我该选择哪个专业/学校？</p>
        <p @click="selectAndSubmitQuestion('我这次考试能通过吗？')">我这次考试能通过吗？</p>
      </div>

      <h4 class="category-heading">个人成长</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我的性格优势和劣势是什么？')">
          我的性格优势和劣势是什么？
        </p>
        <p @click="selectAndSubmitQuestion('我的人生主要课题是什么？')">我的人生主要课题是什么？</p>
        <p @click="selectAndSubmitQuestion('如何找到我的人生方向？')">如何找到我的人生方向？</p>
        <p @click="selectAndSubmitQuestion('如何克服我性格中的弱点？')">如何克服我性格中的弱点？</p>
        <p @click="selectAndSubmitQuestion('如何有效提升自己的能量状态？')">
          如何有效提升自己的能量状态？
        </p>
        <p @click="selectAndSubmitQuestion('我的人生转折点在何时？')">我的人生转折点在何时？</p>
      </div>

      <h4 class="category-heading">人生机遇</h4>
      <div class="questions-wrapper">
        <p @click="selectAndSubmitQuestion('我未来十年的人生大运怎么样？')">
          我未来十年的人生大运怎么样？
        </p>
        <p @click="selectAndSubmitQuestion('我该如何实现我的人生目标？')">
          我该如何实现我的人生目标？
        </p>
        <p @click="selectAndSubmitQuestion('我的人生会有什么重大机遇？')">
          我的人生会有什么重大机遇？
        </p>
        <p @click="selectAndSubmitQuestion('我应该注意哪些健康问题？')">我应该注意哪些健康问题？</p>
        <p @click="selectAndSubmitQuestion('如何才能活出更精彩的人生？')">
          如何才能活出更精彩的人生？
        </p>
        <p @click="selectAndSubmitQuestion('未来的人生之路走向如何？')">未来的人生之路走向如何？</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSpreadDefaultQuestions, tarotSpreads } from '@/utils/tarot';
import { computed, ref } from 'vue';

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

// 定义标签数据
const tabs = computed(() => {
  const baseTabs = [
    { id: 'ganqing', name: '感情' },
    { id: 'shiye', name: '事业' },
    { id: 'caifu', name: '财富' },
    { id: 'renji', name: '人际' },
    { id: 'rensheng', name: '成长' },
  ];

  // 如果有牌阵专属问题，添加到第一个位置
  if (props.spreadType && spreadDefaultQuestions.value.length > 0) {
    return [{ id: 'spread', name: '牌阵' }, ...baseTabs];
  }

  return baseTabs;
});

// 当前激活的标签 - 如果有牌阵专属问题，默认显示牌阵专属
const activeTab = ref(
  props.spreadType &&
    getSpreadDefaultQuestions(props.spreadType as keyof typeof tarotSpreads).length > 0
    ? 'spread'
    : 'ganqing'
);

// 选择问题
function selectQuestion(question: string) {
  emit('select', question);

  // 添加点击动画效果
  const questionElements = document.querySelectorAll('.questions-wrapper p');
  questionElements.forEach((el) => {
    if (el.textContent === question) {
      el.classList.add('clicked');
      setTimeout(() => {
        el.classList.remove('clicked');
      }, 300);
    }
  });
}

// 暴露selectQuestion函数供外部使用
defineExpose({
  selectQuestion
});

// 选择问题并直接提交
function selectAndSubmitQuestion(question: string) {

  // 添加点击动画效果
  const questionElements = document.querySelectorAll('.questions-wrapper p');
  questionElements.forEach((el) => {
    if (el.textContent === question) {
      el.classList.add('clicked');
      setTimeout(() => {
        el.classList.remove('clicked');
      }, 300);
    }
  });

  // 直接提交，不再调用selectQuestion
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

.category-heading {
  color: var(--color-text-primary);
  font-size: 18px;
  font-weight: 600;
  margin: 24px 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
  position: relative;
}

.category-heading::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  border-radius: 3px;
}

.questions-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
}

.questions-wrapper p {
  margin: 0;
  padding: 12px 16px;
  background: var(--color-background-muted);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  font-size: 14px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.25s ease;
  line-height: 1.5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.questions-wrapper p:hover {
  background: var(--color-background);
  color: var(--color-text-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.1);
  border-color: var(--color-primary);
}

.questions-wrapper p.clicked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(107, 70, 193, 0.3);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1) translate(-50%, -50%);
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0) translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: scale(20) translate(-50%, -50%);
    opacity: 0;
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

  .questions-wrapper {
    grid-template-columns: 1fr;
  }

  .category-heading {
    font-size: 16px;
    margin: 20px 0 12px;
  }
}
</style>
