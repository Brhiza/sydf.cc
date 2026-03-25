<template>
  <div class="form-group" :class="{ 'form-disabled': disabled }">
    <label v-if="label || $slots.label" :for="labelFor" class="form-label">
      <slot name="label">{{ label }}</slot>
    </label>

    <slot></slot>

    <div v-if="hint || $slots.hint" class="form-hint">
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
    disabled?: boolean;
  }>(),
  {
    label: '',
    hint: '',
    labelFor: undefined,
    disabled: false,
  }
);
</script>
