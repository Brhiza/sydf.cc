<template>
  <table class="remote-records-table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key">{{ header.label }}</th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
    <tfoot v-if="$slots.footer">
      <slot name="footer"></slot>
    </tfoot>
  </table>
</template>

<script setup lang="ts">
export interface RemoteRecordsTableHeader {
  key: string;
  label: string;
}

defineProps<{
  headers: RemoteRecordsTableHeader[];
}>();
</script>

<style>
.remote-records-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.remote-records-table th,
.remote-records-table td {
  padding: var(--spacing-3);
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.remote-records-table th {
  background: #eae7f8;
  color: #6b46c1;
  font-weight: 600;
  font-size: var(--font-size-sm);
}

html.dark .remote-records-table {
  background: #1d1d1d;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

html.dark .remote-records-table th,
html.dark .remote-records-table td {
  border-bottom-color: #262628;
}

html.dark .remote-records-table th {
  background: #262628;
}

html.dark .remote-records-table tbody tr:hover {
  background: rgba(139, 92, 246, 0.1);
}

.remote-records-table .amount-cell {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.remote-records-table .cell-truncate {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remote-records-table .action-cell {
  max-width: 120px;
}

.remote-records-table .row-action-button {
  padding: var(--spacing-1) var(--spacing-3);
  background: #eae7f8;
  color: #6b46c1;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
  white-space: nowrap;
}

.remote-records-table .row-action-button:hover {
  transform: scale(1.05);
}

.remote-records-table .placeholder-text {
  color: #999;
  font-size: var(--font-size-sm);
}

html.dark .remote-records-table .placeholder-text {
  color: #6b7280;
}

.remote-records-table .total-row td {
  border-bottom: none;
  background: #f8f9fa;
}

html.dark .remote-records-table .total-row td {
  background: #262628;
  border-bottom-color: #262628;
}

@media (max-width: 768px) {
  .remote-records-table {
    font-size: var(--font-size-sm);
  }

  .remote-records-table th,
  .remote-records-table td {
    padding: var(--spacing-2);
  }

  .remote-records-table .cell-truncate {
    max-width: 100px;
  }
}
</style>
