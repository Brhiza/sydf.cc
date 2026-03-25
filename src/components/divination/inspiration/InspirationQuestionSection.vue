<template>
  <div class="section-block">
    <h4 class="category-heading">{{ heading }}</h4>
    <div class="questions-wrapper">
      <p
        v-for="question in questions"
        :key="question"
        :class="{ clicked: clickedQuestion === question }"
        @click="$emit('select', question)"
      >
        {{ question }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  heading: string
  questions: string[]
  clickedQuestion: string | null
}>()

defineEmits<{
  (e: 'select', question: string): void
}>()
</script>

<style scoped>
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
  .questions-wrapper {
    grid-template-columns: 1fr;
  }

  .category-heading {
    font-size: 16px;
    margin: 20px 0 12px;
  }
}
</style>
