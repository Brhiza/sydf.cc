<template>
  <div class="section-block">
    <h4 class="category-heading">{{ heading }}</h4>
    <div class="questions-wrapper">
      <button
        v-for="question in questions"
        :key="question"
        :class="{ clicked: clickedQuestion === question }"
        type="button"
        @click="$emit('select', question)"
      >
        {{ question }}
      </button>
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
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: var(--spacing-6) 0 var(--spacing-4);
  padding-bottom: var(--spacing-2);
  border-bottom: 1px solid var(--color-border);
  position: relative;
  line-height: var(--line-height-tight);
}

.category-heading::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  border-radius: var(--radius-full);
}

.questions-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-8);
}

.questions-wrapper button {
  margin: 0;
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font: inherit;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
  line-height: var(--line-height-normal);
  position: relative;
  overflow: hidden;
  text-align: left;
}

.questions-wrapper button:hover {
  background: var(--color-background);
  color: var(--color-text-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
  border-color: var(--color-primary);
}

.questions-wrapper button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.questions-wrapper button.clicked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: color-mix(in srgb, var(--color-primary) 30%, transparent);
  opacity: 0;
  border-radius: var(--radius-full);
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
    font-size: var(--font-size-base);
    margin: var(--spacing-5) 0 var(--spacing-3);
  }
}
</style>
