import { ref } from 'vue';
import { throwHolyGrail } from '@/utils/ssgw-data';
import type { SupplementaryInfo } from '@/types/divination';

type EmitFunction = (event: 'submit', payload: { question: string; signNumber?: number; supplementaryInfo?: SupplementaryInfo | undefined }) => void;

export function useSsgw(emit: EmitFunction) {
  // 摇签状态
  const isShaking = ref(false);
  const shakingMessage = ref('');
  const shakingProgress = ref(0);

  // 掷杯状态
  const isTossing = ref(false);
  const showTossResult = ref(false);
  const currentQian = ref(0);
  const beiResults = ref<string[]>([]);
  const tossResult = ref('');
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
            currentQian.value = Math.floor(Math.random() * 61) + 1;
            isShaking.value = false;
            showTossResult.value = true;
            tossCount.value = 0;
            isApproved.value = false;
            beiResults.value = [];
            tossResult.value = '';
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
    tossResult.value = '';

    const holyGrailResult = throwHolyGrail();

    setTimeout(() => {
      beiResults.value = [holyGrailResult.bei1, holyGrailResult.bei2];
      const result = holyGrailResult.result;

      if (result === '圣杯') {
        isApproved.value = true;
        tossResult.value = '<strong>圣杯</strong> (一平一凸) - 神明同意此签。';
        setTimeout(() => {
          tossResult.value += '<p>正在为您解读签文...</p>';
          setTimeout(() => {
            emit('submit', {
              question: currentQuestion,
              signNumber: currentQian.value,
              supplementaryInfo: currentSupplementaryInfo,
            });
          }, 2000);
        }, 1000);
      } else {
        tossCount.value++;
        tossResult.value = result === '笑杯'
          ? '<strong>笑杯</strong> (两平) - 神明笑而不语，可能问题不明或时机未到。'
          : '<strong>阴杯</strong> (两凸) - 神明不同意此签。';

        if (tossCount.value >= 3) {
          tossResult.value += '<p>您已连续三次未能获得圣杯，看来今日不宜再问此事，请改日再来。</p>';
          isTossing.value = false;
        } else {
          tossResult.value += '<p>请重新为您摇签...</p>';
          setTimeout(() => {
            showTossResult.value = false;
            beiResults.value = [];
            tossResult.value = '';
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
    currentQian,
    beiResults,
    tossResult,
    tossCount,
    isApproved,
    startShaking,
    tossShengBei,
  };
}
