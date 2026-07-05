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
  margin-top: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-background-muted);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.method-panel-row {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  align-items: center;
  gap: var(--spacing-4);
}

.method-number-input {
  width: min(280px, 100%);
  max-width: 100%;
  min-width: 0;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  box-sizing: border-box;
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.method-number-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-background-soft);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 16%, transparent);
}

.method-panel-notice {
  margin-bottom: var(--spacing-3);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.method-panel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-3) var(--spacing-4);
  min-width: 0;
}

.method-panel-item {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  align-items: center;
  gap: var(--spacing-3);
  min-width: 0;
}

.method-panel-item-wide {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .method-panel {
    padding: var(--spacing-3);
  }

  .method-panel-row,
  .method-panel-item {
    grid-template-columns: 1fr;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .method-panel-grid {
    grid-template-columns: 1fr;
  }

  .method-number-input {
    width: 100%;
  }
}
</style>
