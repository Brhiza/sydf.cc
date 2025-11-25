import { ref, watch, onMounted, computed } from 'vue';
import type { SupplementaryInfo } from '@/types/divination';
import { storageService } from '@/services/storageService';

export function useSupplementaryInfo() {
  const showSupplementaryInfo = ref(false);
  const gender = ref<'男' | '女' | undefined>();
  const birthYear = ref<number | undefined>();
  const selectedModel = ref('sydf/v1-250520');
  const interpretationStyle = ref<'入门' | '专业' | undefined>();
  const outputLength = ref<'精简' | '详细' | '超详细' | undefined>();
  const dayPillarHeavenlyStem = ref<string>('');
  const dayPillarEarthlyBranch = ref<string>('');

  const divinationMethod = ref<'default' | 'random' | 'number'>('default');
  const divinationNumber = ref<number | undefined>();

  // 天干选项
  const heavenlyStems = [
    { name: '甲', remark: '' },
    { name: '乙', remark: '' },
    { name: '丙', remark: '' },
    { name: '丁', remark: '' },
    { name: '戊', remark: '' },
    { name: '己', remark: '' },
    { name: '庚', remark: '' },
    { name: '辛', remark: '' },
    { name: '壬', remark: '' },
    { name: '癸', remark: '' },
  ];

  // 地支选项
  const earthlyBranches = [
    { name: '子', remark: '' },
    { name: '丑', remark: '' },
    { name: '寅', remark: '' },
    { name: '卯', remark: '' },
    { name: '辰', remark: '' },
    { name: '巳', remark: '' },
    { name: '午', remark: '' },
    { name: '未', remark: '' },
    { name: '申', remark: '' },
    { name: '酉', remark: '' },
    { name: '戌', remark: '' },
    { name: '亥', remark: '' },
  ];

  const models = [
    { name: 'sydf/v1-250520', remark: '时月东方模型' },
    { name: 'qwen/qwen3-max', remark: '阿里通义千问旗舰模型' },
    { name: 'ovo/deepseek-v3.1', remark: 'DeepSeek' },
    { name: 'ovo/glm-4.5', remark: '清华系大模型' },
    { name: 'ovo/kimi-k2-0905', remark: '长文本处理能力强' },
    { name: 'ovo/gemini-2.5-pro', remark: '谷歌最新大模型' },
    { name: 'ovo/gpt-oss-120b', remark: 'OpenAI开源大模型' },
    { name: 'ovo/llama-v4-maverick', remark: 'Meta开源大模型' },
  ];

  const supplementaryInfoToggleText = computed(() => {
    if (gender.value || birthYear.value || interpretationStyle.value || outputLength.value || dayPillarHeavenlyStem.value || dayPillarEarthlyBranch.value) {
      return '已补充信息';
    }
    return '补充信息';
  });

  const getSupplementaryInfo = (): SupplementaryInfo | undefined => {
    const info: SupplementaryInfo = {};
    if (gender.value) info.gender = gender.value;
    if (birthYear.value) info.birthYear = birthYear.value;
    if (selectedModel.value) info.model = selectedModel.value;
    if (interpretationStyle.value) info.interpretationStyle = interpretationStyle.value;
    if (outputLength.value) info.outputLength = outputLength.value;
    if (dayPillarHeavenlyStem.value && dayPillarEarthlyBranch.value) {
      info.dayPillar = {
        heavenlyStem: dayPillarHeavenlyStem.value,
        earthlyBranch: dayPillarEarthlyBranch.value,
      };
    }
    if (divinationMethod.value) info.divinationMethod = divinationMethod.value;
    if (divinationMethod.value === 'number' && divinationNumber.value) {
      info.divinationNumber = divinationNumber.value;
    }
    return Object.keys(info).length > 0 ? info : undefined;
  };

  const resetSupplementaryInfo = () => {
    gender.value = undefined;
    birthYear.value = undefined;
    selectedModel.value = 'sydf/v1-250520';
    interpretationStyle.value = undefined;
    outputLength.value = undefined;
    dayPillarHeavenlyStem.value = '';
    dayPillarEarthlyBranch.value = '';
    divinationMethod.value = 'default';
    divinationNumber.value = undefined;
  };

  onMounted(() => {
    const savedInfo = storageService.getItem<Record<string, unknown>>('supplementaryInfo');
    if (savedInfo) {
      const { 
        gender: savedGender, 
        birthYear: savedBirthYear, 
        model: savedModel,
        interpretationStyle: savedInterpretationStyle,
        outputLength: savedOutputLength,
        dayPillar: savedDayPillar,
        divinationMethod: savedDivinationMethod,
        divinationNumber: savedDivinationNumber,
      } = savedInfo;
      gender.value = savedGender as '男' | '女' | undefined;
      birthYear.value = savedBirthYear as number | undefined;
      if (savedModel) {
        selectedModel.value = savedModel as string;
      }
      interpretationStyle.value = savedInterpretationStyle as '入门' | '专业' | undefined;
      outputLength.value = savedOutputLength as '精简' | '详细' | '超详细' | undefined;
      // 自动恢复干支信息
      if (savedDayPillar && typeof savedDayPillar === 'object' && savedDayPillar !== null) {
        const dayPillar = savedDayPillar as { heavenlyStem?: string; earthlyBranch?: string };
        dayPillarHeavenlyStem.value = dayPillar.heavenlyStem || '';
        dayPillarEarthlyBranch.value = dayPillar.earthlyBranch || '';
      } else {
        dayPillarHeavenlyStem.value = '';
        dayPillarEarthlyBranch.value = '';
      }
      divinationMethod.value = (savedDivinationMethod as 'default' | 'random' | 'number') || 'default';
      divinationNumber.value = savedDivinationNumber as number | undefined;
    }
  });

  watch(
    [gender, birthYear, selectedModel, interpretationStyle, outputLength, dayPillarHeavenlyStem, dayPillarEarthlyBranch, divinationMethod, divinationNumber],
    ([newGender, newBirthYear, newModel, newInterpretationStyle, newOutputLength, newHeavenlyStem, newEarthlyBranch, newDivinationMethod, newDivinationNumber]) => {
      const infoToSave = {
        gender: newGender,
        birthYear: newBirthYear,
        model: newModel,
        interpretationStyle: newInterpretationStyle,
        outputLength: newOutputLength,
        dayPillar:
          newHeavenlyStem && newEarthlyBranch
            ? {
                heavenlyStem: newHeavenlyStem,
                earthlyBranch: newEarthlyBranch,
              }
            : undefined,
        divinationMethod: newDivinationMethod,
        divinationNumber: newDivinationNumber,
      };
      storageService.setItem('supplementaryInfo', infoToSave);
    }
  );

  return {
    showSupplementaryInfo,
    gender,
    birthYear,
    selectedModel,
    interpretationStyle,
    outputLength,
    dayPillarHeavenlyStem,
    dayPillarEarthlyBranch,
    heavenlyStems,
    earthlyBranches,
    models,
    supplementaryInfoToggleText,
    getSupplementaryInfo,
    resetSupplementaryInfo,
    divinationMethod,
    divinationNumber,
  };
}
