import { onMounted, watch, type Ref } from 'vue';
import {
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
  type MeihuaAnimalOptionName,
  type MeihuaColorOptionName,
  type MeihuaDirectionOptionName,
  type MeihuaObjectOptionName,
  type MeihuaPersonOptionName,
  type MeihuaSoundOptionName,
} from '@/shared/meihua-omens';
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
  resolveMeihuaOptionName,
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
  meihuaExternalDirection: Ref<MeihuaDirectionOptionName | undefined>;
  meihuaExternalCount: Ref<number | undefined>;
  meihuaExternalPerson: Ref<MeihuaPersonOptionName | undefined>;
  meihuaExternalAnimal: Ref<MeihuaAnimalOptionName | undefined>;
  meihuaExternalObject: Ref<MeihuaObjectOptionName | undefined>;
  meihuaExternalSound: Ref<MeihuaSoundOptionName | undefined>;
  meihuaExternalColor: Ref<MeihuaColorOptionName | undefined>;
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
      resolveMeihuaOptionName(dayPillar.heavenlyStem, heavenlyStems) || '';
    refs.dayPillarEarthlyBranch.value =
      resolveMeihuaOptionName(dayPillar.earthlyBranch, earthlyBranches) || '';
  } else {
    refs.dayPillarHeavenlyStem.value = '';
    refs.dayPillarEarthlyBranch.value = '';
  }

  const meihuaSettings = normalizeMeihuaSettings(savedMeihuaSettings);

  if (meihuaSettings) {
    refs.meihuaMethod.value = meihuaSettings.method || DEFAULT_MEIHUA_METHOD;
    refs.meihuaNumber.value =
      meihuaSettings.method === 'number' ? meihuaSettings.number : undefined;
    refs.meihuaExternalDirection.value =
      meihuaSettings.method === 'external'
        ? resolveMeihuaOptionName(meihuaSettings.externalOmens?.direction, meihuaDirectionOptions)
        : undefined;
    refs.meihuaExternalCount.value =
      meihuaSettings.method === 'external' ? meihuaSettings.externalOmens?.count : undefined;
    refs.meihuaExternalPerson.value =
      meihuaSettings.method === 'external'
        ? resolveMeihuaOptionName(meihuaSettings.externalOmens?.person, meihuaPersonOptions)
        : undefined;
    refs.meihuaExternalAnimal.value =
      meihuaSettings.method === 'external'
        ? resolveMeihuaOptionName(meihuaSettings.externalOmens?.animal, meihuaAnimalOptions)
        : undefined;
    refs.meihuaExternalObject.value =
      meihuaSettings.method === 'external'
        ? resolveMeihuaOptionName(meihuaSettings.externalOmens?.object, meihuaObjectOptions)
        : undefined;
    refs.meihuaExternalSound.value =
      meihuaSettings.method === 'external'
        ? resolveMeihuaOptionName(meihuaSettings.externalOmens?.sound, meihuaSoundOptions)
        : undefined;
    refs.meihuaExternalColor.value =
      meihuaSettings.method === 'external'
        ? resolveMeihuaOptionName(meihuaSettings.externalOmens?.color, meihuaColorOptions)
        : undefined;
  } else {
    refs.meihuaMethod.value = DEFAULT_MEIHUA_METHOD;
    refs.meihuaNumber.value = undefined;
    refs.meihuaExternalDirection.value = undefined;
    refs.meihuaExternalCount.value = undefined;
    refs.meihuaExternalPerson.value = undefined;
    refs.meihuaExternalAnimal.value = undefined;
    refs.meihuaExternalObject.value = undefined;
    refs.meihuaExternalSound.value = undefined;
    refs.meihuaExternalColor.value = undefined;
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
  meihuaExternalDirection: SupplementaryInfoRefs['meihuaExternalDirection']['value'];
  meihuaExternalCount: number | undefined;
  meihuaExternalPerson: SupplementaryInfoRefs['meihuaExternalPerson']['value'];
  meihuaExternalAnimal: SupplementaryInfoRefs['meihuaExternalAnimal']['value'];
  meihuaExternalObject: SupplementaryInfoRefs['meihuaExternalObject']['value'];
  meihuaExternalSound: SupplementaryInfoRefs['meihuaExternalSound']['value'];
  meihuaExternalColor: SupplementaryInfoRefs['meihuaExternalColor']['value'];
  qimenMethod: QimenMethod;
  qimenScope: QimenScope;
}) {
  const meihuaMethod = resolveMeihuaMethod(values.meihuaMethod);
  const meihuaSettings = normalizeMeihuaSettings({
    method: meihuaMethod,
    number: values.meihuaNumber,
    externalOmens: {
      direction: values.meihuaExternalDirection,
      count: values.meihuaExternalCount,
      person: values.meihuaExternalPerson,
      animal: values.meihuaExternalAnimal,
      object: values.meihuaExternalObject,
      sound: values.meihuaExternalSound,
      color: values.meihuaExternalColor,
    },
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
      refs.meihuaExternalDirection,
      refs.meihuaExternalCount,
      refs.meihuaExternalPerson,
      refs.meihuaExternalAnimal,
      refs.meihuaExternalObject,
      refs.meihuaExternalSound,
      refs.meihuaExternalColor,
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
      meihuaExternalDirection,
      meihuaExternalCount,
      meihuaExternalPerson,
      meihuaExternalAnimal,
      meihuaExternalObject,
      meihuaExternalSound,
      meihuaExternalColor,
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
      storageService.setItem(STORAGE_KEY, snapshot);
    }
  );
}
