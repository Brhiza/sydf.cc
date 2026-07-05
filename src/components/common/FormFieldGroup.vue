<template>
  <div class="form-group" :class="{ 'form-disabled': disabled }">
    <label v-if="label || $slots.label" :for="labelFor" class="form-label">
      <slot name="label">{{ label }}</slot>
    </label>

    <slot></slot>

    <div v-if="hint || $slots.hint" :id="hintId" class="form-hint">
      <slot name="hint">{{ hint }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    hint?: string;
    labelFor?: string;
    hintId?: string;
    disabled?: boolean;
  }>(),
  {
    label: '',
    hint: '',
    labelFor: undefined,
    hintId: undefined,
    disabled: false,
  }
);
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
  min-width: 0;
}

.form-label {
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.form-hint {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  padding-left: var(--spacing-3);
  border-left: 2px solid var(--color-border-light);
}

.form-disabled {
  opacity: 0.65;
}

.form-disabled :deep(input),
.form-disabled :deep(select),
.form-disabled :deep(textarea),
.form-disabled :deep(button) {
  cursor: not-allowed;
}
</style>
