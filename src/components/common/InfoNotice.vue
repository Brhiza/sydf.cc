<template>
  <div class="notice">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped>
.notice {
  margin-bottom: var(--spacing-3);
  padding: var(--spacing-3);
  background: #fff3cd;
  border-radius: var(--radius-md);
  border-left: 4px solid #f39c12;
}

.notice p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: #856404;
  line-height: 1.5;
}

html.dark .notice {
  background: #92400e;
  border-left-color: #f59e0b;
}

html.dark .notice p {
  color: #fef3c7;
}
</style>
