<template>
  <div class="custom-select" :tabindex="0" @blur="open = false">
    <div class="selected" :class="{ open: open, placeholder: !selected.name }" @click="open = !open">
      {{ selected.name || placeholder }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="option in options"
        :key="option.name"
        class="option-item"
        @click="selectOption(option)"
      >
        <div class="option-name">{{ option.name }}</div>
        <div class="option-remark">{{ option.remark }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Option {
  name: string;
  remark: string;
}

const props = withDefaults(defineProps<{
  options: Option[];
  modelValue: string;
  placeholder?: string;
}>(), {
  placeholder: '请选择'
});

const emit = defineEmits(['update:modelValue']);

const open = ref(false);

const selected = computed(() => {
  return props.options.find(opt => opt.name === props.modelValue) || { name: '', remark: '' };
});

function selectOption(option: Option) {
  open.value = false;
  emit('update:modelValue', option.name);
}
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 14px;
}

.selected {
  background-color: var(--color-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
}

.selected.open {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(107, 70, 193, 0.1);
}

.selected.placeholder {
  color: var(--color-text-muted);
}

.selected:after {
  position: absolute;
  content: "";
  top: 50%;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: var(--color-text-primary) transparent transparent transparent;
  transform: translateY(-50%) rotate(0deg);
  transition: transform 0.3s ease;
}

.selected.open:after {
    transform: translateY(-25%) rotate(180deg);
}

.items {
  color: var(--color-text-primary);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-primary);
  position: absolute;
  background-color: var(--color-background);
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: 4px;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.option-item {
  color: var(--color-text-primary);
  padding: 10px 12px;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid var(--color-border-light);
}

.option-item:last-child {
    border-bottom: none;
}

.option-item:hover {
  background-color: var(--color-primary-muted);
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
