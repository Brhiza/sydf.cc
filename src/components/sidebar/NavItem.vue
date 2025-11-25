<template>
  <li class="nav-item">
    <div
      :class="{ 'nav-link-active': isActive }"
      class="nav-link-content"
      @click="handleClick"
    >
      <span class="nav-icon">{{ icon }}</span>
      <span class="nav-text">{{ title }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
  title: string;
  icon: string;
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
.nav-item {
  margin-bottom: 4px;
}

.nav-link-content {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  border-radius: 8px;
  cursor: pointer;
  margin: 0;
  font-weight: 500;
  gap: 12px;
}

.nav-link-content:hover {
  background: rgba(0, 0, 0, 0.04);
  color: var(--color-text-primary);
  transform: translateX(2px);
}

html.dark .nav-link-content:hover {
  background: rgba(255, 255, 255, 0.06);
}

.nav-link-content.nav-link-active {
  background: var(--color-primary-muted);
  color: var(--color-primary);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(234, 231, 248, 0.5);
}

html.dark .nav-link-content.nav-link-active {
  background: #232426;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.nav-icon {
  font-size: 18px;
  margin-right: 12px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.nav-link-content.nav-link-active .nav-icon {
  color: var(--color-primary);
}

html.dark .nav-link-content.nav-link-active .nav-icon {
  color: #ffffff;
}

.nav-text {
  font-size: 15px;
  font-weight: inherit;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .nav-link-content {
    padding: 10px 14px;
    margin: 0 12px;
  }
}

@media (max-width: 480px) {
  .nav-text {
    font-size: 13px;
  }

  .nav-link-content {
    padding: 5px 10px;
    margin: 0 4px;
  }
}
</style>
