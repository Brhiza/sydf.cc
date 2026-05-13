export interface SpecialHourConditions {
  isLiuJiaHour: boolean;
  isLiuGuiHour: boolean;
  isShiGanRuMu: boolean;
  isWuBuYuShi: boolean;
  description: string;
}

const LIU_JIA_HOURS = ['甲子', '甲戌', '甲申', '甲午', '甲辰', '甲寅'];
const LIU_GUI_HOURS = ['癸未', '癸巳', '癸卯', '癸丑', '癸亥', '癸酉'];
const WU_BU_YU_SHI_HOURS = [
  '甲申', '乙酉', '丙子', '丁亥', '戊寅',
  '己卯', '庚午', '辛巳', '壬辰', '癸未',
];

const RU_MU_MAP: Record<string, { palace: number; branch: string }> = {
  乙: { palace: 2, branch: '未' },
  丙: { palace: 6, branch: '戌' },
  戊: { palace: 6, branch: '戌' },
  丁: { palace: 8, branch: '丑' },
  己: { palace: 4, branch: '辰' },
  庚: { palace: 2, branch: '未' },
  辛: { palace: 8, branch: '丑' },
  壬: { palace: 4, branch: '辰' },
  癸: { palace: 9, branch: '午' },
};

export function checkSpecialHourConditions(hourGanZhi: string): SpecialHourConditions {
  const hourGan = hourGanZhi.charAt(0);
  const hourZhi = hourGanZhi.charAt(1);

  const result: SpecialHourConditions = {
    isLiuJiaHour: false,
    isLiuGuiHour: false,
    isShiGanRuMu: false,
    isWuBuYuShi: false,
    description: '',
  };

  if (LIU_JIA_HOURS.includes(hourGanZhi)) {
    result.isLiuJiaHour = true;
    result.description += '六甲时辰（甲时），甲遁于六仪之下；';
  }

  if (LIU_GUI_HOURS.includes(hourGanZhi)) {
    result.isLiuGuiHour = true;
    result.description += '六癸时辰，癸为阴干之末；';
  }

  const ruMuInfo = RU_MU_MAP[hourGan];
  if (ruMuInfo && hourZhi === ruMuInfo.branch) {
    result.isShiGanRuMu = true;
    result.description += `时干${hourGan}入墓（${ruMuInfo.branch}支）；`;
  }

  if (WU_BU_YU_SHI_HOURS.includes(hourGanZhi)) {
    result.isWuBuYuShi = true;
    result.description += '五不遇时（时干克时支），凶时；';
  }

  return result;
}
