import { ref, watch, onMounted, computed } from 'vue';
import {
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
} from '@/config/meihua-omens';
import type { MeihuaDivinationMethod, SupplementaryInfo } from '@/types/divination';
import { storageService } from '@/services/storageService';

export function useSupplementaryInfo() {
  const showSupplementaryInfo = ref(false);
  const gender = ref<'男' | '女' | undefined>();
  const birthYear = ref<number | undefined>();
  const interpretationStyle = ref<'入门' | '专业' | undefined>();
  const outputLength = ref<'精简' | '详细' | '超详细' | undefined>();
  const dayPillarHeavenlyStem = ref<string>('');
  const dayPillarEarthlyBranch = ref<string>('');
  const meihuaMethod = ref<MeihuaDivinationMethod>('time');
  const meihuaNumber = ref<number | undefined>();
  const meihuaExternalDirection = ref<typeof meihuaDirectionOptions[number]['name'] | undefined>();
  const meihuaExternalCount = ref<number | undefined>();
  const meihuaExternalPerson = ref<typeof meihuaPersonOptions[number]['name'] | undefined>();
  const meihuaExternalAnimal = ref<typeof meihuaAnimalOptions[number]['name'] | undefined>();
  const meihuaExternalObject = ref<typeof meihuaObjectOptions[number]['name'] | undefined>();
  const meihuaExternalSound = ref<typeof meihuaSoundOptions[number]['name'] | undefined>();
  const meihuaExternalColor = ref<typeof meihuaColorOptions[number]['name'] | undefined>();

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


  const hasMeihuaCustomSettings = computed(() => {
    if (meihuaMethod.value !== 'time') {
      return true;
    }
    return !!(
      meihuaNumber.value ||
      meihuaExternalDirection.value ||
      meihuaExternalCount.value ||
      meihuaExternalPerson.value ||
      meihuaExternalAnimal.value ||
      meihuaExternalObject.value ||
      meihuaExternalSound.value ||
      meihuaExternalColor.value
    );
  });

  const supplementaryInfoToggleText = computed(() => {
    if (
      gender.value ||
      birthYear.value ||
      interpretationStyle.value ||
      outputLength.value ||
      dayPillarHeavenlyStem.value ||
      dayPillarEarthlyBranch.value ||
      hasMeihuaCustomSettings.value
    ) {
      return '已补充信息';
    }
    return '补充信息';
  });

  const getSupplementaryInfo = (options: { date?: string } = {}): SupplementaryInfo | undefined => {
    const info: SupplementaryInfo = {};
    if (gender.value) info.gender = gender.value;
    if (birthYear.value) info.birthYear = birthYear.value;
    if (interpretationStyle.value) info.interpretationStyle = interpretationStyle.value;
    if (outputLength.value) info.outputLength = outputLength.value;
    if (dayPillarHeavenlyStem.value && dayPillarEarthlyBranch.value) {
      info.dayPillar = {
        heavenlyStem: dayPillarHeavenlyStem.value,
        earthlyBranch: dayPillarEarthlyBranch.value,
      };
    }
    if (meihuaMethod.value === 'number' && meihuaNumber.value) {
      info.meihuaSettings = {
        method: 'number',
        number: meihuaNumber.value,
      };
    } else if (meihuaMethod.value === 'random') {
      info.meihuaSettings = {
        method: 'random',
      };
    } else if (meihuaMethod.value === 'external') {
      info.meihuaSettings = {
        method: 'external',
        externalOmens: {
          ...(meihuaExternalDirection.value && { direction: meihuaExternalDirection.value }),
          ...(meihuaExternalCount.value && { count: meihuaExternalCount.value }),
          ...(meihuaExternalPerson.value && { person: meihuaExternalPerson.value }),
          ...(meihuaExternalAnimal.value && { animal: meihuaExternalAnimal.value }),
          ...(meihuaExternalObject.value && { object: meihuaExternalObject.value }),
          ...(meihuaExternalSound.value && { sound: meihuaExternalSound.value }),
          ...(meihuaExternalColor.value && { color: meihuaExternalColor.value }),
        },
      };
    }
    if (options.date) {
      info.date = options.date;
    }
    return Object.keys(info).length > 0 ? info : undefined;
  };

  const resetSupplementaryInfo = () => {
    gender.value = undefined;
    birthYear.value = undefined;
    interpretationStyle.value = undefined;
    outputLength.value = undefined;
    dayPillarHeavenlyStem.value = '';
    dayPillarEarthlyBranch.value = '';
    meihuaMethod.value = 'time';
    meihuaNumber.value = undefined;
    meihuaExternalDirection.value = undefined;
    meihuaExternalCount.value = undefined;
    meihuaExternalPerson.value = undefined;
    meihuaExternalAnimal.value = undefined;
    meihuaExternalObject.value = undefined;
    meihuaExternalSound.value = undefined;
    meihuaExternalColor.value = undefined;
  };

  onMounted(() => {
    const savedInfo = storageService.getItem<Record<string, unknown>>('supplementaryInfo');
    if (savedInfo) {
      const { 
        gender: savedGender,
        birthYear: savedBirthYear,
        interpretationStyle: savedInterpretationStyle,
        outputLength: savedOutputLength,
        dayPillar: savedDayPillar,
        meihuaSettings: savedMeihuaSettings,
      } = savedInfo;
      gender.value = savedGender as '男' | '女' | undefined;
      birthYear.value = savedBirthYear as number | undefined;
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
      if (savedMeihuaSettings && typeof savedMeihuaSettings === 'object' && savedMeihuaSettings !== null) {
        const meihuaSettings = savedMeihuaSettings as SupplementaryInfo['meihuaSettings'];
        meihuaMethod.value = meihuaSettings?.method || 'time';
        meihuaNumber.value = meihuaSettings?.number;
        meihuaExternalDirection.value = meihuaSettings?.externalOmens?.direction;
        meihuaExternalCount.value = meihuaSettings?.externalOmens?.count;
        meihuaExternalPerson.value = meihuaSettings?.externalOmens?.person;
        meihuaExternalAnimal.value = meihuaSettings?.externalOmens?.animal;
        meihuaExternalObject.value = meihuaSettings?.externalOmens?.object;
        meihuaExternalSound.value = meihuaSettings?.externalOmens?.sound;
        meihuaExternalColor.value = meihuaSettings?.externalOmens?.color;
      } else {
        meihuaMethod.value = 'time';
      }
    }
  });

  watch(
    [
      gender,
      birthYear,
      interpretationStyle,
      outputLength,
      dayPillarHeavenlyStem,
      dayPillarEarthlyBranch,
      meihuaMethod,
      meihuaNumber,
      meihuaExternalDirection,
      meihuaExternalCount,
      meihuaExternalPerson,
      meihuaExternalAnimal,
      meihuaExternalObject,
      meihuaExternalSound,
      meihuaExternalColor,
    ],
    ([
      newGender,
      newBirthYear,
      newInterpretationStyle,
      newOutputLength,
      newHeavenlyStem,
      newEarthlyBranch,
      newMeihuaMethod,
      newMeihuaNumber,
      newMeihuaExternalDirection,
      newMeihuaExternalCount,
      newMeihuaExternalPerson,
      newMeihuaExternalAnimal,
      newMeihuaExternalObject,
      newMeihuaExternalSound,
      newMeihuaExternalColor,
    ]) => {
      const infoToSave = {
        gender: newGender,
        birthYear: newBirthYear,
        interpretationStyle: newInterpretationStyle,
        outputLength: newOutputLength,
        dayPillar:
          newHeavenlyStem && newEarthlyBranch
            ? {
                heavenlyStem: newHeavenlyStem,
                earthlyBranch: newEarthlyBranch,
              }
            : undefined,
        meihuaSettings:
          newMeihuaMethod && newMeihuaMethod !== 'time'
            ? {
                method: newMeihuaMethod,
                ...(newMeihuaMethod === 'number' && typeof newMeihuaNumber === 'number'
                  ? { number: newMeihuaNumber }
                  : {}),
                ...(newMeihuaMethod === 'external'
                  ? {
                      externalOmens: {
                        ...(newMeihuaExternalDirection ? { direction: newMeihuaExternalDirection } : {}),
                        ...(typeof newMeihuaExternalCount === 'number' ? { count: newMeihuaExternalCount } : {}),
                        ...(newMeihuaExternalPerson ? { person: newMeihuaExternalPerson } : {}),
                        ...(newMeihuaExternalAnimal ? { animal: newMeihuaExternalAnimal } : {}),
                        ...(newMeihuaExternalObject ? { object: newMeihuaExternalObject } : {}),
                        ...(newMeihuaExternalSound ? { sound: newMeihuaExternalSound } : {}),
                        ...(newMeihuaExternalColor ? { color: newMeihuaExternalColor } : {}),
                      },
                    }
                  : {}),
              }
            : undefined,
      };
      storageService.setItem('supplementaryInfo', infoToSave);
    }
  );

  return {
    showSupplementaryInfo,
    gender,
    birthYear,
    interpretationStyle,
    outputLength,
    dayPillarHeavenlyStem,
    dayPillarEarthlyBranch,
    heavenlyStems,
    earthlyBranches,
    meihuaMethod,
    meihuaNumber,
    meihuaExternalDirection,
    meihuaExternalCount,
    meihuaExternalPerson,
    meihuaExternalAnimal,
    meihuaExternalObject,
    meihuaExternalSound,
    meihuaExternalColor,
    meihuaDirectionOptions,
    meihuaPersonOptions,
    meihuaAnimalOptions,
    meihuaObjectOptions,
    meihuaSoundOptions,
    meihuaColorOptions,
    supplementaryInfoToggleText,
    getSupplementaryInfo,
    resetSupplementaryInfo,
  };
}
