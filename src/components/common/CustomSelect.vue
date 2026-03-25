<template>
  <div
    ref="rootRef"
    class="custom-select"
    :class="[sizeClass, { disabled }]"
    :tabindex="disabled ? -1 : 0"
    @keydown="handleKeydown"
  >
    <button
      type="button"
      class="selected"
      :class="{ open, placeholder: !selectedOption }"
      :disabled="disabled"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggleOpen"
    >
      <span class="selected-text">{{ selectedLabel }}</span>
    </button>

    <div class="items" :class="{ selectHide: !open }" role="listbox">
      <button
        v-for="(option, index) in options"
        :key="option.name"
        type="button"
        class="option-item"
        :class="{
          active: index === activeIndex,
          selected: option.name === modelValue,
        }"
        role="option"
        :aria-selected="option.name === modelValue"
        @click="selectOption(option)"
        @mouseenter="setActiveIndex(index)"
      >
        <div class="option-name">{{ option.displayName || option.name }}</div>
        <div v-if="option.remark" class="option-remark">{{ option.remark }}</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

interface Option {
  name: string;
  remark?: string;
  displayName?: string;
}

const props = withDefaults(
  defineProps<{
    options: Option[];
    modelValue: string;
    placeholder?: string;
    disabled?: boolean;
    size?: 'default' | 'compact';
  }>(),
  {
    placeholder: '请选择',
    disabled: false,
    size: 'default',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const open = ref(false);
const activeIndex = ref(-1);
const sizeClass = computed(() => `custom-select-${props.size}`);

const selectedIndex = computed(() => props.options.findIndex(opt => opt.name === props.modelValue));
const selectedOption = computed(() => props.options[selectedIndex.value] || null);
const selectedLabel = computed(
  () => selectedOption.value?.displayName || selectedOption.value?.name || props.placeholder
);

watch(
  () => props.modelValue,
  () => {
    if (selectedIndex.value >= 0) {
      activeIndex.value = selectedIndex.value;
    }
  },
  { immediate: true }
);

watch(
  () => props.options,
  () => {
    if (selectedIndex.value === -1 && activeIndex.value >= props.options.length) {
      activeIndex.value = props.options.length - 1;
    }
  }
);

watch(
  () => props.disabled,
  disabled => {
    if (disabled) {
      closeMenu();
    }
  }
);

function clampIndex(index: number) {
  return Math.min(Math.max(index, 0), props.options.length - 1);
}

function openMenu(preferredIndex?: number) {
  if (props.disabled || props.options.length === 0) {
    return;
  }

  open.value = true;

  if (preferredIndex !== undefined) {
    activeIndex.value = clampIndex(preferredIndex);
    return;
  }

  activeIndex.value = selectedIndex.value >= 0 ? selectedIndex.value : 0;
}

function closeMenu() {
  open.value = false;
}

function toggleOpen() {
  if (open.value) {
    closeMenu();
    return;
  }

  openMenu();
}

function selectOption(option: Option) {
  if (props.disabled) {
    return;
  }

  emit('update:modelValue', option.name);
  closeMenu();
}

function setActiveIndex(index: number) {
  activeIndex.value = clampIndex(index);
}

function moveActive(step: number) {
  if (props.options.length === 0) {
    return;
  }

  if (!open.value) {
    openMenu(step > 0 ? 0 : props.options.length - 1);
    return;
  }

  const current = activeIndex.value >= 0 ? activeIndex.value : 0;
  activeIndex.value = clampIndex(current + step);
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) {
    return;
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      moveActive(1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      moveActive(-1);
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (!open.value) {
        openMenu();
        return;
      }

      if (activeIndex.value >= 0 && props.options[activeIndex.value]) {
        selectOption(props.options[activeIndex.value]);
      }
      break;
    case 'Escape':
      if (open.value) {
        event.preventDefault();
        closeMenu();
      }
      break;
    case 'Home':
      if (open.value && props.options.length > 0) {
        event.preventDefault();
        activeIndex.value = 0;
      }
      break;
    case 'End':
      if (open.value && props.options.length > 0) {
        event.preventDefault();
        activeIndex.value = props.options.length - 1;
      }
      break;
    case 'Tab':
      closeMenu();
      break;
    default:
      break;
  }
}

function handleDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    closeMenu();
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 14px;
}

.custom-select.disabled {
  opacity: 0.6;
}

.custom-select-default {
  font-size: 14px;
}

.custom-select-compact {
  font-size: 12px;
}

.selected {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-background);
  color: var(--color-text-primary);
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  font: inherit;
  text-align: left;
}

.custom-select-compact .selected {
  min-height: 32px;
  padding: 6px 8px;
  border-radius: var(--radius-base);
}

.selected:hover:not(:disabled) {
  border-color: var(--color-primary);
}

.selected:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
}

.selected:disabled {
  cursor: not-allowed;
}

.selected.open {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
}

.selected.placeholder {
  color: var(--color-text-muted);
}

.selected::after {
  content: '';
  flex-shrink: 0;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-top-color: currentColor;
  transform: translateY(2px);
  transition: transform 0.3s ease;
}

.selected.open::after {
  transform: rotate(180deg) translateY(2px);
}

.selected-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.items {
  color: var(--color-text-primary);
  border-radius: 8px;
  overflow: hidden auto;
  border: 1px solid var(--color-primary);
  position: absolute;
  background-color: var(--color-background);
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: 4px;
  max-height: 250px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.option-item {
  width: 100%;
  display: block;
  color: var(--color-text-primary);
  padding: 10px 12px;
  cursor: pointer;
  user-select: none;
  border: none;
  border-bottom: 1px solid var(--color-border-light);
  background: transparent;
  text-align: left;
  transition: background-color 0.2s ease;
  font: inherit;
}

.custom-select-compact .option-item {
  padding: 8px;
}

.option-item:last-child {
  border-bottom: none;
}

.option-item:hover,
.option-item.active {
  background-color: var(--color-primary-muted);
}

.option-item.selected {
  background-color: rgba(107, 70, 193, 0.08);
}

.selectHide {
  display: none;
}

.option-name {
  font-weight: 500;
}

.option-remark {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
  white-space: normal;
}
</style>
