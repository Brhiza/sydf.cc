<template>
  <div class="compact-dropdown-menu" :class="[`compact-dropdown-menu-${size}`]">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      class="compact-dropdown-item"
      :class="{
        'compact-dropdown-item-danger': item.tone === 'danger',
      }"
      @click="handleSelect(item.key, $event)"
    >
      <span v-if="item.icon" class="compact-dropdown-icon">{{ item.icon }}</span>
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
export interface CompactDropdownMenuItem {
  key: string;
  label: string;
  icon?: string;
  tone?: 'default' | 'danger';
}

const props = withDefaults(
  defineProps<{
    items: CompactDropdownMenuItem[];
    size?: 'default' | 'compact';
  }>(),
  {
    size: 'default',
  }
);

const emit = defineEmits<{
  (e: 'select', key: string): void;
}>();

function handleSelect(key: string, event: MouseEvent) {
  event.stopPropagation();
  emit('select', key);
}
</script>

<style scoped>
.compact-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.compact-dropdown-menu-default {
  margin-top: 4px;
  min-width: 150px;
  border-radius: 8px;
}

.compact-dropdown-menu-compact {
  margin-top: 2px;
  min-width: 100px;
  border-radius: 6px;
}

.compact-dropdown-item {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s ease;
  text-align: left;
}

.compact-dropdown-menu-default .compact-dropdown-item {
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
}

.compact-dropdown-menu-compact .compact-dropdown-item {
  gap: 6px;
  padding: 6px 8px;
  font-size: 11px;
}

.compact-dropdown-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

html.dark .compact-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.compact-dropdown-item-danger:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.compact-dropdown-icon {
  flex-shrink: 0;
}

.compact-dropdown-menu-default .compact-dropdown-icon {
  font-size: 16px;
}

.compact-dropdown-menu-compact .compact-dropdown-icon {
  font-size: 12px;
}

@media (max-width: 768px) {
  .compact-dropdown-menu-compact {
    min-width: 120px;
  }

  .compact-dropdown-menu-compact .compact-dropdown-item {
    padding: 8px 12px;
    font-size: 14px;
  }

  .compact-dropdown-menu-compact .compact-dropdown-icon {
    font-size: 14px;
  }
}
</style>
