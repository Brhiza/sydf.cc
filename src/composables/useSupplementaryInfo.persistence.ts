import { onMounted, watch, type Ref } from 'vue';
import type {
  MeihuaDivinationMethod,
  QimenMethod,
  QimenScope,
} from '@/types/divination';
import { storageService } from '@/services/storageService';
import {
  DEFAULT_QIMEN_METHOD,
  DEFAULT_QIMEN_SCOPE,
  isDefaultQimenSettings,
  resolveQimenSettings,
} from '@/shared/qimen-settings';
import {
  DEFAULT_MEIHUA_METHOD,
  normalizeMeihuaSettings,
  resolveMeihuaMethod,
  resolveOptionName,
} from '@/shared/meihua-settings';
import { earthlyBranches, heavenlyStems } from './useSupplementaryInfo.constants';
import {
  normalizeBasicSupplementaryInfo,
  resolveSupplementaryBirthYear,
  resolveSupplementaryDayPillar,
} from '@/shared/supplementary-info';

const STORAGE_KEY = 'supplementaryInfo';

export interface SupplementaryInfoRefs {
  gender: Ref<'男' | '女' | undefined>;
  birthYear: Ref<number | undefined>;
  interpretationStyle: Ref<'入门' | '专业' | undefined>;
  outputLength: Ref<'精简' | '详细' | '超详细' | undefined>;
  dayPillarHeavenlyStem: Ref<string>;
  dayPillarEarthlyBranch: Ref<string>;
  meihuaMethod: Ref<MeihuaDivinationMethod>;
  meihuaNumber: Ref<number | undefined>;
  qimenMethod: Ref<QimenMethod>;
  qimenScope: Ref<QimenScope>;
}

function restoreFromStorage(refs: SupplementaryInfoRefs) {
  const savedInfo = storageService.getItem<Record<string, unknown>>(STORAGE_KEY);
  if (!savedInfo) return;

  const {
    gender: savedGender,
    birthYear: savedBirthYear,
    interpretationStyle: savedInterpretationStyle,
    outputLength: savedOutputLength,
    dayPillar: savedDayPillar,
    meihuaSettings: savedMeihuaSettings,
    qimenSettings: savedQimenSettings,
  } = savedInfo;

  const basicInfo = normalizeBasicSupplementaryInfo({
    gender: savedGender,
    birthYear: savedBirthYear,
    interpretationStyle: savedInterpretationStyle,
    outputLength: savedOutputLength,
    dayPillar: savedDayPillar,
  });

  refs.gender.value = basicInfo?.gender;
  refs.birthYear.value = basicInfo?.birthYear;
  refs.interpretationStyle.value = basicInfo?.interpretationStyle;
  refs.outputLength.value = basicInfo?.outputLength;

  if (basicInfo?.dayPillar) {
    const dayPillar = basicInfo.dayPillar;
    refs.dayPillarHeavenlyStem.value =
      resolveOptionName(dayPillar.heavenlyStem, heavenlyStems) || '';
    refs.dayPillarEarthlyBranch.value =
      resolveOptionName(dayPillar.earthlyBranch, earthlyBranches) || '';
  } else {
    refs.dayPillarHeavenlyStem.value = '';
    refs.dayPillarEarthlyBranch.value = '';
  }

  const meihuaSettings = normalizeMeihuaSettings(savedMeihuaSettings);

  if (meihuaSettings) {
    refs.meihuaMethod.value = meihuaSettings.method || DEFAULT_MEIHUA_METHOD;
    refs.meihuaNumber.value =
      meihuaSettings.method === 'number' ? meihuaSettings.number : undefined;
  } else {
    refs.meihuaMethod.value = DEFAULT_MEIHUA_METHOD;
    refs.meihuaNumber.value = undefined;
  }

  if (savedQimenSettings && typeof savedQimenSettings === 'object' && savedQimenSettings !== null) {
    const qimenSettings = resolveQimenSettings(savedQimenSettings as Record<string, unknown>);
    refs.qimenMethod.value = qimenSettings.method;
    refs.qimenScope.value = qimenSettings.scope;
  } else {
    refs.qimenMethod.value = DEFAULT_QIMEN_METHOD;
    refs.qimenScope.value = DEFAULT_QIMEN_SCOPE;
  }
}

function buildPersistedSnapshot(values: {
  gender: SupplementaryInfoRefs['gender']['value'];
  birthYear: SupplementaryInfoRefs['birthYear']['value'];
  interpretationStyle: SupplementaryInfoRefs['interpretationStyle']['value'];
  outputLength: SupplementaryInfoRefs['outputLength']['value'];
  dayPillarHeavenlyStem: string;
  dayPillarEarthlyBranch: string;
  meihuaMethod: MeihuaDivinationMethod;
  meihuaNumber: number | undefined;
  qimenMethod: QimenMethod;
  qimenScope: QimenScope;
}) {
  const meihuaMethod = resolveMeihuaMethod(values.meihuaMethod);
  const meihuaSettings = normalizeMeihuaSettings({
    method: meihuaMethod,
    number: values.meihuaNumber,
  });
  const qimenSettings = resolveQimenSettings({
    method: values.qimenMethod,
    scope: values.qimenScope,
  });

  const dayPillar = resolveSupplementaryDayPillar({
    heavenlyStem: values.dayPillarHeavenlyStem,
    earthlyBranch: values.dayPillarEarthlyBranch,
  });

  return {
    gender: values.gender,
    birthYear: resolveSupplementaryBirthYear(values.birthYear),
    interpretationStyle: values.interpretationStyle,
    outputLength: values.outputLength,
    dayPillar,
    meihuaSettings,
    qimenSettings: !isDefaultQimenSettings(qimenSettings) ? qimenSettings : undefined,
  };
}

export function setupSupplementaryInfoPersistence(refs: SupplementaryInfoRefs) {
  onMounted(() => {
    restoreFromStorage(refs);
  });

  watch(
    [
      refs.gender,
      refs.birthYear,
      refs.interpretationStyle,
      refs.outputLength,
      refs.dayPillarHeavenlyStem,
      refs.dayPillarEarthlyBranch,
      refs.meihuaMethod,
      refs.meihuaNumber,
      refs.qimenMethod,
      refs.qimenScope,
    ],
    ([
      gender,
      birthYear,
      interpretationStyle,
      outputLength,
      dayPillarHeavenlyStem,
      dayPillarEarthlyBranch,
      meihuaMethod,
      meihuaNumber,
      qimenMethod,
      qimenScope,
    ]) => {
      const snapshot = buildPersistedSnapshot({
        gender,
        birthYear,
        interpretationStyle,
        outputLength,
        dayPillarHeavenlyStem,
        dayPillarEarthlyBranch,
        meihuaMethod,
        meihuaNumber,
        qimenMethod,
        qimenScope,
      });
      storageService.setItem(STORAGE_KEY, snapshot);
    }
  );
}
