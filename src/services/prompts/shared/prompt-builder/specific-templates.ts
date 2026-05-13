import type { PromptBuildConfig, QuestionAnalysis } from '../types';
import { buildBasePromptStructure } from './sections';

export type SpecificPromptKey = 'liuyao' | 'meihua' | 'qimen' | 'tarot' | 'ssgw';
type ExperienceLevel = QuestionAnalysis['userExperience']['level'];

interface SpecificPromptTemplate {
  title: string;
  requirements: string[];
  terminologyByLevel: Record<ExperienceLevel, string>;
}

const SPECIFIC_PROMPT_TEMPLATES: Record<SpecificPromptKey, SpecificPromptTemplate> = {
  liuyao: {
    title: '六爻专业分析要求',
    requirements: [
      '**主卦解读**：分析卦宫、六亲、六神的含义和当前状态',
      '**变卦预示**：分析变卦对主卦的影响和未来发展趋势',
      '**动爻分析**：重点关注动爻的位置、性质和变化含义',
      '**世应关系**：分析世爻（求测者）和应爻（对方或所测之事）的关系',
      '**用神分析**：根据问题确定用神，分析其旺衰、生克、动静状态',
      '**六神启示**：分析青龙、朱雀、勾陈、螣蛇、白虎、玄武的指引',
      '**空亡影响**：分析空亡爻对卦象的影响和注意事项',
      '**特殊卦式优先级**：若数据中标注为静卦，则以本卦卦意、世应和用神静态旺衰为主；若为独静卦，则突出独静爻的指向；若为全动卦，则以本卦与变卦总势为主，不要逐爻做琐碎细断；若为乾卦用九或坤卦用六，则优先按用九、用六的总辞把握大势',
    ],
    terminologyByLevel: {
      beginner: '请用简单语言解释世爻、应爻、用神等概念',
      intermediate: '可适当使用专业术语并简要解释',
      advanced: '可使用专业术语进行深度分析',
    },
  },
  meihua: {
    title: '梅花易数专业分析要求',
    requirements: [
      '**体用总论**：明确体卦（代表我/此事）和用卦（代表对方/环境），根据"用生体吉，克体凶"判断吉凶',
      '**过程分析**：分析互卦代表的事情发展过程，判断过程顺利或艰难',
      '**结局预示**：分析变卦代表的最终结局，判断结局圆满或不利',
      '**旺衰权衡**：结合占卜季节分析体卦和用卦的旺相休囚死，权衡生克力量轻重',
      '**卦象象征**：结合卦象的象征意义进行具体人事解读',
    ],
    terminologyByLevel: {
      beginner: '请用简单语言解释体卦、用卦、五行生克等概念',
      intermediate: '可适当使用专业术语并简要解释',
      advanced: '可使用专业术语进行深度分析',
    },
  },
  qimen: {
    title: '奇门遁甲专业分析要求',
    requirements: [
      '**格局概览**：说明当前奇门局的基本特性（如伏吟、反吟等）和核心能量状态',
      '**用神选取**：根据问题明确核心用神，定位其落宫，分析旺衰状态和吉凶',
      '**核心矛盾**：分析用神宫位与时干宫位、值符值使宫位的关系',
      '**九宫分析**：逐一分析九宫的星、门、神、干组合和能量状态',
      '**吉格凶格**：指出关键吉格（如青龙返首、飞鸟跌穴）或凶格（如白虎猖狂、朱雀投江）',
      '**时空能量**：分析当前奇门局的时空能量分布和对问题的影响',
      '**战略态势**：评估利主利客、利内利外态势',
      '**结构标签**：若数据中已有格局标签（如星伏吟、门反吟、门迫、击刑），需优先解释其对事件推进节奏、阻滞点和风险位的影响',
    ],
    terminologyByLevel: {
      beginner: '请用简单语言解释值符、值使、用神、九宫等概念',
      intermediate: '可适当使用专业术语并简要解释',
      advanced: '可使用专业术语进行深度战略分析',
    },
  },
  tarot: {
    title: '塔罗牌专业分析要求',
    requirements: [
      '**牌面解读**：详细解释每张牌的正位/逆位含义和象征意义',
      '**牌阵分析**：分析牌阵中各牌的位置关系和相互影响',
      '**元素平衡**：分析火、土、风、水四元素的平衡状态',
      '**数字意义**：分析牌面数字的 numerology 意义',
      '**图案符号**：解读牌面图案中的关键符号和隐喻',
      '**整体能量**：综合分析整个牌阵的能量流向和整体信息',
    ],
    terminologyByLevel: {
      beginner: '请用简单语言解释塔罗牌的基本概念',
      intermediate: '可适当使用专业术语并简要解释',
      advanced: '可使用专业术语进行深度分析',
    },
  },
  ssgw: {
    title: '三山国王灵签解读要求',
    requirements: [
      '**签诗原意**：先解释签诗字面意思，避免脱离原文过度发挥',
      '**核心指向**：提炼签文对当前问题最关键的提醒与结论',
      '**典故借鉴**：若签文附带典故，说明它对现实处境的参考意义',
      '**现实落点**：结合用户问题，说明当下宜做什么、不宜做什么',
      '**趋避提醒**：指出需要等待、规避或重点把握的事项',
    ],
    terminologyByLevel: {
      beginner: '请用简单语言解释签诗、典故、寓意等概念',
      intermediate: '可适当使用解签术语并简要解释',
      advanced: '可使用较专业的解签表达，但结论必须清晰直白',
    },
  },
};

export function resolveSpecificPromptKey(divinationType: string): SpecificPromptKey | null {
  if (divinationType in SPECIFIC_PROMPT_TEMPLATES) {
    return divinationType as SpecificPromptKey;
  }
  return null;
}

function appendSpecificSection(
  basePrompt: string,
  template: SpecificPromptTemplate,
  experienceLevel: ExperienceLevel
): string {
  return `${basePrompt}

## ${template.title}
${template.requirements.map((requirement) => `- ${requirement}`).join('\n')}

**专业术语解释**：${template.terminologyByLevel[experienceLevel]}`;
}

export function buildConfiguredPrompt(
  config: PromptBuildConfig,
  key: SpecificPromptKey
): string {
  const basePrompt = buildBasePromptStructure(config);
  return appendSpecificSection(
    basePrompt,
    SPECIFIC_PROMPT_TEMPLATES[key],
    config.analysis.userExperience.level
  );
}
