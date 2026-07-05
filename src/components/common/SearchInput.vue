<template>
  <div class="search-input" :class="[sizeClass, { disabled }]">
    <svg
      class="search-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="ariaLabel || placeholder"
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
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
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
    ariaLabel?: string;
  }>(),
  {
    placeholder: '请输入关键词',
    disabled: false,
    clearable: true,
    type: 'search',
    size: 'default',
    ariaLabel: '',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'clear'): void;
}>();

const sizeClass = computed(() => `search-input-${props.size}`);
const showClearButton = computed(() => props.clearable && !props.disabled && props.modelValue.length > 0);

function handleInput(event: Event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  emit('update:modelValue', target.value);
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
  gap: var(--spacing-2);
  width: 100%;
  min-width: 0;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 2%, transparent), transparent),
    var(--color-background);
  color: var(--color-text-primary);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    background-color var(--transition-fast);
  box-sizing: border-box;
}

.search-input:hover:not(.disabled) {
  border-color: color-mix(in srgb, var(--color-primary) 24%, var(--color-border));
}

.search-input:focus-within {
  border-color: var(--color-primary);
  background: var(--color-background);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 14%, transparent);
}

.search-input.disabled {
  opacity: 0.6;
}

.search-input-default {
  padding: 0 var(--spacing-3);
  min-height: 44px;
}

.search-input-compact {
  padding: 0 var(--spacing-2);
  min-height: 36px;
  border-radius: var(--radius-lg);
}

.search-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  width: 16px;
  height: 16px;
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
  font-size: var(--font-size-sm);
}

.search-field::placeholder {
  color: var(--color-text-muted);
}

.search-field:disabled {
  cursor: not-allowed;
}

.clear-button {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 999px;
  background: var(--color-background-soft);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
}

.clear-button svg {
  width: 14px;
  height: 14px;
}

.clear-button:hover {
  background: var(--color-primary-muted);
  color: var(--color-primary);
  transform: scale(1.04);
}

.clear-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
