<template>
  <div
    ref="rootRef"
    class="custom-select"
    :class="[sizeClass, { disabled }]"
    @keydown="handleKeydown"
  >
    <button
      :id="id"
      type="button"
      class="selected"
      :class="{ open, placeholder: !selectedOption }"
      :disabled="disabled"
      :aria-expanded="open"
      :aria-controls="listboxId"
      :aria-activedescendant="activeOptionId"
      :aria-describedby="ariaDescribedby"
      aria-haspopup="listbox"
      @click="toggleOpen"
    >
      <span class="selected-text">{{ selectedLabel }}</span>
    </button>

    <div :id="listboxId" class="items" :class="{ selectHide: !open }" role="listbox">
      <button
        v-for="(option, index) in options"
        :id="getOptionId(index)"
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
    id?: string;
    ariaDescribedby?: string;
  }>(),
  {
    placeholder: '请选择',
    disabled: false,
    size: 'default',
    id: undefined,
    ariaDescribedby: undefined,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const open = ref(false);
const activeIndex = ref(-1);
const selectId = `custom-select-${Math.random().toString(36).slice(2, 10)}`;
const sizeClass = computed(() => `custom-select-${props.size}`);
const listboxId = `${selectId}-listbox`;

const selectedIndex = computed(() => props.options.findIndex(opt => opt.name === props.modelValue));
const selectedOption = computed(() => props.options[selectedIndex.value] || null);
const selectedLabel = computed(
  () => selectedOption.value?.displayName || selectedOption.value?.name || props.placeholder
);
const activeOptionId = computed(() => (activeIndex.value >= 0 ? getOptionId(activeIndex.value) : undefined));

function getOptionId(index: number) {
  return `${selectId}-option-${index}`;
}

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
  const target = event.target;
  if (!(target instanceof Node)) {
    closeMenu();
    return;
  }

  if (!rootRef.value?.contains(target)) {
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
  font-size: var(--font-size-sm);
}

.custom-select.disabled {
  opacity: 0.6;
}

.custom-select-default {
  font-size: 14px;
}

.custom-select-compact {
  font-size: var(--font-size-sm);
}

button.selected {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
  min-height: 44px;
  padding: 0 var(--spacing-3);
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

.custom-select-compact button.selected {
  min-height: 36px;
  padding: 0 var(--spacing-2);
  border-radius: var(--radius-base);
}

button.selected:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--color-primary) 38%, var(--color-border));
  background: var(--color-background-soft);
}

button.selected:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 16%, transparent);
}

button.selected:disabled {
  cursor: not-allowed;
}

button.selected.open {
  border-color: var(--color-primary);
  background: var(--color-background-soft);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 16%, transparent);
}

button.selected.placeholder {
  color: var(--color-text-muted);
}

button.selected::after {
  content: '';
  flex-shrink: 0;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-top-color: currentColor;
  transform: translateY(2px);
  transition: transform 0.3s ease;
}

button.selected.open::after {
  transform: rotate(180deg) translateY(2px);
}

.selected-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.items {
  color: var(--color-text-primary);
  border-radius: var(--radius-lg);
  overflow: hidden auto;
  border: 1px solid color-mix(in srgb, var(--color-primary) 24%, var(--color-border));
  position: absolute;
  background-color: var(--color-background);
  left: 0;
  right: 0;
  z-index: var(--z-dropdown);
  margin-top: var(--spacing-1);
  max-height: 250px;
  box-shadow: var(--shadow-lg);
  scrollbar-width: thin;
}

.option-item {
  width: 100%;
  display: block;
  color: var(--color-text-primary);
  padding: var(--spacing-3);
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
  padding: var(--spacing-2);
}

.option-item:last-child {
  border-bottom: none;
}

.option-item:hover,
.option-item.active {
  background-color: var(--color-primary-muted);
}

.option-item.selected {
  background-color: color-mix(in srgb, var(--color-primary) 12%, var(--color-background));
  color: var(--color-primary);
}

.selectHide {
  display: none;
}

.option-name {
  font-weight: 500;
  line-height: var(--line-height-tight);
}

.option-remark {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
  white-space: normal;
}
</style>
