<template>
  <div v-if="showSearch" class="search-section">
    <SearchInput
      :model-value="searchQuery"
      placeholder="搜索历史记录..."
      size="compact"
      @update:model-value="$emit('update:search-query', $event)"
    />
  </div>

  <div v-if="showFilter" class="filter-section">
    <CustomSelect
      :model-value="selectedType"
      :options="filterOptions"
      placeholder="所有类型"
      size="compact"
      @update:model-value="$emit('update:selected-type', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CustomSelect from '@/components/common/CustomSelect.vue';
import SearchInput from '@/components/common/SearchInput.vue';

interface FilterItem {
  type: string
  title: string
}

const props = defineProps<{
  showSearch: boolean
  showFilter: boolean
  searchQuery: string
  selectedType: string
  filterItems: FilterItem[]
}>()

defineEmits<{
  (e: 'update:search-query', value: string): void
  (e: 'update:selected-type', value: string): void
}>()

const filterOptions = computed(() => [
  {
    name: '',
    displayName: '所有类型',
  },
  ...props.filterItems.map(item => ({
    name: item.type,
    displayName: item.title,
  })),
])
</script>

<style scoped>
.search-section,
.filter-section {
  padding: 6px 12px;
  border-top: 1px solid var(--color-border);
}
</style>
