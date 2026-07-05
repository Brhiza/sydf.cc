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
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-md);
  z-index: var(--z-dropdown);
  overflow: hidden;
  padding: var(--spacing-1);
  color: var(--color-text-primary);
}

.compact-dropdown-menu-default {
  margin-top: var(--spacing-1);
  min-width: 150px;
  border-radius: var(--radius-lg);
}

.compact-dropdown-menu-compact {
  margin-top: var(--spacing-1);
  min-width: 100px;
  border-radius: var(--radius-md);
}

.compact-dropdown-item {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: var(--radius-md);
  line-height: var(--line-height-tight);
  min-width: 0;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
  text-align: left;
}

.compact-dropdown-menu-default .compact-dropdown-item {
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.compact-dropdown-menu-compact .compact-dropdown-item {
  gap: var(--spacing-1);
  padding: var(--spacing-2);
  font-size: var(--font-size-xs);
}

.compact-dropdown-item:hover,
.compact-dropdown-item:focus-visible {
  background: var(--color-background-soft);
  outline: none;
}

.compact-dropdown-item:focus-visible {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-primary) 28%, transparent);
}

.compact-dropdown-item-danger {
  color: var(--color-danger);
}

.compact-dropdown-item-danger:hover,
.compact-dropdown-item-danger:focus-visible {
  background: color-mix(in srgb, var(--color-danger) 10%, var(--color-background));
  color: var(--color-danger);
}

.compact-dropdown-icon {
  flex-shrink: 0;
  width: 1em;
  text-align: center;
}

.compact-dropdown-item span:last-child {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }

  .compact-dropdown-menu-compact .compact-dropdown-icon {
    font-size: 14px;
  }
}
</style>
