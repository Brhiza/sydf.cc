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
          求得第 <strong>{{ currentQian }}</strong> 签。
        </p>
        <p>请投掷圣杯，询问三山国王是否同意此签...</p>
      </div>

      <div v-if="tossResult" class="result-section">
        <p v-html="tossResult"></p>
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
defineProps<{
  isShaking: boolean
  shakingMessage: string
  shakingProgress: number
  isTossing: boolean
  showTossResult: boolean
  currentQian: number
  beiResults: string[]
  tossResult: string
  tossCount: number
  isApproved: boolean
}>()

defineEmits<{
  (e: 'toss'): void
}>()
</script>

<style scoped>
.ssgw-process {
  margin-top: 20px;
}

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

.button-wrapper {
  position: relative;
  z-index: 1;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
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
</style>
