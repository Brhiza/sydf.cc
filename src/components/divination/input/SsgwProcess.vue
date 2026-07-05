<template>
  <div v-if="isShaking || isTossing || showTossResult" class="ssgw-process">
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

    <div v-if="isTossing || showTossResult" class="tossing-section">
      <div class="result-section">
        <p>
          已完成摇签。
        </p>
        <p>请投掷圣杯，询问三山国王是否同意此签...</p>
      </div>

      <div v-if="tossResult.length > 0" class="result-section">
        <p v-for="(message, index) in tossResult" :key="index">
          <strong v-if="message.title">{{ message.title }}</strong>
          <template v-if="message.title"> </template>
          <span>{{ message.detail }}</span>
        </p>
      </div>

      <div v-if="beiResults.length > 0" class="bei-container">
        <img
          v-for="(result, index) in beiResults"
          :key="index"
          :src="`/static/${result}.png`"
          :alt="result"
          class="bei-image"
        />
      </div>

      <div v-if="!isApproved && tossCount < 3" class="button-wrapper">
        <button :disabled="isTossing" class="toss-button" @click="$emit('toss')">
          {{ isTossing ? '投掷中...' : '投掷圣杯' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SsgwTossMessage } from '@/composables/useSsgw';

defineProps<{
  isShaking: boolean
  shakingMessage: string
  shakingProgress: number
  isTossing: boolean
  showTossResult: boolean
  beiResults: string[]
  tossResult: SsgwTossMessage[]
  tossCount: number
  isApproved: boolean
}>()

defineEmits<{
  (e: 'toss'): void
}>()
</script>

<style scoped>
.ssgw-process {
  margin-top: var(--spacing-5);
}

.shaking-animation {
  margin-top: var(--spacing-8);
  text-align: center;
  padding: var(--spacing-5);
  background: var(--color-background-soft);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
}

.shaking-text {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-5);
  font-weight: var(--font-weight-medium);
}

.shaking-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-container {
  display: flex;
  gap: var(--spacing-2);
  align-items: flex-end;
}

.sign-stick {
  width: 6px;
  height: 30px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base),
    height var(--transition-base),
    transform var(--transition-base);
  transform-origin: bottom;
}

.sign-stick.active {
  background: linear-gradient(45deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  height: 40px;
  animation: shake 0.5s ease-in-out;
  box-shadow: 0 0 12px color-mix(in srgb, var(--color-primary) 38%, transparent);
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

.tossing-section {
  margin-top: var(--spacing-5);
  padding: var(--spacing-5);
  background: var(--color-background-soft);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
}

.result-section {
  margin-bottom: var(--spacing-4);
  color: var(--color-text-primary);
  line-height: var(--line-height-relaxed);
}

.result-section p {
  margin: var(--spacing-2) 0;
}

.result-section strong {
  color: var(--color-primary);
}

.bei-container {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin: var(--spacing-5) 0;
}

.bei-image {
  width: 60px;
  height: 60px;
}

.button-wrapper {
  position: relative;
  z-index: 1;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 600px;
}

.toss-button {
  background: linear-gradient(45deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: var(--color-white);
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition:
    box-shadow var(--transition-base),
    transform var(--transition-base);
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;
}

.toss-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.toss-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
</style>
