<template>
  <li class="footer-item">
    <div
      :class="{ 'footer-link-active': isActive }"
      class="footer-link"
      @click="handleClick"
    >
      <span class="footer-text">{{ title }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
  title: string;
  isActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'navigate', path: string): void;
}>();

const handleClick = () => {
  emit('navigate', props.path);
};
</script>

<style scoped>
.footer-item {
  margin-bottom: 2px;
}

.footer-link {
  display: flex;
  align-items: center;
  padding: 8px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  margin: 0;
  cursor: pointer;
  gap: 8px;
}

.footer-link:hover {
  background: rgba(0, 0, 0, 0.04);
  color: var(--color-text-primary);
  transform: translateX(2px);
}

html.dark .footer-link:hover {
  background: rgba(255, 255, 255, 0.06);
}

.footer-link.footer-link-active {
  background: #eae7f8;
  color: #6b46c1;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(234, 231, 248, 0.5);
}

html.dark .footer-link.footer-link-active {
  background: #232426;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.footer-text {
  font-weight: inherit;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .footer-link {
    padding: 6px;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .footer-text {
    font-size: 13px;
  }

  .footer-link {
    padding: 5px;
    margin: 0;
  }
}
</style>
