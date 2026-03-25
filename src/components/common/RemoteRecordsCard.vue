<template>
  <div class="content-card">
    <RefreshSectionHeader
      :title="title"
      :loading="loading"
      @refresh="$emit('refresh')"
    />
    <InfoNotice v-if="notice" :message="notice" />
    <div class="table-container">
      <slot v-if="hasRecords"></slot>
      <slot v-else name="empty">
        <EmptyState
          :icon="emptyIcon"
          :title="emptyTitle"
          :hint="emptyHint"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyState from './EmptyState.vue';
import InfoNotice from './InfoNotice.vue';
import RefreshSectionHeader from './RefreshSectionHeader.vue';

withDefaults(defineProps<{
  title: string;
  loading?: boolean;
  hasRecords?: boolean;
  notice?: string;
  emptyIcon?: string;
  emptyTitle?: string;
  emptyHint?: string;
}>(), {
  loading: false,
  hasRecords: false,
  notice: '',
  emptyIcon: '📋',
  emptyTitle: '暂无记录',
  emptyHint: '',
});

defineEmits<{
  refresh: [];
}>();
</script>

<style scoped>
.table-container {
  margin-top: var(--spacing-4);
  overflow-x: auto;
}
</style>
