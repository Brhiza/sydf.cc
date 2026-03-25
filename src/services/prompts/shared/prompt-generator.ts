import type { DivinationData, DivinationType, SupplementaryInfo } from '@/types';
import { analyzeQuestion } from './question-analyzer';
import { buildPrompt } from './prompt-builder';
import { getFormattedTimeInfo } from './time-utils';
import type { QuestionAnalysis } from './types';

export interface PromptFormatterContext {
  question: string;
  analysis: QuestionAnalysis;
  supplementaryInfo?: SupplementaryInfo;
}

interface BasePromptGenerationOptions<TData> {
  divinationType: DivinationType;
  question: string;
  data: TData;
  supplementaryInfo?: SupplementaryInfo;
  formatData: (data: TData, context: PromptFormatterContext) => string;
  appendPrompt?: (basePrompt: string, context: PromptFormatterContext & { data: TData }) => string;
}

interface SyncPromptGenerationOptions<TData> extends BasePromptGenerationOptions<TData> {
  timeInfo: string;
}

interface AsyncPromptGenerationOptions<TData> extends BasePromptGenerationOptions<TData> {
  timeInfo?: string;
}

interface GenericPromptGenerationOptions {
  divinationType: DivinationType;
  question: string;
  data: DivinationData;
  timeInfo: string;
  supplementaryInfo?: SupplementaryInfo;
}

export function formatGenericPromptData(data: DivinationData): string {
  if (!data) {
    return '暂无详细数据';
  }

  const infoParts: string[] = [];
  const dataAny = data as unknown as Record<string, unknown>;

  if (dataAny.originalName && typeof dataAny.originalName === 'string') {
    infoParts.push(`主卦：${dataAny.originalName}`);
  }

  if (dataAny.changedName && typeof dataAny.changedName === 'string') {
    infoParts.push(`变卦：${dataAny.changedName}`);
  }

  if (dataAny.interName && typeof dataAny.interName === 'string') {
    infoParts.push(`互卦：${dataAny.interName}`);
  }

  if (dataAny.ganzhi && typeof dataAny.ganzhi === 'object' && dataAny.ganzhi !== null) {
    const ganzhi = dataAny.ganzhi as Record<string, unknown>;
    const { year, month, day, hour } = ganzhi;
    if (
      typeof year === 'string' &&
      typeof month === 'string' &&
      typeof day === 'string' &&
      typeof hour === 'string'
    ) {
      infoParts.push(`干支：${year}年 ${month}月 ${day}日 ${hour}时`);
    }
  }

  if (infoParts.length > 0) {
    return infoParts.join('\n');
  }

  return JSON.stringify(data, null, 2);
}

function buildPromptWithFormatter<TData>(
  options: SyncPromptGenerationOptions<TData>
): string {
  const analysis = analyzeQuestion(options.question);
  const formatterContext: PromptFormatterContext = {
    question: options.question,
    analysis,
    supplementaryInfo: options.supplementaryInfo,
  };

  const formattedData = options.formatData(options.data, formatterContext);
  const basePrompt = buildPrompt({
    divinationType: options.divinationType,
    question: options.question,
    formattedData,
    timeInfo: options.timeInfo,
    analysis,
    ...(options.supplementaryInfo && { supplementaryInfo: options.supplementaryInfo }),
  });

  if (!options.appendPrompt) {
    return basePrompt;
  }

  return options.appendPrompt(basePrompt, {
    ...formatterContext,
    data: options.data,
  });
}

export function generatePromptWithFormatterSync<TData>(
  options: SyncPromptGenerationOptions<TData>
): string {
  return buildPromptWithFormatter(options);
}

export async function generatePromptWithFormatter<TData>(
  options: AsyncPromptGenerationOptions<TData>
): Promise<string> {
  const currentTimeInfo = options.timeInfo || await getFormattedTimeInfo();

  return buildPromptWithFormatter({
    ...options,
    timeInfo: currentTimeInfo,
  });
}

export function generateGenericPromptSync(
  options: GenericPromptGenerationOptions
): string {
  return generatePromptWithFormatterSync({
    divinationType: options.divinationType,
    question: options.question,
    timeInfo: options.timeInfo,
    data: options.data,
    supplementaryInfo: options.supplementaryInfo,
    formatData: (currentData) => formatGenericPromptData(currentData),
  });
}
