import { onMounted, watch, type Ref } from 'vue';
import {
  meihuaAnimalOptions,
  meihuaColorOptions,
  meihuaDirectionOptions,
  meihuaObjectOptions,
  meihuaPersonOptions,
  meihuaSoundOptions,
} from 'mingyu-core/divination/meihua-omens';
import type { MeihuaDivinationMethod, SupplementaryInfo } from '@/types/divination';
import { storageService } from '@/services/storageService';

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
  meihuaExternalDirection: Ref<typeof meihuaDirectionOptions[number]['name'] | undefined>;
  meihuaExternalCount: Ref<number | undefined>;
  meihuaExternalPerson: Ref<typeof meihuaPersonOptions[number]['name'] | undefined>;
  meihuaExternalAnimal: Ref<typeof meihuaAnimalOptions[number]['name'] | undefined>;
  meihuaExternalObject: Ref<typeof meihuaObjectOptions[number]['name'] | undefined>;
  meihuaExternalSound: Ref<typeof meihuaSoundOptions[number]['name'] | undefined>;
  meihuaExternalColor: Ref<typeof meihuaColorOptions[number]['name'] | undefined>;
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
  } = savedInfo;

  refs.gender.value = savedGender as '男' | '女' | undefined;
  refs.birthYear.value = savedBirthYear as number | undefined;
  refs.interpretationStyle.value = savedInterpretationStyle as '入门' | '专业' | undefined;
  refs.outputLength.value = savedOutputLength as '精简' | '详细' | '超详细' | undefined;

  if (savedDayPillar && typeof savedDayPillar === 'object' && savedDayPillar !== null) {
    const dayPillar = savedDayPillar as { heavenlyStem?: string; earthlyBranch?: string };
    refs.dayPillarHeavenlyStem.value = dayPillar.heavenlyStem || '';
    refs.dayPillarEarthlyBranch.value = dayPillar.earthlyBranch || '';
  } else {
    refs.dayPillarHeavenlyStem.value = '';
    refs.dayPillarEarthlyBranch.value = '';
  }

  if (savedMeihuaSettings && typeof savedMeihuaSettings === 'object' && savedMeihuaSettings !== null) {
    const meihuaSettings = savedMeihuaSettings as SupplementaryInfo['meihuaSettings'];
    refs.meihuaMethod.value = meihuaSettings?.method || 'time';
    refs.meihuaNumber.value = meihuaSettings?.number;
    refs.meihuaExternalDirection.value = meihuaSettings?.externalOmens?.direction;
    refs.meihuaExternalCount.value = meihuaSettings?.externalOmens?.count;
    refs.meihuaExternalPerson.value = meihuaSettings?.externalOmens?.person;
    refs.meihuaExternalAnimal.value = meihuaSettings?.externalOmens?.animal;
    refs.meihuaExternalObject.value = meihuaSettings?.externalOmens?.object;
    refs.meihuaExternalSound.value = meihuaSettings?.externalOmens?.sound;
    refs.meihuaExternalColor.value = meihuaSettings?.externalOmens?.color;
  } else {
    refs.meihuaMethod.value = 'time';
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
}) {
  return {
    gender: values.gender,
    birthYear: values.birthYear,
    interpretationStyle: values.interpretationStyle,
    outputLength: values.outputLength,
    dayPillar:
      values.dayPillarHeavenlyStem && values.dayPillarEarthlyBranch
        ? {
            heavenlyStem: values.dayPillarHeavenlyStem,
            earthlyBranch: values.dayPillarEarthlyBranch,
          }
        : undefined,
    meihuaSettings:
      values.meihuaMethod && values.meihuaMethod !== 'time'
        ? {
            method: values.meihuaMethod,
            ...(values.meihuaMethod === 'number' && typeof values.meihuaNumber === 'number'
              ? { number: values.meihuaNumber }
              : {}),
            ...(values.meihuaMethod === 'external'
              ? {
                  externalOmens: {
                    ...(values.meihuaExternalDirection
                      ? { direction: values.meihuaExternalDirection }
                      : {}),
                    ...(typeof values.meihuaExternalCount === 'number'
                      ? { count: values.meihuaExternalCount }
                      : {}),
                    ...(values.meihuaExternalPerson
                      ? { person: values.meihuaExternalPerson }
                      : {}),
                    ...(values.meihuaExternalAnimal
                      ? { animal: values.meihuaExternalAnimal }
                      : {}),
                    ...(values.meihuaExternalObject
                      ? { object: values.meihuaExternalObject }
                      : {}),
                    ...(values.meihuaExternalSound
                      ? { sound: values.meihuaExternalSound }
                      : {}),
                    ...(values.meihuaExternalColor
                      ? { color: values.meihuaExternalColor }
                      : {}),
                  },
                }
              : {}),
          }
        : undefined,
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
      });
      storageService.setItem(STORAGE_KEY, snapshot);
    }
  );
}
