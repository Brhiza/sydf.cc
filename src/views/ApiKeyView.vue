<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <h1 class="page-title">配置 Key ⚙️</h1>

    <!-- 表单卡片 -->
    <div class="content-card">
      <h2 class="section-title">API 配置</h2>

      <div class="form-group">
        <label class="form-label">
          <input v-model="settings.useCustomApi" type="checkbox" class="form-checkbox" />
          启用自定义 API
        </label>
        <div class="form-hint">启用后将使用您自己的 API，否则使用内置 AI 服务</div>
      </div>

      <div class="form-group" :class="{ 'form-disabled': !settings.useCustomApi }">
        <label class="form-label">API 密钥</label>
        <input
          v-model="settings.customApiKey"
          type="text"
          class="form-input"
          placeholder="输入您的 API Key"
          :disabled="!settings.useCustomApi"
        />
        <div class="form-hint">请输入与 OpenAI 格式兼容的 API 密钥</div>
      </div>

      <div class="form-group" :class="{ 'form-disabled': !settings.useCustomApi }">
        <label class="form-label">API 端点</label>
        <input
          v-model="settings.customApiEndpoint"
          type="text"
          class="form-input"
          placeholder="https://api.example.com/v1"
          :disabled="!settings.useCustomApi"
        />
        <div class="form-hint">请输入基础API地址，系统会自动添加 /chat/completions 路径</div>
      </div>

      <div class="form-group" :class="{ 'form-disabled': !settings.useCustomApi }">
        <label class="form-label">选择模型</label>
        <div class="model-selection-wrapper">
          <select v-model="settings.selectedModel" class="form-select" :disabled="!settings.useCustomApi">
            <option v-for="model in settings.availableModels" :key="model" :value="model">
              {{ model }}
            </option>
          </select>
          <button
            class="btn-primary fetch-models-button"
            :disabled="!settings.useCustomApi || !settings.customApiKey || !settings.customApiEndpoint || isLoadingModels"
            :class="{ loading: isLoadingModels }"
            @click="fetchModels"
          >
            <span v-if="isLoadingModels">加载中...</span>
            <span v-else>获取模型列表</span>
          </button>
        </div>
        <div class="form-hint">
          <span v-if="modelError" class="error-text">{{ modelError }}</span>
          <span v-else-if="debugInfo" class="debug-text">{{ debugInfo }}</span>
          <span v-else>选择要使用的模型，或从您的API提供商获取可用模型列表</span>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-primary" @click="saveSettings">保存设置</button>
        <button class="btn-secondary" @click="resetSettings">重置</button>
      </div>
    </div>

    <!-- 使用说明卡片 -->
    <div class="content-card">
      <h2 class="section-title">使用说明</h2>
      <div class="info-content">
        <p>您可以配置所有兼容 OpenAI 格式的 API</p>
        <p>
          <strong>注意：</strong>
          API 密钥将安全地存储在您的浏览器本地，不会发送到我们的服务器。
        </p>
        <p>
          <strong>模型获取：</strong>
          点击"获取模型列表"按钮将从您配置的API端点获取可用的模型列表。
          如果获取失败，将使用默认模型列表。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const settingsStore = useSettingsStore();

// 直接从 store 中解构 action
const { fetchAvailableModels, updateSettings, resetSettings: resetStoreSettings } = settingsStore;

// 使用 storeToRefs 来获取响应式的 state
const { settings, isLoadingModels, error: modelError } = storeToRefs(settingsStore);

const debugInfo = ref<string | null>(null);


// 获取模型列表
async function fetchModels() {
  // 直接使用 store 中的响应式 state
  if (!settings.value.customApiKey || !settings.value.customApiEndpoint) {
    modelError.value = '请先填写API密钥和端点';
    return;
  }
  debugInfo.value = `正在从 ${settings.value.customApiEndpoint} 获取模型列表...`;
  
  const models = await fetchAvailableModels(settings.value.customApiEndpoint, settings.value.customApiKey);
  
  if (models && models.length > 0) {
    debugInfo.value = `成功获取到 ${models.length} 个模型`;
    // 如果当前选择的模型不在新列表中，自动选择第一个
    if (!models.includes(settings.value.selectedModel)) {
      // 直接修改 store 的 state
      settings.value.selectedModel = models[0];
    }
  } else {
    debugInfo.value = '获取模型列表失败或列表为空。';
  }
}

// 保存设置
function saveSettings() {
  try {
    // updateSettings 会处理所有 settings 对象的保存
    updateSettings(settings.value);
    alert('设置已保存');
    router.push('/');
  } catch (error) {
    console.error('保存设置失败:', error);
    alert(`保存设置失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

// 重置设置
function resetSettings() {
  resetStoreSettings();
  alert('设置已重置');
}
</script>

<style scoped>
/* 特定于此页面的样式 */
.model-selection-wrapper {
  display: flex;
  gap: var(--spacing-3);
  align-items: flex-start;
}

.form-select {
  flex: 1;
}

.fetch-models-button {
  white-space: nowrap;
  min-width: 120px;
}

.fetch-models-button.loading {
  background-color: var(--color-gray-400) !important;
  cursor: wait !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .model-selection-wrapper {
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .fetch-models-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
