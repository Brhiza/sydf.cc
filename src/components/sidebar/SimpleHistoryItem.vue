<template>
  <div
    class="history-item"
    :class="{ active: isActive }"
    @click="handleClick"
  >

    <!-- 内容 -->
    <div class="item-content">
      <div class="item-title">
        <span v-if="record.pinned" class="pin-indicator">📌</span>
        {{ record.question }}
      </div>
      <div class="item-meta">
        <span class="item-type">{{ getTypeLabel(record.type) }}</span>
        <span class="item-time">{{ formatTime(record.timestamp) }}</span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="item-actions">
      <button 
        class="action-btn"
        title="更多操作"
        @click.stop="toggleMenu"
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <circle cx="2" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="14" cy="8" r="1.5" />
        </svg>
      </button>

      <!-- 下拉菜单 -->
      <div v-if="showMenu" class="action-menu">
        <button class="menu-item" @click.stop="handlePin">
          <span class="menu-icon">{{ record.pinned ? '📌' : '📍' }}</span>
          <span>{{ record.pinned ? '取消置顶' : '置顶' }}</span>
        </button>
        <button class="menu-item" @click.stop="handleEdit">
          <span class="menu-icon">✏️</span>
          <span>修改标签</span>
        </button>
        <button class="menu-item delete" @click.stop="handleDelete">
          <span class="menu-icon">🗑️</span>
          <span>删除</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { HistoryRecord } from '@/services';

const props = defineProps<{
  record: HistoryRecord;
  isActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', record: HistoryRecord): void;
  (e: 'pin', recordId: string): void;
  (e: 'edit', recordId: string): void;
  (e: 'delete', recordId: string): void;
}>();

const showMenu = ref(false);

// 处理点击
function handleClick() {
  emit('click', props.record);
}

// 切换菜单
function toggleMenu() {
  showMenu.value = !showMenu.value;
}

// 处理置顶
function handlePin() {
  emit('pin', props.record.id);
  showMenu.value = false;
}

// 处理编辑
function handleEdit() {
  emit('edit', props.record.id);
  showMenu.value = false;
}

// 处理删除
function handleDelete() {
  emit('delete', props.record.id);
  showMenu.value = false;
}

// 获取类型标签
function getTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    liuyao: '六爻',
    meihua: '梅花',
    qimen: '奇门',
    tarot: '塔罗',
    tarot_single: '塔罗',
    ssgw: '灵签',
    daily: '运势'
  };
  return typeMap[type] || '未知';
}

// 格式化时间
function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN');
}

// 点击外部关闭菜单
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const isInside = target.closest('.history-item');
  
  if (!isInside) {
    showMenu.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.history-item {
  display: flex;
  align-items: center;
  gap: 8px; /* 减少间距以节省空间 */
  padding: 6px 8px; /* 减少内边距以节省空间 */
  border-radius: 6px; /* 减小圆角以节省空间 */
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.history-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

html.dark .history-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.history-item.active {
  background: #eae7f8; /* 使用浅紫色高光，与nav-list一致 */
  color: #6b46c1; /* 深紫色文字，与nav-list一致 */
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(234, 231, 248, 0.5); /* 添加阴影，与nav-list一致 */
}

html.dark .history-item.active {
  background: #232426; /* 暗色模式使用深灰色，与nav-list一致 */
  color: #ffffff; /* 白色文字，与nav-list一致 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* 暗色模式阴影，与nav-list一致 */
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 14px; /* 与nav-item统一 */
  font-weight: 500;
  color: var(--color-text-secondary); /* 与nav-item统一 */
  margin-bottom: 2px; /* 减少间距以节省空间 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-item.active .item-title {
  color: #6b46c1; /* 深紫色文字，与nav-list一致 */
}

html.dark .history-item.active .item-title {
  color: #ffffff; /* 暗色模式下的白色文字，与nav-list一致 */
}

.pin-indicator {
  display: inline-block;
  margin-right: 2px; /* 减少间距以节省空间 */
  font-size: 10px; /* 减小字体尺寸以节省空间 */
  animation: pin-pulse 2s infinite;
}

@keyframes pin-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.item-meta {
  display: flex;
  gap: 6px; /* 减少间距以节省空间 */
  font-size: 10px; /* 减小字体尺寸以节省空间 */
  color: var(--color-text-secondary);
}

.history-item.active .item-meta {
  color: #6b46c1; /* 深紫色文字，与nav-list一致 */
}

html.dark .history-item.active .item-meta {
  color: rgba(255, 255, 255, 0.8); /* 暗色模式下的白色文字，与nav-list一致 */
}

.item-type {
  background: var(--color-background-muted);
  padding: 1px 4px; /* 减少内边距以节省空间 */
  border-radius: 3px; /* 减小圆角以节省空间 */
  font-size: 9px; /* 减小字体尺寸以节省空间 */
}

.history-item.active .item-type {
  background: rgba(107, 70, 193, 0.1); /* 浅紫色背景，与nav-list一致 */
  color: #6b46c1; /* 深紫色文字，与nav-list一致 */
}

html.dark .history-item.active .item-type {
  background: rgba(255, 255, 255, 0.2); /* 暗色模式下的白色背景，与nav-list一致 */
  color: #ffffff; /* 暗色模式下的白色文字，与nav-list一致 */
}

.item-time {
  opacity: 0.7;
}

.item-actions {
  position: relative;
}

.action-btn {
  width: 20px; /* 减小尺寸以节省空间 */
  height: 20px;
  border: none;
  border-radius: 4px; /* 减小圆角以节省空间 */
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0;
}

.history-item:hover .action-btn {
  opacity: 1;
}

.history-item.active .action-btn {
  color: #6b46c1; /* 深紫色文字，与nav-list一致 */
}

html.dark .history-item.active .action-btn {
  color: rgba(255, 255, 255, 0.8); /* 暗色模式下的白色文字，与nav-list一致 */
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.history-item.active .action-btn:hover {
  background: rgba(107, 70, 193, 0.1); /* 浅紫色背景，与nav-list一致 */
}

html.dark .history-item.active .action-btn:hover {
  background: rgba(255, 255, 255, 0.2); /* 暗色模式下的白色背景，与nav-list一致 */
}

.action-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 2px; /* 减少间距以节省空间 */
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 6px; /* 减小圆角以节省空间 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 100px; /* 减小宽度以节省空间 */
  z-index: 100;
  overflow: hidden;
}

.menu-item {
  width: 100%;
  padding: 6px 8px; /* 减少内边距以节省空间 */
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px; /* 减少间距以节省空间 */
  font-size: 11px; /* 减小字体尺寸以节省空间 */
  transition: background 0.2s ease;
}

.menu-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

html.dark .menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-item.delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.menu-icon {
  font-size: 12px; /* 减小图标尺寸以节省空间 */
}

@media (max-width: 768px) {
  .history-item {
    padding: 4px 6px; /* 进一步减少移动端内边距 */
    gap: 6px; /* 进一步减少移动端间距 */
  }

  .item-title {
    font-size: 13px; /* 与nav-item移动端统一 */
  }

  .item-meta {
    font-size: 9px; /* 进一步减小移动端字体尺寸 */
  }

  .item-type {
    font-size: 8px; /* 进一步减小移动端字体尺寸 */
    padding: 1px 3px; /* 进一步减少移动端内边距 */
  }

  .action-btn {
    opacity: 1;
    width: 18px; /* 进一步减小移动端按钮尺寸 */
    height: 18px;
  }

  .action-menu {
    min-width: 120px; /* 增加移动端菜单宽度 */
  }

  .menu-item {
    padding: 8px 12px; /* 增加移动端内边距，使其更容易点击 */
    font-size: 14px; /* 增加移动端字体尺寸 */
  }

  .menu-icon {
    font-size: 14px; /* 增加移动端图标尺寸 */
  }
}
</style>
