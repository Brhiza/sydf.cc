<template>
  <div
    v-if="showDivinationMethodSelector && (meihuaMethod === 'number' || meihuaMethod === 'external')"
    class="method-panel"
  >
    <div v-if="meihuaMethod === 'number'" class="method-panel-row">
      <label for="meihuaNumber" class="form-label">起卦数字:</label>
      <input
        id="meihuaNumber"
        v-model.number="meihuaNumber"
        type="number"
        min="1"
        placeholder="请输入用于起卦的正整数"
        class="method-number-input"
      />
    </div>

    <template v-else-if="meihuaMethod === 'external'">
      <div class="method-panel-notice">
        外应起卦建议从现场最明显的线索里选两项以上，并填写数量来定动爻。
      </div>
      <div class="method-panel-grid">
        <div class="method-panel-item method-panel-item-wide">
          <label class="form-label">现场方位:</label>
          <div class="input-with-remark">
            <CustomSelect
              v-model="meihuaExternalDirection"
              :options="props.meihuaDirectionOptions"
              placeholder="请选择方位"
            />
          </div>
        </div>
        <div class="method-panel-item">
          <label for="meihuaExternalCount" class="form-label">现场数量:</label>
          <input
            id="meihuaExternalCount"
            v-model.number="meihuaExternalCount"
            type="number"
            min="1"
            placeholder="例如 3、5、8"
            class="method-number-input"
          />
        </div>
        <div v-for="field in externalSelectFields" :key="field.key" class="method-panel-item">
          <label class="form-label">{{ field.label }}:</label>
          <div class="input-with-remark">
            <CustomSelect
              v-model="field.model.value"
              :options="field.options"
              :placeholder="field.placeholder"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MeihuaDivinationMethod } from '@/types/divination';
import CustomSelect from '@/components/common/CustomSelect.vue';

type SelectOption = { name: string; remark: string };

const props = defineProps<{
  showDivinationMethodSelector: boolean;
  meihuaDirectionOptions: SelectOption[];
  meihuaPersonOptions: SelectOption[];
  meihuaAnimalOptions: SelectOption[];
  meihuaObjectOptions: SelectOption[];
  meihuaSoundOptions: SelectOption[];
  meihuaColorOptions: SelectOption[];
}>();

const meihuaMethod = defineModel<MeihuaDivinationMethod>('meihuaMethod', { default: 'time' });
const meihuaNumber = defineModel<number | undefined>('meihuaNumber');
const meihuaExternalDirection = defineModel<string | undefined>('meihuaExternalDirection');
const meihuaExternalCount = defineModel<number | undefined>('meihuaExternalCount');
const meihuaExternalPerson = defineModel<string | undefined>('meihuaExternalPerson');
const meihuaExternalAnimal = defineModel<string | undefined>('meihuaExternalAnimal');
const meihuaExternalObject = defineModel<string | undefined>('meihuaExternalObject');
const meihuaExternalSound = defineModel<string | undefined>('meihuaExternalSound');
const meihuaExternalColor = defineModel<string | undefined>('meihuaExternalColor');

const externalSelectFields = computed(() => [
  {
    key: 'person',
    label: '人物特征',
    placeholder: '请选择人物特征',
    options: props.meihuaPersonOptions,
    model: meihuaExternalPerson,
  },
  {
    key: 'animal',
    label: '动物线索',
    placeholder: '请选择动物线索',
    options: props.meihuaAnimalOptions,
    model: meihuaExternalAnimal,
  },
  {
    key: 'object',
    label: '物件设备',
    placeholder: '请选择物件或设备',
    options: props.meihuaObjectOptions,
    model: meihuaExternalObject,
  },
  {
    key: 'sound',
    label: '环境声音',
    placeholder: '请选择环境声音',
    options: props.meihuaSoundOptions,
    model: meihuaExternalSound,
  },
  {
    key: 'color',
    label: '主色调',
    placeholder: '请选择主色调',
    options: props.meihuaColorOptions,
    model: meihuaExternalColor,
  },
]);
</script>

<style scoped>
@import './supplementary-info.shared.css';

.method-panel {
  margin-top: 12px;
  padding: 14px 16px;
  background: var(--color-background-muted);
  border-radius: 12px;
  border: 1px solid var(--color-border-light);
}

.method-panel-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.method-number-input {
  width: 280px;
  max-width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--color-text-primary);
  font-size: 14px;
  box-sizing: border-box;
}

.method-number-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(107, 70, 193, 0.1);
}

.method-panel-notice {
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.method-panel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 16px;
}

.method-panel-item {
  display: flex;
  align-items: center;
}

.method-panel-item-wide {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .method-panel-row,
  .method-panel-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .method-panel-grid {
    grid-template-columns: 1fr;
  }

  .method-number-input {
    width: 100%;
  }
}
</style>
