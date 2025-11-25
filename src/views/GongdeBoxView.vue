<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ImageModal from '@/components/common/ImageModal.vue';

// 捐赠证书数据
interface Certificate {
  id: string;
  name?: string;
  amount: number;
  date: string;
  certificateUrl?: string;
  isAnonymous?: boolean;
}

const certificates = ref<Certificate[]>([]);

// 数据源配置
const dataSource = ref({
  url: 'https://cdn.jsdelivr.net/gh/Brhiza/sydfjuanzeng@main/zhengshu.json',
  isLoading: false,
  error: null as string | null
});

// 模态框状态
const modalState = ref({
  isVisible: false,
  imageUrl: '',
  title: ''
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
  const total = certificates.value.reduce((total, record) => total + record.amount, 0);
  // 修复浮点数精度问题，保留2位小数
  return Math.round(total * 100) / 100;
}

// 获取捐赠人数
function getDonorCount(): number {
  return certificates.value.length;
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
    certificates.value = data;
  } catch (error) {
    console.error('获取远程数据失败:', error);
    dataSource.value.error = '获取远程数据失败，使用本地数据';
  } finally {
    dataSource.value.isLoading = false;
  }
}

// 打开图片模态框
function openImageModal(url: string, title?: string) {
  modalState.value = {
    isVisible: true,
    imageUrl: url,
    title: title || '捐赠证书'
  };
}

// 关闭图片模态框
function closeImageModal() {
  modalState.value.isVisible = false;
  modalState.value.imageUrl = '';
  modalState.value.title = '';
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
    <h1 class="page-title">功德箱 🙏</h1>

    <!-- 功德箱和捐赠方式 -->
    <div class="content-card">
      <div class="donation-container">
        <div class="merit-box-section">
          <img 
            src="/static/gongdexiang.jpg" 
            alt="功德箱" 
            class="merit-box-image"
          />
        </div>
        
        <div class="payment-methods">
          <div class="payment-method">
            <img 
              src="/static/alipay.png" 
              alt="支付宝收款码" 
              class="qrcode-image"
            />
            <p class="donation-hint">支付宝扫码捐赠</p>
          </div>
          <div class="payment-method">
            <img 
              src="/static/wechat.png" 
              alt="微信收款码" 
              class="qrcode-image"
            />
            <p class="donation-hint">微信扫码捐赠</p>
          </div>
        </div>
        <div class="merit-box-link">
          <a href="/#/gongdeboard">
            🙏 功德榜
          </a>
        </div>
      </div>
    </div>

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
          <div class="stat-label">捐赠次数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ Math.round(getTotalDonations() / getDonorCount()) }}</div>
          <div class="stat-label">次均捐赠 (元)</div>
        </div>
      </div>
    </div>

    <!-- 捐赠证书表格 -->
    <div class="content-card">
      <div class="section-header">
        <h2 class="section-title">
          捐赠证书
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
        <table class="certificate-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>捐赠项目</th>
              <th>金额</th>
              <th>日期</th>
              <th>链接</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in certificates" :key="record.id">
              <td>{{ index + 1 }}</td>
              <td>
                <span v-if="record.isAnonymous" class="anonymous-badge">🙈 匿名捐赠</span>
                <span v-else>{{ record.name || '爱心捐赠' }}</span>
              </td>
              <td class="amount-cell">{{ formatAmount(record.amount) }}</td>
              <td>{{ formatDate(record.date) }}</td>
              <td class="link-cell">
                <button 
                  v-if="record.certificateUrl"
                  class="view-certificate-btn"
                  @click="openImageModal(record.certificateUrl, record.name ? record.name + '的捐赠证书' : '捐赠证书')"
                >
                  查看证书
                </button>
                <span v-else class="no-certificate">暂无证书</span>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="certificates.length > 0">
            <tr class="total-row">
              <td colspan="2"><strong>总计</strong></td>
              <td colspan="3" class="amount-cell"><strong>{{ formatAmount(getTotalDonations()) }}</strong></td>

            </tr>
          </tfoot>
        </table>
        
        <div v-if="certificates.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <p>暂无捐赠记录</p>
        </div>
      </div>
    </div>
    
    <!-- 图片模态框 -->
    <ImageModal
      :image-url="modalState.imageUrl"
      :is-visible="modalState.isVisible"
      :title="modalState.title"
      @close="closeImageModal"
    />
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

/* 功德箱样式 */
.donation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-6);
  margin-top: var(--spacing-4);
}

.merit-box-section {
  text-align: center;
}

.merit-box-image {
  max-width: 300px;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-4);
}

.payment-methods {
  display: flex;
  gap: var(--spacing-6);
  justify-content: center;
  flex-wrap: wrap;
}

.payment-method {
  text-align: center;
  padding: var(--spacing-4);
  background: #f8f9fa;
  border-radius: var(--radius-lg);
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 暗色模式支付方式卡片 */
html.dark .payment-method {
  background: #262628;
  border: 1px solid #262628;
}

.payment-method h3 {
  margin: 0 0 var(--spacing-3) 0;
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  align-self: center;
}

.qrcode-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-2);
  display: block;
}

.donation-hint {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

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

/* 统计信息样式 */
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

/* 表格样式 */
.table-container {
  margin-top: var(--spacing-4);
  overflow-x: auto;
}

.certificate-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.certificate-table th,
.certificate-table td {
  padding: var(--spacing-3);
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.certificate-table th {
  background: #eae7f8;
  color: #6b46c1;
  font-weight: 600;
  font-size: var(--font-size-sm);
}

/* 暗色模式表格样式 */
html.dark .certificate-table {
  background: #1d1d1d;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

html.dark .certificate-table th,
html.dark .certificate-table td {
  border-bottom-color: #262628;
}

html.dark .certificate-table th {
  background: #262628;
}

html.dark .certificate-table tbody tr:hover {
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

.link-cell {
  max-width: 120px;
}

.view-certificate-btn {
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

.view-certificate-btn:hover {
  transform: scale(1.05);
}

.no-certificate {
  color: #999;
  font-size: var(--font-size-sm);
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
  background: #f8f9fa;
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

html.dark .no-certificate {
  color: #6b7280;
}

/* 响应式设计 */
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
  
  .certificate-table {
    font-size: var(--font-size-sm);
  }
  
  .certificate-table th,
  .certificate-table td {
    padding: var(--spacing-2);
  }
  
  .payment-methods {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-4);
  }
  
  .payment-method {
    min-width: 140px;
    max-width: 160px;
    padding: var(--spacing-3);
  }
  
  .qrcode-image {
    width: 100px;
    height: 100px;
  }
  
  .payment-method h3 {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-2);
  }
  
  .donation-hint {
    font-size: var(--font-size-xs);
  }
}
</style>
