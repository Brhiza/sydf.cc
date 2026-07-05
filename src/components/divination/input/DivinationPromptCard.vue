<template>
  <div class="prompt-card">
    <img v-if="divinationType === 'ssgw'" src="/static/ssgw.jpg" alt="三山国王" class="card-image" />
    <h1 class="card-title">{{ title }}</h1>
    <p v-if="!isCustomBuild" class="card-description">{{ description }}</p>

    <TarotSpreadSelector
      v-if="isTarot"
      :selected-spread="selectedSpread"
      @update:selected-spread="$emit('update:selected-spread', $event)"
    />

    <div v-if="showQuestionInput" class="input-container">
      <input
        id="userInput"
        :value="question"
        type="text"
        :placeholder="placeholder"
        :disabled="loading"
        :maxlength="QUESTION_TEXT_MAX_LENGTH"
        class="question-input"
        @input="handleQuestionInput"
        @keyup.enter="$emit('submit')"
      />
      <div class="input-focus-border"></div>
    </div>

    <div class="button-wrapper" :class="{ 'ai-thinking': loading }">
      <button id="submitButton" :disabled="disableSubmit" class="submit-button" @click="$emit('submit')">
        <span v-if="!loading">{{ buttonText }}</span>
        <AIThinkingIndicator v-else class="button-thinking-indicator" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DivinationType } from '@/types/divination'
import { QUESTION_TEXT_MAX_LENGTH } from '@/shared/question-text'
import AIThinkingIndicator from '@/components/common/AIThinkingIndicator.vue'
import TarotSpreadSelector from '../TarotSpreadSelector.vue'

defineProps<{
  divinationType?: DivinationType | ''
  title: string
  description: string
  placeholder: string
  buttonText: string
  loading: boolean
  question: string
  selectedSpread: string
  isTarot: boolean
  isCustomBuild: boolean
  showQuestionInput: boolean
  disableSubmit: boolean
}>()

const emit = defineEmits<{
  (e: 'update:question', value: string): void
  (e: 'update:selected-spread', value: string): void
  (e: 'submit'): void
}>()

function handleQuestionInput(event: Event) {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) {
    return
  }

  emit('update:question', target.value)
}
</script>

<style scoped>
.prompt-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-image {
  width: 200px;
  height: auto;
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-5);
  box-shadow: var(--shadow-md);
}

.card-title {
  text-align: center;
  color: var(--color-text-primary);
  margin-top: 0;
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.card-description {
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-8);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  max-width: 700px;
}

.input-container {
  position: relative;
  margin-bottom: var(--spacing-6);
  width: 100%;
  max-width: 600px;
}

.question-input {
  width: 100%;
  padding: var(--spacing-4);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-base);
  box-sizing: border-box;
  text-align: center;
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
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
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 16%, transparent);
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
  transition: width var(--transition-base);
  transform: translateX(-50%);
}

.question-input:focus + .input-focus-border {
  width: calc(100% - 32px);
}

.button-wrapper {
  position: relative;
  z-index: 1;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 600px;
}

.button-wrapper::before {
  content: '';
  background: linear-gradient(
    45deg,
    var(--color-primary),
    var(--color-primary-light),
    var(--color-primary)
  );
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
  transition: opacity var(--transition-base);
  border-radius: var(--radius-xl);
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
  padding: var(--spacing-4);
  border: none;
  border-radius: var(--radius-xl);
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-base);
  position: relative;
  z-index: 2;
}

.submit-button:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.submit-button:disabled {
  background: var(--color-primary-disabled);
  cursor: not-allowed;
}

html.dark .submit-button:disabled {
  background: var(--color-primary-disabled);
  color: var(--color-text-muted);
}

.button-thinking-indicator {
  min-height: 20px;
  justify-content: center;
  color: var(--color-white);
}

.button-thinking-indicator :deep(.thinking-mark) {
  width: 24px;
  height: 24px;
}

.button-thinking-indicator :deep(.thinking-seal) {
  inset: 4px;
  border-width: 1.5px;
}

@media (max-width: 768px) {
  .card-title {
    font-size: var(--font-size-2xl);
  }

  .card-description {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-5);
  }

  .input-container {
    margin-bottom: var(--spacing-5);
  }

  .question-input {
    padding: var(--spacing-3);
    font-size: var(--font-size-base);
  }

  .submit-button {
    padding: var(--spacing-3);
    font-size: var(--font-size-base);
  }
}

@media (max-width: 480px) {
  .card-title {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-3);
  }

  .card-description {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-4);
  }

  .input-container {
    margin-bottom: var(--spacing-4);
  }

  .question-input {
    padding: var(--spacing-3);
    font-size: var(--font-size-base);
  }

  .submit-button {
    padding: var(--spacing-3);
    font-size: var(--font-size-sm);
  }
}
</style>
