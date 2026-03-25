<template>
  <div class="search-input" :class="[sizeClass, { disabled }]">
    <span class="search-icon" aria-hidden="true">⌕</span>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="search-field"
      @input="handleInput"
    />
    <button
      v-if="showClearButton"
      type="button"
      class="clear-button"
      aria-label="清空搜索"
      @click="clearValue"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    type?: 'text' | 'search';
    size?: 'default' | 'compact';
  }>(),
  {
    placeholder: '请输入关键词',
    disabled: false,
    clearable: true,
    type: 'search',
    size: 'default',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'clear'): void;
}>();

const sizeClass = computed(() => `search-input-${props.size}`);
const showClearButton = computed(() => props.clearable && !props.disabled && props.modelValue.length > 0);

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

function clearValue() {
  emit('update:modelValue', '');
  emit('clear');
}
</script>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-background);
  color: var(--color-text-primary);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
}

.search-input.disabled {
  opacity: 0.6;
}

.search-input-default {
  padding: 0 12px;
  min-height: 44px;
}

.search-input-compact {
  padding: 0 8px;
  min-height: 32px;
  border-radius: var(--radius-base);
}

.search-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1;
}

.search-field {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 0;
}

.search-input-default .search-field {
  font-size: 14px;
}

.search-input-compact .search-field {
  font-size: 12px;
}

.search-field::placeholder {
  color: var(--color-text-secondary);
}

.search-field:disabled {
  cursor: not-allowed;
}

.clear-button {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 999px;
  background: var(--color-background-soft, rgba(0, 0, 0, 0.06));
  color: var(--color-text-secondary);
  cursor: pointer;
  line-height: 1;
  font-size: 14px;
  padding: 0;
}

.clear-button:hover {
  background: var(--color-primary-muted);
  color: var(--color-primary);
}
</style>
