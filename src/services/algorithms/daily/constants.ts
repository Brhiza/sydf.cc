export const TIANGAN_WUXING: Record<string, string> = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火',
  戊: '土', 己: '土', 庚: '金', 辛: '金',
  壬: '水', 癸: '水',
};

export const DIZHI_WUXING: Record<string, string> = {
  子: '水', 丑: '土', 寅: '木', 卯: '木',
  辰: '土', 巳: '火', 午: '火', 未: '土',
  申: '金', 酉: '金', 戌: '土', 亥: '水',
};

export const STAR_AUSPICIOUS: Record<string, '吉' | '凶' | '平'> = {
  天蓬: '凶', 天芮: '凶', 天冲: '吉', 天辅: '吉',
  天禽: '吉', 天心: '吉', 天柱: '凶', 天任: '吉', 天英: '平',
};

export const DOOR_AUSPICIOUS: Record<string, '吉' | '凶' | '平'> = {
  休门: '吉', 生门: '吉', 伤门: '凶', 杜门: '平',
  景门: '平', 死门: '凶', 惊门: '凶', 开门: '吉',
};

export const GOD_AUSPICIOUS: Record<string, '吉' | '凶' | '平'> = {
  值符: '吉', 螣蛇: '凶', 太阴: '吉', 六合: '吉',
  九天: '吉', 九地: '吉', 玄武: '凶', 白虎: '凶',
};

export const COLOR_MAP: Record<string, string[]> = {
  金: ['白色', '金色', '银色'],
  木: ['绿色', '青色', '碧色'],
  水: ['黑色', '蓝色', '灰色'],
  火: ['红色', '紫色', '橙色'],
  土: ['黄色', '棕色', '褐色'],
};

export const ZHI_TIME_MAP: Record<string, string> = {
  子: '子时(23:00-01:00)', 丑: '丑时(01:00-03:00)', 寅: '寅时(03:00-05:00)', 卯: '卯时(05:00-07:00)',
  辰: '辰时(07:00-09:00)', 巳: '巳时(09:00-11:00)', 午: '午时(11:00-13:00)', 未: '未时(13:00-15:00)',
  申: '申时(15:00-17:00)', 酉: '酉时(17:00-19:00)', 戌: '戌时(19:00-21:00)', 亥: '亥时(21:00-23:00)',
};

export const GAN_PALACE_MAP: Record<string, number> = {
  甲: 6, 乙: 8, 丙: 9, 丁: 2, 戊: 5,
  己: 7, 庚: 6, 辛: 8, 壬: 9, 癸: 2,
};

export const ZHI_PALACE_MAP: Record<string, number> = {
  子: 1, 丑: 8, 寅: 3, 卯: 4, 辰: 9, 巳: 2,
  午: 7, 未: 6, 申: 1, 酉: 8, 戌: 3, 亥: 4,
};

export const SAN_QI_LIU_YI = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
export const LUO_SHU_PATH = [1, 8, 3, 4, 9, 2, 7, 6];
