<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 捐赠记录数据类型
interface DonationRecord {
  id: string;
  name: string;
  amount: number;
  date: string;
  note?: string;
  isAnonymous?: boolean;
}

// 捐赠记录数据
const donationRecords = ref<DonationRecord[]>([]);

// 数据源配置
const dataSource = ref({
  url: 'https://cdn.jsdelivr.net/gh/Brhiza/sydfjuanzeng@main/juanzeng.json',
  isLoading: false,
  error: null as string | null
});

// 格式化金额
function formatAmount(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

// 格式化日期
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('zh-CN');
}

// 获取捐赠总额
function getTotalDonations(): number {
  const total = donationRecords.value.reduce((total, record) => total + record.amount, 0);
  // 修复浮点数精度问题，保留2位小数
  return Math.round(total * 100) / 100;
}

// 获取捐赠人数
function getDonorCount(): number {
  return donationRecords.value.length;
}

// 从远程获取数据
async function fetchRemoteData() {
  dataSource.value.isLoading = true;
  dataSource.value.error = null;
  
  try {
    // 添加时间戳参数来强制刷新数据，避免CORS问题
    const timestamp = Date.now();
    const urlWithCache = `${dataSource.value.url}?_t=${timestamp}`;
    
    const response = await fetch(urlWithCache, {
      cache: 'no-cache'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    donationRecords.value = data;
  } catch (error) {
    console.error('获取远程数据失败:', error);
    dataSource.value.error = '获取远程数据失败，使用本地数据';
  } finally {
    dataSource.value.isLoading = false;
  }
}

// 处理触摸开始事件（iOS兼容性）
function handleTouchStart(event: TouchEvent) {
  event.preventDefault();
}

// 处理触摸结束事件（iOS兼容性）
function handleTouchEnd(event: TouchEvent) {
  event.preventDefault();
  fetchRemoteData();
}

// 页面加载时尝试获取远程数据
onMounted(() => {
  fetchRemoteData();
});
</script>

<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <h1 class="page-title">功德榜 🏆</h1>

    <!-- 统计信息 -->
    <div class="content-card">
      <h2 class="section-title">功德统计 <span class="highlight-text">爱心汇聚</span></h2>
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">{{ getTotalDonations() }}</div>
          <div class="stat-label">总捐赠额 (元)</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ getDonorCount() }}</div>
          <div class="stat-label">捐赠人数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ Math.round(getTotalDonations() / getDonorCount()) }}</div>
          <div class="stat-label">人均捐赠 (元)</div>
        </div>
      </div>
    </div>


    <!-- 捐赠记录表格 -->
    <div class="content-card">
      <div class="section-header">
        <h2 class="section-title">
          捐赠记录
          <button 
            class="refresh-button" 
            :disabled="dataSource.isLoading"
            :title="dataSource.isLoading ? '正在刷新...' : '点击刷新数据'"
            type="button"
            @click="fetchRemoteData"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >
            <svg 
              class="refresh-icon" 
              :class="{ 'rotating': dataSource.isLoading }"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
          </button>
        </h2>
      </div>
      <div class="refresh-notice">
        <p>💡 数据更新可能存在延迟，如需查看最新捐赠记录，请点击上方刷新按钮</p>
      </div>
      <div class="table-container">
        <table class="donation-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>捐赠人</th>
              <th>金额</th>
              <th>日期</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in donationRecords" :key="record.id">
              <td>{{ index + 1 }}</td>
              <td>
                <span v-if="record.isAnonymous" class="anonymous-badge">🙈 匿名</span>
                <span v-else>{{ record.name }}</span>
              </td>
              <td class="amount-cell">{{ formatAmount(record.amount) }}</td>
              <td>{{ formatDate(record.date) }}</td>
              <td class="note-cell">{{ record.note || '-' }}</td>
            </tr>
          </tbody>
          <tfoot v-if="donationRecords.length > 0">
            <tr class="total-row">
              <td colspan="2"><strong>总计</strong></td>
              <td class="amount-cell"><strong>{{ formatAmount(getTotalDonations()) }}</strong></td>
              <td colspan="2"><strong>{{ getDonorCount() }} 位捐赠人</strong></td>
            </tr>
          </tfoot>
        </table>
        
        <div v-if="donationRecords.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <p>暂无捐赠记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面特定样式 */
.highlight-text {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

/* 刷新按钮样式 */
.section-header {
  margin-bottom: var(--spacing-4);
}

.section-header .section-title {
  display: flex;
  align-items: center;
  width: 100%;
}

.refresh-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-1);
}

.refresh-button:hover:not(:disabled) {
  background: rgba(102, 126, 234, 0.1);
  color: var(--color-primary);
  transform: scale(1.1);
}

.refresh-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.refresh-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.refresh-icon.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 刷新提醒文字样式 */
.refresh-notice {
  margin-bottom: var(--spacing-3);
  padding: var(--spacing-3);
  background: #fff3cd;
  border-radius: var(--radius-md);
  border-left: 4px solid #f39c12;
}

.refresh-notice p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: #856404;
  line-height: 1.5;
}

/* 暗色模式适配 */
html.dark .refresh-notice {
  background: #92400e;
  border-left-color: #f59e0b;
}

html.dark .refresh-notice p {
  color: #fef3c7;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-4);
  background: #ffffff;
  border-radius: var(--radius-lg);
}

/* 暗色模式统计卡片 */
html.dark .stat-item {
  background: #262628;
  border: 1px solid #262628;
}

.stat-number {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
}


.table-container {
  margin-top: var(--spacing-4);
  overflow-x: auto;
}

.donation-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.donation-table th,
.donation-table td {
  padding: var(--spacing-3);
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.donation-table th {
  background: #eae7f8;
  color: #6b46c1;
  font-weight: 600;
  font-size: var(--font-size-sm);
}

/* 暗色模式表格样式 */
html.dark .donation-table {
  background: #1d1d1d;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

html.dark .donation-table th,
html.dark .donation-table td {
  border-bottom-color: #262628;
}

html.dark .donation-table th {
  background: #262628;
}

html.dark .donation-table tbody tr:hover {
  background: rgba(139, 92, 246, 0.1);
}

html.dark .total-row td {
  background: #262628;
  border-bottom-color: #262628;
}

.amount-cell {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.note-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.anonymous-badge {
  background: #ffd54f;
  color: #5d4037;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

html.dark .anonymous-badge {
  background: #4e421c;
  color: #fde68a;
}


.total-row td {
  border-bottom: none;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-8);
  color: #999;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-2);
}

.empty-state p {
  margin: var(--spacing-1) 0;
}

/* 暗色模式空状态 */
html.dark .empty-state {
  color: #6b7280;
}

/* 功德箱链接按钮样式 */
.merit-box-link {
  margin-top: var(--spacing-4);
  text-align: center;
}

.merit-box-link a {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: #eae7f8;
  color: #6b46c1;
  text-decoration: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.3s ease;
}

.merit-box-link a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.6);
  border-color: #ffd700;
}

.gratitude-message {
  text-align: center;
  line-height: 2;
  font-size: var(--font-size-lg);
  background: #e8f5e8;
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 2px solid #4caf50;
  color: #2e7d32;
}

.gratitude-message p {
  margin: var(--spacing-2) 0;
}

.back-home {
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  background: #eae7f8;
  color: white;
  text-decoration: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2);
  }
  
  .stat-item {
    padding: var(--spacing-2);
  }
  
  .stat-number {
    font-size: var(--font-size-lg);
  }
  
  .stat-label {
    font-size: var(--font-size-xs);
  }
  
  .donation-table {
    font-size: var(--font-size-sm);
  }
  
  .donation-table th,
  .donation-table td {
    padding: var(--spacing-2);
  }
  
  .note-cell {
    max-width: 100px;
  }
  
  .gratitude-message {
    font-size: var(--font-size-md);
    padding: var(--spacing-4);
  }
}
</style>
