<template>
  <div class="input-card" :class="{ loading: loading }">
    <!-- 三山国王灵签的图片 -->
    <img
      v-if="divinationType === 'ssgw'"
      src="/static/ssgw.jpg"
      alt="三山国王"
      class="card-image"
    />
    <h2 class="card-title">{{ computedTitle }}</h2>
    <p v-if="!isCustomBuild" class="card-description">{{ computedDescription }}</p>

    <!-- 塔罗牌阵选择 -->
    <TarotSpreadSelector
      v-if="isTarot"
      :selected-spread="selectedSpread"
      @update:selected-spread="selectSpread"
    />

    <div v-if="showQuestionInput" class="input-container">
      <input
        id="userInput"
        v-model="question"
        type="text"
        :placeholder="computedPlaceholder"
        :disabled="loading"
        class="question-input"
        @keyup.enter="handleSubmit"
      />
      <div class="input-focus-border"></div>
    </div>

    <div class="button-wrapper" :class="{ 'ai-thinking': loading }">
      <button
        id="submitButton"
        :disabled="loading || (divinationType !== 'ssgw' && divinationType !== 'daily' && !question.trim())"
        class="submit-button"
        @click="handleSubmit"
      >
        <span v-if="!loading">{{ buttonText }}</span>
        <span v-else class="loading-text">
          {{ loadingText }}
          <span class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
        </span>
      </button>
    </div>

    <!-- 补充信息 -->
    <div class="supplementary-info">
      <div class="info-header">
        <a class="toggle-info" @click="showSupplementaryInfo = !showSupplementaryInfo">
          {{ showSupplementaryInfo ? '收起' : supplementaryInfoToggleText }}
          <span class="arrow" :class="{ down: !showSupplementaryInfo, up: showSupplementaryInfo }"></span>
        </a>

        <!-- 起卦方式选择 -->
        <div v-if="showDivinationMethodSelector" class="divination-method-selector">
          <div class="method-radio-group">
            <label class="method-radio-label" :class="{ selected: divinationMethod === 'default' }">
              <input v-model="divinationMethod" type="radio" value="default" />
              <span>默认</span>
            </label>
            <label class="method-radio-label" :class="{ selected: divinationMethod === 'random' }">
              <input v-model="divinationMethod" type="radio" value="random" />
              <span>随机</span>
            </label>
            <label class="method-radio-label" :class="{ selected: divinationMethod === 'number' }">
              <input v-model="divinationMethod" type="radio" value="number" />
              <span>数字</span>
            </label>
          </div>
          <input
            v-if="divinationMethod === 'number'"
            v-model.number="divinationNumber"
            type="number"
            placeholder="输入数字"
            class="number-input"
          />
        </div>
      </div>
      <transition name="fade">
        <div v-if="showSupplementaryInfo" class="info-form">
          <div class="info-notice">
            <p class="notice-text">💡 以下所有选项均非必选，填写后可获得更精准的个性化解读</p>
          </div>
          <div class="form-group">
            <label class="form-label">性别:</label>
            <div class="radio-group">
              <label class="radio-label" :class="{ selected: gender === '男' }">
                <input v-model="gender" type="radio" value="男" />
                <span>男</span>
              </label>
              <label class="radio-label" :class="{ selected: gender === '女' }">
                <input v-model="gender" type="radio" value="女" />
                <span>女</span>
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="birthYear" class="form-label">出生年份:</label>
            <input
              id="birthYear"
              v-model.number="birthYear"
              type="number"
              placeholder="例如: 1990"
              class="year-input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">日干:</label>
            <div class="input-with-remark day-pillar-select">
              <CustomSelect v-model="dayPillarHeavenlyStem" :options="heavenlyStems" placeholder="请选择日干" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">日支:</label>
            <div class="input-with-remark day-pillar-select">
              <CustomSelect v-model="dayPillarEarthlyBranch" :options="earthlyBranches" placeholder="请选择日支" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">解读风格:</label>
            <div class="radio-group">
              <label class="radio-label" :class="{ selected: interpretationStyle === '入门' }">
                <input v-model="interpretationStyle" type="radio" value="入门" />
                <span>入门</span>
              </label>
              <label class="radio-label" :class="{ selected: interpretationStyle === '专业' }">
                <input v-model="interpretationStyle" type="radio" value="专业" />
                <span>专业</span>
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">输出长度:</label>
            <div class="radio-group">
              <label class="radio-label" :class="{ selected: outputLength === '精简' }">
                <input v-model="outputLength" type="radio" value="精简" />
                <span>精简</span>
              </label>
              <label class="radio-label" :class="{ selected: outputLength === '详细' }">
                <input v-model="outputLength" type="radio" value="详细" />
                <span>详细</span>
              </label>
              <label class="radio-label" :class="{ selected: outputLength === '超详细' }">
                <input v-model="outputLength" type="radio" value="超详细" />
                <span>超详细</span>
              </label>
            </div>
          </div>
          <div class="form-group" style="align-items: flex-start">
            <label for="model" class="form-label" style="padding-top: 8px">选择模型:</label>
            <div class="input-with-remark">
              <CustomSelect v-model="selectedModel" :options="models" />
              <p class="model-remark">不同的模型会影响解读结果的风格和侧重点。</p>
            </div>
          </div>
          <div class="form-group form-actions">
            <button class="reset-button" @click="resetSupplementaryInfo">重置</button>
          </div>
        </div>
      </transition>
    </div>

    <!-- 三山国王完整求签流程 -->
    <div
      v-if="divinationType === 'ssgw' && (isShaking || isTossing || showTossResult)"
      class="ssgw-process"
    >
      <!-- 摇签阶段 -->
      <div v-if="isShaking" class="shaking-animation">
        <p class="shaking-text">{{ shakingMessage }}</p>
        <div class="shaking-visual">
          <div class="sign-container">
            <div
              v-for="n in 5"
              :key="n"
              class="sign-stick"
              :class="{ active: n <= shakingProgress }"
            ></div>
          </div>
        </div>
      </div>

      <!-- 投掷圣杯阶段 -->
      <div v-if="isTossing || showTossResult" class="tossing-section">
        <div class="result-section">
          <p>
            求得第 <strong>{{ currentQian }}</strong> 签。
          </p>
          <p>请投掷圣杯，询问三山国王是否同意此签...</p>
        </div>

        <!-- 投掷结果 -->
        <div v-if="tossResult" class="result-section">
          <p v-html="tossResult"></p>
        </div>

        <!-- 圣杯结果显示 -->
        <div v-if="beiResults.length > 0" class="bei-container">
          <img
            v-for="(result, index) in beiResults"
            :key="index"
            :src="`/static/${result}.png`"
            :alt="result"
            class="bei-image"
          />
        </div>

        <!-- 投掷按钮 -->
        <div v-if="!isApproved && tossCount < 3" class="button-wrapper">
          <button :disabled="isTossing" class="toss-button" @click="tossShengBei">
            {{ isTossing ? '投掷中...' : '投掷圣杯' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 问题灵感面板 - 根据条件显示 -->
  <InspirationPanel
    v-if="shouldShowInspiration"
    :spread-type="isTarot ? selectedSpread : null"
    @select="selectQuestion"
    @submit="handleDirectSubmit"
  />
</template>

<script setup lang="ts">
import type { QuestionExample, SupplementaryInfo } from '@/types/divination';
import { useSsgw } from '@/composables/useSsgw';
import { useSupplementaryInfo } from '@/composables/useSupplementaryInfo';
import { tarotSpreads } from '@/utils/tarot';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
const isCustomBuild = computed(() => import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM');
import { useRoute, useRouter } from 'vue-router';
import CustomSelect from '@/components/common/CustomSelect.vue';
import InspirationPanel from './InspirationPanel.vue';
import TarotSpreadSelector from './TarotSpreadSelector.vue';

interface Props {
  title: string;
  description: string;
  placeholder?: string;
  buttonText?: string;
  loadingText?: string;
  loading?: boolean;
  modelValue?: string;
  examples?: (QuestionExample | string)[];
  showInspiration?: boolean;
  hideAfterSubmit?: boolean; // 提交后是否隐藏问题灵感
  divinationType?: string; // 占卜类型
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'submit', payload: { question: string; signNumber?: number; supplementaryInfo?: SupplementaryInfo | undefined }): void;
  (e: 'typeChange', type: string): void;
  (e: 'clear'): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入您的问题',
  buttonText: '询问赛博大师',
  loadingText: 'AI思考中',
  loading: false,
  modelValue: '',
  examples: () => [],
  showInspiration: true,
  hideAfterSubmit: true,
  divinationType: '',
});

const emit = defineEmits<Emits>();
const route = useRoute();
useRouter();

const question = ref(props.modelValue);
const tarotType = ref(getTarotTypeFromRoute());
const selectedSpread = ref('single'); // 默认选择单牌
const submitted = ref(false); // 是否已提交

// 使用 useSupplementaryInfo 可组合函数
const {
  showSupplementaryInfo,
  gender,
  birthYear,
  selectedModel,
  interpretationStyle,
  outputLength,
  dayPillarHeavenlyStem,
  dayPillarEarthlyBranch,
  heavenlyStems,
  earthlyBranches,
  models,
  supplementaryInfoToggleText,
  getSupplementaryInfo,
  resetSupplementaryInfo,
  divinationMethod,
  divinationNumber,
} = useSupplementaryInfo();

// 使用 useSsgw 可组合函数
const {
  isShaking,
  shakingMessage,
  shakingProgress,
  isTossing,
  showTossResult,
  currentQian,
  beiResults,
  tossResult,
  tossCount,
  isApproved,
  startShaking,
  tossShengBei,
} = useSsgw(emit);

// 定义牌阵键的类型
type TarotSpreadKey = keyof typeof tarotSpreads;

// 塔罗牌阵选择器方法
function selectSpread(spreadKey: string) {
  selectedSpread.value = spreadKey;
  emit('typeChange', `tarot_${spreadKey}`);
  question.value = '';
}

// 计算placeholder文本
const computedPlaceholder = computed(() => {
  if (props.divinationType === 'ssgw') {
    return '可输入您的问题，也可直接求签';
  }
  return props.placeholder;
});

// 判断是否显示问题输入框
const showQuestionInput = computed(() => {
  // 今日运势不需要输入问题
  if (props.divinationType === 'daily') {
    return false;
  }
  return true;
});

// 判断是否显示问题灵感面板
const shouldShowInspiration = computed(() => {
  // 如果是三山国王灵签或今日运势，不显示问题灵感
  if (props.divinationType === 'ssgw' || route.path.includes('/divination/ssgw') || props.divinationType === 'daily') {
    return false;
  }

  // 根据props控制显示
  return props.showInspiration;
});

// 判断是否为塔罗牌占卜
const isTarot = computed(() => {
  const path = route.path;
  return path.includes('/divination/tarot');
});

const showDivinationMethodSelector = computed(() => {
  const supportedTypes = ['liuyao', 'meihua', 'qimen'];
  return supportedTypes.includes(props.divinationType);
});

// 动态计算标题
const computedTitle = computed(() => {
  if (isTarot.value) {
    const spread = tarotSpreads[selectedSpread.value as TarotSpreadKey];
    return spread ? `塔罗牌·${spread.name}` : props.title;
  }
  return props.title;
});

// 动态计算描述
const computedDescription = computed(() => {
  if (isTarot.value) {
    const spread = tarotSpreads[selectedSpread.value as TarotSpreadKey];
    return spread ? spread.description : props.description;
  }
  return props.description;
});

// 从路由中获取塔罗牌类型
function getTarotTypeFromRoute(): string {
  const path = route.path;
  if (path.includes('/divination/tarot_single')) {
    return 'tarot_single';
  } else if (path.includes('/divination/tarot')) {
    return 'tarot';
  }
  return 'tarot';
}

// 监听外部值变化
watch(
  () => props.modelValue,
  (newValue) => {
    question.value = newValue;
  }
);

// 监听内部值变化
watch(question, (newValue) => {
  emit('update:modelValue', newValue);
});

// 重置问题内容
function resetQuestion() {
  question.value = '';
  submitted.value = false;
}

// 监听占卜类型变化
watch(
  () => props.divinationType,
  (newType, oldType) => {
    if (oldType && newType !== oldType) {
            // 重置状态
      resetQuestion();
    }
  }
);

// 监听路由变化
watch(
  () => route.path,
  () => {
    if (isTarot.value) {
      tarotType.value = getTarotTypeFromRoute();
    }

    // 路由变化时重置状态
    resetQuestion();
  }
);

function handleSubmit() {
  const supplementaryInfo = getSupplementaryInfo();
  
  // 三山国王灵签允许空问题
  if (props.divinationType === 'ssgw' || route.path.includes('/ssgw')) {
    const questionToSubmit = question.value.trim() || '心中所想之事';

    // 标记为已提交
    submitted.value = true;

    // 清除上一次的结果
    emit('clear');
    // 开始摇签流程
    startShaking(questionToSubmit, supplementaryInfo);
    return;
  }

  // 今日运势不需要问题
  if (props.divinationType === 'daily') {
    // 标记为已提交
    submitted.value = true;

    // 清除上一次的结果
    emit('clear');
    // 直接提交今日运势
    emit('submit', {
      question: '请为我分析今日运势',
      supplementaryInfo,
    });
    return;
  }

  // 其他占卜类型需要输入问题
  if (!question.value.trim() || props.loading) return;

  // 标记为已提交
  submitted.value = true;

  emit('submit', {
    question: question.value.trim(),
    supplementaryInfo,
  });
}

// 选择示例问题
function selectQuestion(questionText: string) {
  if (props.loading) return;

  question.value = questionText;
  // 滚动到输入框
  const promptInput = document.getElementById('userInput');
  if (promptInput) {
    promptInput.focus();
  }
}

// 直接提交问题（不需要先填入输入框）
function handleDirectSubmit(questionText: string) {
  if (props.loading) {
    return;
  }

  if (!questionText || !questionText.trim()) {
    console.error('问题为空，无法提交');
    return;
  }


  // 设置问题值
  question.value = questionText;

  // 标记为已提交
  submitted.value = true;

  // 直接提交问题
  const supplementaryInfo = getSupplementaryInfo();
  emit('submit', {
    question: questionText,
    supplementaryInfo,
  });
}

// 处理牌阵变化

// 塔罗牌阵选择器生命周期钩子
onMounted(() => {
  if (isTarot.value) {
    emit('typeChange', `tarot_${selectedSpread.value}`);
  }
});

// 清理事件监听器
onUnmounted(() => {
  // 之前移除事件监听器的代码在这里
});
</script>

<style scoped>
.input-card {
  width: 100%;
  background: var(--color-background);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border-light);
  padding: 32px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

html.dark .input-card {
  background: var(--color-background-elevated);
}

.card-image {
  width: 200px;
  height: auto;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.input-card.loading {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-title {
  text-align: center;
  color: var(--color-text-primary);
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.8em;
  font-weight: 700;
}

.card-description {
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 1.6;
  max-width: 700px;
}

.toggle-container {
  display: flex;
  background: var(--color-background-muted);
  border-radius: 12px;
  padding: 4px;
  width: 100%;
  max-width: 300px;
}

.toggle-button {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.toggle-button.active {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 2px 8px rgba(161, 52, 219, 0.3);
}

.tarot-spread-container {
  width: 100%;
  max-width: 600px;
  /* 允许下拉菜单超出容器显示 */
  overflow: visible;
  position: relative;
  z-index: 10;
}

.input-container {
  position: relative;
  margin-bottom: 24px;
  width: 100%;
  max-width: 600px;
}

.question-input {
  width: 100%;
  padding: 16px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 16px;
  box-sizing: border-box;
  text-align: center;
  transition: all 0.3s ease;
  background: var(--color-background-muted);
  color: var(--color-text-primary);
}

.question-input::placeholder {
  color: var(--color-text-muted);
}

.question-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-background);
  box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.15);
}

.question-input:disabled {
  background: var(--color-background-muted);
  opacity: 0.6;
  cursor: not-allowed;
}

.input-focus-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.question-input:focus + .input-focus-border {
  width: calc(100% - 32px);
}

.button-wrapper {
  position: relative;
  z-index: 1;
  border-radius: 12px;
  /* margin-bottom: 24px; */
  width: 100%;
  max-width: 600px;
}

.button-wrapper::before {
  content: '';
  background: linear-gradient(45deg, #6b46c1, #805ad5, #6b46c1);
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(4px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 12px;
}

.button-wrapper.ai-thinking::before {
  opacity: 1;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.submit-button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: var(--color-primary);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.submit-button:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
}

.submit-button:disabled {
  background: var(--color-primary-disabled);
  cursor: not-allowed;
}

/* 暗色模式下的禁用状态优化 */
html.dark .submit-button:disabled {
  background: #3a3a3a;
  color: #6b7280;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-dots {
  display: inline-flex;
  margin-left: 8px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
  margin: 0 2px;
  animation: dot-pulse 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-pulse {
  0%,
  60%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  30% {
    transform: scale(2);
    opacity: 0.5;
  }
}

/* 三山国王摇签动画 */
.shaking-animation {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.shaking-text {
  font-size: 16px;
  color: var(--color-text-primary);
  margin-bottom: 20px;
  font-weight: 500;
}

.shaking-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-container {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.sign-stick {
  width: 6px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: bottom;
}

.sign-stick.active {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  height: 40px;
  animation: shake 0.5s ease-in-out;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

@keyframes shake {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(2deg);
  }
  75% {
    transform: translateY(-3px) rotate(-2deg);
  }
}

/* 三山国王求签流程样式 */
.ssgw-process {
  margin-top: 20px;
}

.tossing-section {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.result-section {
  margin-bottom: 15px;
  color: var(--color-text-primary);
  line-height: 1.6;
}

.result-section p {
  margin: 8px 0;
}

.result-section strong {
  color: var(--color-primary);
}

.bei-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.bei-image {
  width: 60px;
  height: 60px;
}

.toss-button {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;
}

.toss-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.toss-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* 补充信息样式 */
.supplementary-info {
  width: 100%;
  max-width: 600px;
  margin-top: 16px;
  margin-bottom: 24px;
  text-align: left;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.divination-method-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.method-radio-group {
  display: flex;
  gap: 10px;
  background-color: var(--color-background-muted);
  padding: 4px;
  border-radius: 8px;
}

.method-radio-label {
  cursor: pointer;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
}

.method-radio-label.selected {
  background-color: var(--color-background);
  border-color: var(--color-border);
  color: var(--color-text-primary);
  font-weight: 500;
}

.method-radio-label input[type='radio'] {
  display: none;
}

.number-input {
  width: 80px;
  padding: 6px 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--color-text-primary);
  font-size: 13px;
  text-align: center;
}

.number-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(107, 70, 193, 0.1);
}

.toggle-info {
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s;
}

.toggle-info:hover {
  color: var(--color-primary);
}

.arrow {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 6px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  transition: transform 0.3s;
}

.arrow.down {
  border-top: 5px solid currentColor;
}

.arrow.up {
  border-bottom: 5px solid currentColor;
}

.info-form {
  margin-top: 12px;
  padding: 16px;
  background: var(--color-background-muted);
  border-radius: 12px;
  border: 1px solid var(--color-border-light);
}

.info-notice {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.notice-text {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.form-actions {
  justify-content: flex-end;
  margin-top: 8px;
  margin-bottom: 0;
}

.reset-button {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  font-size: 14px;
  color: var(--color-text-primary);
  margin-right: 16px;
  width: 70px;
  flex-shrink: 0;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
}

.radio-label:hover {
  border-color: var(--color-primary);
}

.radio-label.selected {
  background-color: var(--color-primary-muted);
  border-color: var(--color-primary);
  color: var(--color-primary);
  font-weight: 500;
}

.radio-label input[type='radio'] {
  display: none;
}

.year-input {
  width: 120px;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--color-text-primary);
  font-size: 14px;
}

.input-with-remark {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 200px;
}

/* 为出生年份、日干、日支设置更紧凑的宽度 */
.form-group:has(.year-input) .input-with-remark,
.form-group:has(.day-pillar-select) .input-with-remark {
  max-width: 120px;
}

.model-remark {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 6px;
  margin-bottom: 0;
  line-height: 1.4;
}

.year-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(107, 70, 193, 0.1);
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .input-card {
    padding: 24px 16px;
  }

  .card-title {
    font-size: 1.6em;
  }

  .card-description {
    font-size: 15px;
    margin-bottom: 20px;
  }

  .tarot-spread-container {
    margin-bottom: 2px;
  }

  .input-container {
    margin-bottom: 20px;
  }

  .question-input {
    padding: 14px;
    font-size: 16px; /* 确保不小于16px以防止iOS缩放 */
  }

  .submit-button {
    padding: 14px;
    font-size: 15px;
  }

  .radio-group {
    flex-wrap: wrap;
    gap: 10px;
  }

  .radio-label {
    font-size: 13px;
    padding: 5px 10px;
  }

  .form-label {
    width: 60px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .input-card {
    padding: 20px 12px;
  }

  .card-title {
    font-size: 1.4em;
    margin-bottom: 12px;
  }

  .card-description {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .tarot-spread-container {
    margin-bottom: 0;
  }

  .input-container {
    margin-bottom: 16px;
  }

  .question-input {
    padding: 12px;
    font-size: 16px; /* 确保不小于16px以防止iOS缩放 */
  }

  .submit-button {
    padding: 12px;
    font-size: 14px;
  }
}
</style>
