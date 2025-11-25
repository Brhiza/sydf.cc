import { computed } from 'vue';
import type { Ref } from 'vue';
import type { LiuyaoYaoDetail, MeihuaYaoDetail } from '@/types/divination';

type HexagramYaoDetail = LiuyaoYaoDetail | MeihuaYaoDetail;

/**
 * @description A composable for handling hexagram display logic.
 * @param {Ref<T>} data - The divination data, which must contain a yaosDetail property.
 * @returns {{reversedYaosDetail: Ref<HexagramYaoDetail[]>}} - Reversed yaos detail.
 */
export function useHexagramDisplay<T extends { yaosDetail?: HexagramYaoDetail[] }>(data: Ref<T>) {
  const reversedYaosDetail = computed(() => {
    if (!data.value.yaosDetail) return [];
    return [...data.value.yaosDetail].reverse();
  });

  return {
    reversedYaosDetail,
  };
}
