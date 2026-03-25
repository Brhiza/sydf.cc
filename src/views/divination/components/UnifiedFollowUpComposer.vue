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
      <button :disabled="disabled" @click="$emit('send')">
        <span v-if="!disabled">发送</span>
        <span v-else>发送中...</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  send: [];
}>();

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
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
  padding: 16px 20px;
  padding-right: 100px;
  border-radius: 16px;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-size: 16px;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.follow-up-input textarea:focus {
  outline: none;
  border-color: var(--color-primary-light);
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.1);
}

.follow-up-input button {
  position: absolute;
  top: 50%;
  right: 8px;
  height: 42px;
  padding: 0 24px;
  border: none;
  border-radius: 12px;
  background-color: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transform: translateY(-50%);
  transition: background-color 0.2s;
}

.follow-up-input button:disabled {
  background-color: var(--color-gray-400);
  cursor: not-allowed;
}
</style>
