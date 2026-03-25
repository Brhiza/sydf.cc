<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import DonationShowcaseCard from '@/components/merit/DonationShowcaseCard.vue';
import MeritStatsCard from '@/components/merit/MeritStatsCard.vue';
import RecordStatusBadge from '@/components/common/RecordStatusBadge.vue';
import RemoteRecordsCard from '@/components/common/RemoteRecordsCard.vue';
import RemoteRecordsTable from '@/components/common/RemoteRecordsTable.vue';
import ImageModal from '@/components/common/ImageModal.vue';
import { useRemoteMeritRecords } from '@/composables/useRemoteMeritRecords';

// 捐赠证书数据
interface Certificate {
  id: string;
  name?: string;
  amount: number;
  date: string;
  certificateUrl?: string;
  isAnonymous?: boolean;
}

const {
  records: certificates,
  dataSource,
  totalAmount,
  recordCount,
  averageAmount,
  formatAmount,
  formatRecordDate,
  fetchRemoteData,
} = useRemoteMeritRecords<Certificate>({
  url: 'https://cdn.jsdelivr.net/gh/Brhiza/sydfjuanzeng@main/zhengshu.json',
  errorMessage: '获取远程数据失败，使用本地数据',
});

const modalState = ref({
  isVisible: false,
  imageUrl: '',
  title: ''
});

const statItems = computed(() => [
  { label: '总捐赠额 (元)', value: totalAmount.value },
  { label: '捐赠次数', value: recordCount.value },
  { label: '次均捐赠 (元)', value: averageAmount.value },
]);

const tableHeaders = [
  { key: 'index', label: '序号' },
  { key: 'name', label: '捐赠项目' },
  { key: 'amount', label: '金额' },
  { key: 'date', label: '日期' },
  { key: 'certificate', label: '链接' },
];

const paymentMethods = [
  {
    src: '/static/alipay.png',
    alt: '支付宝收款码',
    hint: '支付宝扫码捐赠',
  },
  {
    src: '/static/wechat.png',
    alt: '微信收款码',
    hint: '微信扫码捐赠',
  },
];

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

// 页面加载时尝试获取远程数据
onMounted(() => {
  void fetchRemoteData();
});
</script>

<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <h1 class="page-title">功德箱 🙏</h1>

    <DonationShowcaseCard
      merit-box-image-src="/static/gongdexiang.jpg"
      merit-box-image-alt="功德箱"
      :payment-methods="paymentMethods"
      :board-link="{ href: '/gongdeboard', label: '🙏 功德榜' }"
    />

    <MeritStatsCard :items="statItems" />

    <RemoteRecordsCard
      title="捐赠证书"
      :loading="dataSource.isLoading"
      :has-records="certificates.length > 0"
      notice="💡 数据更新可能存在延迟，如需查看最新捐赠记录，请点击上方刷新按钮"
      empty-icon="📋"
      empty-title="暂无捐赠记录"
      @refresh="fetchRemoteData"
    >
      <template #default>
        <RemoteRecordsTable :headers="tableHeaders">
          <tr v-for="(record, index) in certificates" :key="record.id">
            <td>{{ index + 1 }}</td>
            <td>
              <RecordStatusBadge v-if="record.isAnonymous" label="🙈 匿名捐赠" />
              <span v-else>{{ record.name || '爱心捐赠' }}</span>
            </td>
            <td class="amount-cell">{{ formatAmount(record.amount) }}</td>
            <td>{{ formatRecordDate(record.date) }}</td>
            <td class="action-cell">
              <button
                v-if="record.certificateUrl"
                class="row-action-button"
                @click="openImageModal(record.certificateUrl, record.name ? record.name + '的捐赠证书' : '捐赠证书')"
              >
                查看证书
              </button>
              <span v-else class="placeholder-text">暂无证书</span>
            </td>
          </tr>

          <template #footer>
            <tr v-if="certificates.length > 0" class="total-row">
              <td colspan="2"><strong>总计</strong></td>
              <td colspan="3" class="amount-cell"><strong>{{ formatAmount(totalAmount) }}</strong></td>
            </tr>
          </template>
        </RemoteRecordsTable>
      </template>
    </RemoteRecordsCard>
    
    <!-- 图片模态框 -->
    <ImageModal
      :image-url="modalState.imageUrl"
      :is-visible="modalState.isVisible"
      :title="modalState.title"
      @close="closeImageModal"
    />
  </div>
</template>

<style scoped></style>
