import { ref } from 'vue';
import type { SupplementaryInfo } from '@/types/divination';

type EmitFunction = (event: 'submit', payload: { question: string; supplementaryInfo?: SupplementaryInfo | undefined }) => void;

export interface SsgwTossMessage {
  title?: string;
  detail: string;
}

/** 投掷圣杯：一平一凸=圣杯，两平=笑杯，两凸=阴杯 */
function tossHolyCup(): {
  result: '圣杯' | '笑杯' | '阴杯';
  bei1: 'ping' | 'tu';
  bei2: 'ping' | 'tu';
} {
  const bei1 = Math.random() > 0.5 ? 'ping' : 'tu';
  const bei2 = Math.random() > 0.5 ? 'ping' : 'tu';
  let result: '圣杯' | '笑杯' | '阴杯';
  if (bei1 !== bei2) result = '圣杯';
  else if (bei1 === 'ping') result = '笑杯';
  else result = '阴杯';
  return { result, bei1, bei2 };
}

export function useSsgw(emit: EmitFunction) {
  // 摇签状态
  const isShaking = ref(false);
  const shakingMessage = ref('');
  const shakingProgress = ref(0);

  // 掷杯状态
  const isTossing = ref(false);
  const showTossResult = ref(false);
  const beiResults = ref<string[]>([]);
  const tossResult = ref<SsgwTossMessage[]>([]);
  const tossCount = ref(0);
  const isApproved = ref(false);
  
  let currentQuestion = '';
  let currentSupplementaryInfo: SupplementaryInfo | undefined;

  // 开始摇签
  const startShaking = (question: string, supplementaryInfo?: SupplementaryInfo) => {
    currentQuestion = question;
    currentSupplementaryInfo = supplementaryInfo;
    isShaking.value = true;
    shakingMessage.value = '请静心默念，准备摇签...';
    shakingProgress.value = 0;

    setTimeout(() => {
      shakingMessage.value = '正在摇签中...';

      const interval = setInterval(() => {
        shakingProgress.value++;
        if (shakingProgress.value >= 5) {
          clearInterval(interval);
          setTimeout(() => {
            isShaking.value = false;
            showTossResult.value = true;
            tossCount.value = 0;
            isApproved.value = false;
            beiResults.value = [];
            tossResult.value = [];
          }, 1000);
        }
      }, 400);
    }, 2000);
  };

  // 投掷圣杯
  const tossShengBei = () => {
    if (isTossing.value) return;

    isTossing.value = true;
    beiResults.value = [];
    tossResult.value = [];

    const holyGrailResult = tossHolyCup();

    setTimeout(() => {
      beiResults.value = [holyGrailResult.bei1, holyGrailResult.bei2];
      const result = holyGrailResult.result;

      if (result === '圣杯') {
        isApproved.value = true;
        tossResult.value = [{ title: '圣杯', detail: '(一平一凸) - 神明同意此签。' }];
        setTimeout(() => {
          tossResult.value = [
            ...tossResult.value,
            { detail: '正在为您解读签文...' },
          ];
          setTimeout(() => {
            emit('submit', {
              question: currentQuestion,
              supplementaryInfo: currentSupplementaryInfo,
            });
          }, 2000);
        }, 1000);
      } else {
        tossCount.value++;
        tossResult.value = result === '笑杯'
          ? [{ title: '笑杯', detail: '(两平) - 神明笑而不语，可能问题不明或时机未到。' }]
          : [{ title: '阴杯', detail: '(两凸) - 神明不同意此签。' }];

        if (tossCount.value >= 3) {
          tossResult.value = [
            ...tossResult.value,
            { detail: '您已连续三次未能获得圣杯，看来今日不宜再问此事，请改日再来。' },
          ];
          isTossing.value = false;
        } else {
          tossResult.value = [
            ...tossResult.value,
            { detail: '请重新为您摇签...' },
          ];
          setTimeout(() => {
            showTossResult.value = false;
            beiResults.value = [];
            tossResult.value = [];
            startShaking(currentQuestion, currentSupplementaryInfo);
          }, 2000);
        }
      }
      if (tossCount.value < 3) {
        isTossing.value = false;
      }
    }, 1300);
  };

  return {
    isShaking,
    shakingMessage,
    shakingProgress,
    isTossing,
    showTossResult,
    beiResults,
    tossResult,
    tossCount,
    isApproved,
    startShaking,
    tossShengBei,
  };
}
