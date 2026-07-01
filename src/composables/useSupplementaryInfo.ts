import { ref, computed } from 'vue';
import {
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
} from 'mingyu-core/divination/meihua-omens';
import type { MeihuaDivinationMethod, SupplementaryInfo } from '@/types/divination';
import { earthlyBranches, heavenlyStems } from './useSupplementaryInfo.constants';
import { setupSupplementaryInfoPersistence } from './useSupplementaryInfo.persistence';

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

  setupSupplementaryInfoPersistence({
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
  });

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
