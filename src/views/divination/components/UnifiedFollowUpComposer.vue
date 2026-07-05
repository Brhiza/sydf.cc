<template>
  <div class="content-card follow-up-card">
    <div class="follow-up-input">
      <textarea
        :value="modelValue"
        placeholder="对AI的解读进行追问..."
        :disabled="disabled"
        @input="handleInput"
        @keydown.enter.prevent="$emit('send')"
      ></textarea>
      <button :disabled="disabled" type="button" @click="$emit('send')">
        <span v-if="!disabled">发送</span>
        <AIThinkingIndicator v-else class="button-thinking-indicator" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AIThinkingIndicator from '@/components/common/AIThinkingIndicator.vue';

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  send: [];
}>();

function handleInput(event: Event) {
  const target = event.target;
  if (!(target instanceof HTMLTextAreaElement)) {
    return;
  }

  emit('update:modelValue', target.value);
}
</script>

<style scoped>
.follow-up-card {
  padding: var(--spacing-2);
}

.follow-up-input {
  display: block;
  position: relative;
}

.follow-up-input textarea {
  width: 100%;
  min-height: 58px;
  padding: var(--spacing-4) var(--spacing-5);
  padding-right: 100px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  background-color: var(--color-background-soft);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  resize: vertical;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.follow-up-input textarea:focus {
  outline: none;
  background-color: var(--color-background);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 16%, transparent);
}

.follow-up-input button {
  position: absolute;
  top: 50%;
  right: 8px;
  height: 42px;
  min-width: 76px;
  padding: 0 var(--spacing-5);
  border: none;
  border-radius: var(--radius-lg);
  background-color: var(--color-primary);
  color: var(--color-white);
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  transform: translateY(-50%);
  transition:
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.follow-up-input button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-sm);
}

.follow-up-input button:disabled {
  background-color: var(--color-primary-disabled);
  cursor: not-allowed;
}

.button-thinking-indicator {
  min-height: 20px;
  justify-content: center;
  color: var(--color-white);
}

.button-thinking-indicator :deep(.thinking-mark) {
  width: 22px;
  height: 22px;
}

.button-thinking-indicator :deep(.thinking-seal) {
  inset: 4px;
  border-width: 1.5px;
}
</style>
