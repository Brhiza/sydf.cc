import { ref, computed } from 'vue';
import {
  type MeihuaAnimalOptionName,
  type MeihuaColorOptionName,
  type MeihuaDirectionOptionName,
  type MeihuaObjectOptionName,
  type MeihuaPersonOptionName,
  type MeihuaSoundOptionName,
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
} from '@/shared/meihua-omens';
import type {
  MeihuaDivinationMethod,
  QimenMethod,
  QimenScope,
  SupplementaryInfo,
} from '@/types/divination';
import { earthlyBranches, heavenlyStems } from './useSupplementaryInfo.constants';
import { setupSupplementaryInfoPersistence } from './useSupplementaryInfo.persistence';
import {
  DEFAULT_QIMEN_METHOD,
  DEFAULT_QIMEN_SCOPE,
  isDefaultQimenSettings,
} from '@/shared/qimen-settings';
import { normalizeMeihuaSettings } from '@/shared/meihua-settings';
import {
  resolveSupplementaryBirthYear,
  resolveSupplementaryDayPillar,
} from '@/shared/supplementary-info';

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
  const meihuaExternalDirection = ref<MeihuaDirectionOptionName | undefined>();
  const meihuaExternalCount = ref<number | undefined>();
  const meihuaExternalPerson = ref<MeihuaPersonOptionName | undefined>();
  const meihuaExternalAnimal = ref<MeihuaAnimalOptionName | undefined>();
  const meihuaExternalObject = ref<MeihuaObjectOptionName | undefined>();
  const meihuaExternalSound = ref<MeihuaSoundOptionName | undefined>();
  const meihuaExternalColor = ref<MeihuaColorOptionName | undefined>();
  const qimenMethod = ref<QimenMethod>(DEFAULT_QIMEN_METHOD);
  const qimenScope = ref<QimenScope>(DEFAULT_QIMEN_SCOPE);

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
      resolveSupplementaryBirthYear(birthYear.value) ||
      interpretationStyle.value ||
      outputLength.value ||
      resolveSupplementaryDayPillar({
        heavenlyStem: dayPillarHeavenlyStem.value,
        earthlyBranch: dayPillarEarthlyBranch.value,
      }) ||
      hasMeihuaCustomSettings.value ||
      !isDefaultQimenSettings({ method: qimenMethod.value, scope: qimenScope.value })
    ) {
      return '已补充信息';
    }
    return '补充信息';
  });

  const getSupplementaryInfo = (options: { date?: string } = {}): SupplementaryInfo | undefined => {
    const info: SupplementaryInfo = {};
    if (gender.value) info.gender = gender.value;
    const resolvedBirthYear = resolveSupplementaryBirthYear(birthYear.value);
    if (resolvedBirthYear) info.birthYear = resolvedBirthYear;
    if (interpretationStyle.value) info.interpretationStyle = interpretationStyle.value;
    if (outputLength.value) info.outputLength = outputLength.value;
    const dayPillar = resolveSupplementaryDayPillar({
      heavenlyStem: dayPillarHeavenlyStem.value,
      earthlyBranch: dayPillarEarthlyBranch.value,
    });
    if (dayPillar) info.dayPillar = dayPillar;
    const meihuaSettings = normalizeMeihuaSettings({
      method: meihuaMethod.value,
      number: meihuaNumber.value,
      externalOmens: {
        direction: meihuaExternalDirection.value,
        count: meihuaExternalCount.value,
        person: meihuaExternalPerson.value,
        animal: meihuaExternalAnimal.value,
        object: meihuaExternalObject.value,
        sound: meihuaExternalSound.value,
        color: meihuaExternalColor.value,
      },
    });
    if (meihuaSettings) info.meihuaSettings = meihuaSettings;
    if (!isDefaultQimenSettings({ method: qimenMethod.value, scope: qimenScope.value })) {
      info.qimenSettings = {
        method: qimenMethod.value,
        scope: qimenScope.value,
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
    qimenMethod.value = DEFAULT_QIMEN_METHOD;
    qimenScope.value = DEFAULT_QIMEN_SCOPE;
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
    qimenMethod,
    qimenScope,
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
    qimenMethod,
    qimenScope,
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
