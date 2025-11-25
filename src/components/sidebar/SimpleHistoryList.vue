<template>
  <div class="history-section">
    <!-- 标题和操作按钮 -->
    <div class="section-header">
      <h3 class="section-title">最近</h3>
      <div class="header-actions">
        <button class="icon-btn" title="搜索" @click="showSearch = !showSearch">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
        <button class="icon-btn" title="筛选" @click="showFilter = !showFilter">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
        </button>
        <div ref="menuContainer" class="menu-container">
          <button class="icon-btn" title="更多" @click="toggleMainMenu">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="2" cy="8" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="14" cy="8" r="1.5" />
            </svg>
          </button>
          <div v-if="showMainMenu" class="dropdown-menu">
            <button class="menu-item" @click="clearAllHistory">
              <span class="menu-icon">🗑️</span>
              <span>清除所有</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div v-if="showSearch" class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索历史记录..."
        class="search-input"
        @input="handleSearch"
      />
    </div>

    <!-- 筛选栏 -->
    <div v-if="showFilter" class="filter-section">
      <select v-model="selectedType" class="filter-select" @change="handleFilter">
        <option value="">所有类型</option>
        <option v-for="item in divinationNavItems" :key="item.type" :value="item.type">
          {{ item.title }}
        </option>
      </select>
    </div>

    <!-- 历史记录列表 -->
    <div class="history-list">
      <div v-if="displayRecords.length === 0" class="empty-state">
        <div class="empty-icon">📜</div>
        <p>{{ getEmptyMessage() }}</p>
      </div>
      
      <div v-else class="records-container">
        <SimpleHistoryItem
          v-for="record in displayRecords"
          :key="record.id"
          :record="record"
          :is-active="selectedHistoryId === record.id"
          @click="handleRecordClick"
          @pin="handlePin"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { divinationNavItems } from '@/config/divination';
import type { HistoryRecord } from '@/services';
import { historyService } from '@/services';
import { eventBus, EVENTS } from '@/utils/eventBus';
import SimpleHistoryItem from './SimpleHistoryItem.vue';

const { selectedHistoryId } = defineProps<{
  selectedHistoryId: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:selectedHistoryId', id: string | null): void;
  (e: 'navigate', path: string): void;
}>();

// 简化的状态管理
const searchQuery = ref('');
const selectedType = ref('');
const showSearch = ref(false);
const showFilter = ref(false);
const showMainMenu = ref(false);
const menuContainer = ref<HTMLElement | null>(null);

// 原始历史记录
const allRecords = ref<HistoryRecord[]>([]);

// 显示的记录（经过搜索和筛选）
const displayRecords = computed(() => {
  let records = allRecords.value;

  // 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    records = records.filter(record => 
      record.question.toLowerCase().includes(query)
    );
  }

  // 类型过滤
  if (selectedType.value) {
    records = records.filter(record => record.type === selectedType.value);
  }

  return records;
});

// 加载历史记录
function loadHistory() {
  allRecords.value = historyService.getRecords();
}

// 处理记录点击
function handleRecordClick(record: HistoryRecord) {
  emit('update:selectedHistoryId', record.id);
  emit('navigate', `/divination/${record.type}?historyId=${record.id}`);
}

// 处理置顶
function handlePin(recordId: string) {
  historyService.togglePinRecord(recordId);
  loadHistory();
}

// 处理编辑
function handleEdit(recordId: string) {
  const record = allRecords.value.find(r => r.id === recordId);
  if (record) {
    const newLabel = prompt('修改标签:', record.question);
    if (newLabel?.trim()) {
      record.question = newLabel.trim();
      historyService['records'] = allRecords.value;
      historyService['saveToStorage']();
      loadHistory();
    }
  }
}

// 处理删除
function handleDelete(recordId: string) {
  if (confirm('确定要删除这条记录吗？')) {
    historyService.deleteRecord(recordId);
    loadHistory();
  }
}

// 清空所有历史记录
function clearAllHistory() {
  if (confirm('确定要清空所有历史记录吗？此操作不可撤销。')) {
    historyService.clearRecords();
    loadHistory();
    showMainMenu.value = false;
  }
}

// 生成测试数据功能已移除 - 清理幽灵代码

// 切换主菜单
function toggleMainMenu() {
  showMainMenu.value = !showMainMenu.value;
}

// 处理搜索
function handleSearch() {
  // 搜索是响应式的，无需额外处理
}

// 处理筛选
function handleFilter() {
  // 筛选是响应式的，无需额外处理
}

// 获取空状态消息
function getEmptyMessage(): string {
  if (searchQuery.value || selectedType.value) {
    return '没有找到匹配的历史记录';
  }
  return '暂无历史记录';
}

// 点击外部关闭菜单
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  
  // 关闭主菜单
  if (showMainMenu.value && menuContainer.value && !menuContainer.value.contains(target)) {
    showMainMenu.value = false;
  }
}

// 监听历史记录更新
function onHistoryUpdated() {
  loadHistory();
}

onMounted(() => {
  loadHistory();
  document.addEventListener('click', handleClickOutside);
  eventBus.on(EVENTS.HISTORY_UPDATED, onHistoryUpdated);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  eventBus.off(EVENTS.HISTORY_UPDATED, onHistoryUpdated);
});
</script>

<style scoped>
.history-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px 4px 12px; /* 减少内边距以节省空间 */
}

.section-title {
  font-size: 12px; /* 减小字体尺寸以节省空间 */
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.6px; /* 减少字间距以节省空间 */
}

.header-actions {
  display: flex;
  gap: 2px; /* 减少间距以节省空间 */
  align-items: center;
}

.icon-btn {
  width: 24px; /* 减小尺寸以节省空间 */
  height: 24px;
  border: none;
  border-radius: 4px; /* 减小圆角以节省空间 */
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--color-text-primary);
}

html.dark .icon-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 100;
  overflow: hidden;
}

.menu-item {
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: background 0.2s ease;
}

.menu-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

html.dark .menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-icon {
  font-size: 16px;
}

.search-section,
.filter-section {
  padding: 6px 12px; /* 减少内边距以节省空间 */
  border-top: 1px solid var(--color-border);
}

.search-input {
  width: 100%;
  padding: 6px 8px; /* 减少内边距以节省空间 */
  border: 1px solid var(--color-border);
  border-radius: 4px; /* 减小圆角以节省空间 */
  background: var(--color-background);
  color: var(--color-text-primary);
  font-size: 12px; /* 减小字体尺寸以节省空间 */
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

.filter-select {
  width: 100%;
  padding: 6px 8px; /* 减少内边距以节省空间 */
  border: 1px solid var(--color-border);
  border-radius: 4px; /* 减小圆角以节省空间 */
  background: var(--color-background);
  color: var(--color-text-primary);
  font-size: 12px; /* 减小字体尺寸以节省空间 */
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px; /* 减少内边距以节省空间 */
  min-height: 0;
}

.records-container {
  display: flex;
  flex-direction: column;
  gap: 2px; /* 减少间距以节省空间 */
}

.empty-state {
  text-align: center;
  padding: 24px 12px; /* 减少内边距以节省空间 */
  color: var(--color-text-secondary);
}

.empty-icon {
  font-size: 32px; /* 减小图标尺寸以节省空间 */
  margin-bottom: 8px; /* 减少间距以节省空间 */
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 12px; /* 减小字体尺寸以节省空间 */
}
</style>
