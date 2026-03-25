<script setup lang="ts">
import { computed, onMounted } from 'vue';
import MeritStatsCard from '@/components/merit/MeritStatsCard.vue';
import RecordStatusBadge from '@/components/common/RecordStatusBadge.vue';
import RemoteRecordsCard from '@/components/common/RemoteRecordsCard.vue';
import RemoteRecordsTable from '@/components/common/RemoteRecordsTable.vue';
import { useRemoteMeritRecords } from '@/composables/useRemoteMeritRecords';

interface DonationRecord {
  id: string;
  name: string;
  amount: number;
  date: string;
  note?: string;
  isAnonymous?: boolean;
}

const {
  records: donationRecords,
  dataSource,
  totalAmount,
  recordCount,
  averageAmount,
  formatAmount,
  formatRecordDate,
  fetchRemoteData,
} = useRemoteMeritRecords<DonationRecord>({
  url: 'https://cdn.jsdelivr.net/gh/Brhiza/sydfjuanzeng@main/juanzeng.json',
  errorMessage: '获取远程数据失败，使用本地数据',
});

const statItems = computed(() => [
  { label: '总捐赠额 (元)', value: totalAmount.value },
  { label: '捐赠人数', value: recordCount.value },
  { label: '人均捐赠 (元)', value: averageAmount.value },
]);

const tableHeaders = [
  { key: 'index', label: '序号' },
  { key: 'name', label: '捐赠人' },
  { key: 'amount', label: '金额' },
  { key: 'date', label: '日期' },
  { key: 'note', label: '备注' },
];

onMounted(() => {
  void fetchRemoteData();
});
</script>

<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <h1 class="page-title">功德榜 🏆</h1>

    <MeritStatsCard :items="statItems" />


    <RemoteRecordsCard
      title="捐赠记录"
      :loading="dataSource.isLoading"
      :has-records="donationRecords.length > 0"
      notice="💡 数据更新可能存在延迟，如需查看最新捐赠记录，请点击上方刷新按钮"
      empty-icon="📋"
      empty-title="暂无捐赠记录"
      @refresh="fetchRemoteData"
    >
      <template #default>
        <RemoteRecordsTable :headers="tableHeaders">
          <tr v-for="(record, index) in donationRecords" :key="record.id">
            <td>{{ index + 1 }}</td>
            <td>
              <RecordStatusBadge v-if="record.isAnonymous" label="🙈 匿名" />
              <span v-else>{{ record.name }}</span>
            </td>
            <td class="amount-cell">{{ formatAmount(record.amount) }}</td>
            <td>{{ formatRecordDate(record.date) }}</td>
            <td class="cell-truncate">{{ record.note || '-' }}</td>
          </tr>

          <template #footer>
            <tr v-if="donationRecords.length > 0" class="total-row">
              <td colspan="2"><strong>总计</strong></td>
              <td class="amount-cell"><strong>{{ formatAmount(totalAmount) }}</strong></td>
              <td colspan="2"><strong>{{ recordCount }} 位捐赠人</strong></td>
            </tr>
          </template>
        </RemoteRecordsTable>
      </template>
    </RemoteRecordsCard>
  </div>
</template>

<style scoped></style>
