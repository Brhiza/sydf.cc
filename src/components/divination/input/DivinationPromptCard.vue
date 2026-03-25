<template>
  <div class="prompt-card">
    <img v-if="divinationType === 'ssgw'" src="/static/ssgw.jpg" alt="三山国王" class="card-image" />
    <h2 class="card-title">{{ title }}</h2>
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
        class="question-input"
        @input="$emit('update:question', ($event.target as HTMLInputElement).value)"
        @keyup.enter="$emit('submit')"
      />
      <div class="input-focus-border"></div>
    </div>

    <div class="button-wrapper" :class="{ 'ai-thinking': loading }">
      <button id="submitButton" :disabled="disableSubmit" class="submit-button" @click="$emit('submit')">
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
  </div>
</template>

<script setup lang="ts">
import type { DivinationType } from '@/types/divination'
import TarotSpreadSelector from '../TarotSpreadSelector.vue'

defineProps<{
  divinationType?: DivinationType | ''
  title: string
  description: string
  placeholder: string
  buttonText: string
  loadingText: string
  loading: boolean
  question: string
  selectedSpread: string
  isTarot: boolean
  isCustomBuild: boolean
  showQuestionInput: boolean
  disableSubmit: boolean
}>()

defineEmits<{
  (e: 'update:question', value: string): void
  (e: 'update:selected-spread', value: string): void
  (e: 'submit'): void
}>()
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
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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

@media (max-width: 768px) {
  .card-title {
    font-size: 1.6em;
  }

  .card-description {
    font-size: 15px;
    margin-bottom: 20px;
  }

  .input-container {
    margin-bottom: 20px;
  }

  .question-input {
    padding: 14px;
    font-size: 16px;
  }

  .submit-button {
    padding: 14px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .card-title {
    font-size: 1.4em;
    margin-bottom: 12px;
  }

  .card-description {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .input-container {
    margin-bottom: 16px;
  }

  .question-input {
    padding: 12px;
    font-size: 16px;
  }

  .submit-button {
    padding: 12px;
    font-size: 14px;
  }
}
</style>
