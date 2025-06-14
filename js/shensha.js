/**
 * 神煞计算
 * @param {string} pillarGZ 当前柱的干支, e.g. "甲子"
 * @param {Array<number>} baziArray 八字干支的索引数组 [年干, 年支, 月干, 月支, 日干, 日支, 时干, 时支]
 * @param {boolean} isMan 是否为男性
 * @param {number} pillarIndex 柱的索引 (1:年, 2:月, 3:日, 4:时)
 * @param {string} nianNayin 年柱纳音
 * @returns {Array<string>} 神煞列表
 */
function queryShenSha(pillarGZ, baziArray, isMan, pillarIndex, nianNayin) {
    const shenShaList = [];
    const ctg = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const cdz = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    const [nianGan, nianZhi, yueZhi, riGan, riZhi] = [baziArray[0], baziArray[1], baziArray[3], baziArray[4], baziArray[5]];
    const pillarGan = ctg.indexOf(pillarGZ[0]);
    const pillarZhi = cdz.indexOf(pillarGZ[1]);

    // 天乙贵人 (Tian Yi Gui Ren)
    const tianYiMap = {
        '甲': ['丑', '未'], '戊': ['丑', '未'], '庚': ['丑', '未'],
        '乙': ['子', '申'], '己': ['子', '申'],
        '丙': ['亥', '酉'], '丁': ['亥', '酉'],
        '壬': ['卯', '巳'], '癸': ['卯', '巳'],
        '辛': ['寅', '午']
    };
    const riGanChar = ctg[riGan];
    if (tianYiMap[riGanChar] && tianYiMap[riGanChar].includes(cdz[pillarZhi])) {
        shenShaList.push('天乙贵人');
    }
    const nianGanChar = ctg[nianGan];
    if (tianYiMap[nianGanChar] && tianYiMap[nianGanChar].includes(cdz[pillarZhi])) {
        if (!shenShaList.includes('天乙贵人')) {
            shenShaList.push('天乙贵人');
        }
    }

    // 太极贵人 (Tai Ji Gui Ren)
    const taiJiMap = {
        '甲': ['子', '午'], '乙': ['子', '午'],
        '丙': ['卯', '酉'], '丁': ['卯', '酉'],
        '戊': ['辰', '戌', '丑', '未'], '己': ['辰', '戌', '丑', '未'],
        '庚': ['寅', '亥'], '辛': ['寅', '亥'],
        '壬': ['申', '巳'], '癸': ['申', '巳']
    };
    if (taiJiMap[nianGanChar] && taiJiMap[nianGanChar].includes(cdz[pillarZhi])) {
        shenShaList.push('太极贵人');
    }

    // 天德贵人 (Tian De Gui Ren)
    const tianDeMap = {
        '寅': '丁', '卯': '申', '辰': '壬', '巳': '辛',
        '午': '亥', '未': '甲', '申': '癸', '酉': '寅',
        '戌': '丙', '亥': '乙', '子': '巳', '丑': '庚'
    };
    if (tianDeMap[cdz[yueZhi]] === ctg[pillarGan] || tianDeMap[cdz[yueZhi]] === cdz[pillarZhi]) {
        shenShaList.push('天德贵人');
    }

    // 月德贵人 (Yue De Gui Ren)
    const yueDeMap = {
        '寅': '丙', '午': '丙', '戌': '丙',
        '申': '壬', '子': '壬', '辰': '壬',
        '亥': '甲', '卯': '甲', '未': '甲',
        '巳': '庚', '酉': '庚', '丑': '庚'
    };
    if (yueDeMap[cdz[yueZhi]] === ctg[pillarGan]) {
        shenShaList.push('月德贵人');
    }

    // 文昌贵人 (Wen Chang Gui Ren)
    const wenChangMap = {
        '甲': '巳', '乙': '午', '丙': '申', '丁': '酉', '戊': '申',
        '己': '酉', '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯'
    };
    if (wenChangMap[nianGanChar] === cdz[pillarZhi] || wenChangMap[riGanChar] === cdz[pillarZhi]) {
        shenShaList.push('文昌贵人');
    }

    // 国印贵人 (Guo Yin Gui Ren)
    const guoYinMap = {
        '甲': '戌', '乙': '亥', '丙': '丑', '丁': '寅', '戊': '丑',
        '己': '寅', '庚': '辰', '辛': '巳', '壬': '未', '癸': '申'
    };
    if (guoYinMap[nianGanChar] === cdz[pillarZhi] || guoYinMap[riGanChar] === cdz[pillarZhi]) {
        shenShaList.push('国印贵人');
    }

    // 驿马 (Yi Ma)
    const yiMaMap = {
        '申': '寅', '子': '寅', '辰': '寅',
        '寅': '申', '午': '申', '戌': '申',
        '亥': '巳', '卯': '巳', '未': '巳',
        '巳': '亥', '酉': '亥', '丑': '亥'
    };
    if (yiMaMap[cdz[nianZhi]] === cdz[pillarZhi] || yiMaMap[cdz[riZhi]] === cdz[pillarZhi]) {
        shenShaList.push('驿马');
    }

    // 桃花 (Tao Hua)
    const taoHuaMap = {
        '申': '酉', '子': '酉', '辰': '酉',
        '寅': '卯', '午': '卯', '戌': '卯',
        '亥': '子', '卯': '子', '未': '子',
        '巳': '午', '酉': '午', '丑': '午'
    };
    if (taoHuaMap[cdz[nianZhi]] === cdz[pillarZhi] || taoHuaMap[cdz[riZhi]] === cdz[pillarZhi]) {
        shenShaList.push('桃花');
    }

    // 华盖 (Hua Gai)
    const huaGaiMap = {
        '申': '辰', '子': '辰', '辰': '辰',
        '寅': '戌', '午': '戌', '戌': '戌',
        '亥': '未', '卯': '未', '未': '未',
        '巳': '丑', '酉': '丑', '丑': '丑'
    };
    if (huaGaiMap[cdz[nianZhi]] === cdz[pillarZhi] || huaGaiMap[cdz[riZhi]] === cdz[pillarZhi]) {
        shenShaList.push('华盖');
    }

    // 将星 (Jiang Xing)
    const jiangXingMap = {
        '申': '子', '子': '子', '辰': '子',
        '寅': '午', '午': '午', '戌': '午',
        '亥': '卯', '卯': '卯', '未': '卯',
        '巳': '酉', '酉': '酉', '丑': '酉'
    };
    if (jiangXingMap[cdz[nianZhi]] === cdz[pillarZhi] || jiangXingMap[cdz[riZhi]] === cdz[pillarZhi]) {
        shenShaList.push('将星');
    }

    // 金舆 (Jin Yu)
    const jinYuMap = {
        '甲': '辰', '乙': '巳', '丙': '未', '丁': '申', '戊': '未',
        '己': '申', '庚': '戌', '辛': '亥', '壬': '丑', '癸': '寅'
    };
    if (jinYuMap[riGanChar] === cdz[pillarZhi]) {
        shenShaList.push('金舆');
    }

    // 羊刃 (Yang Ren)
    const yangRenMap = {
        '甲': '卯', '丙': '午', '戊': '午', '庚': '酉', '壬': '子'
    };
    if (yangRenMap[riGanChar] === cdz[pillarZhi]) {
        shenShaList.push('羊刃');
    }

    // 亡神 (Wang Shen)
    const wangShenMap = {
        '申': '亥', '子': '亥', '辰': '亥',
        '寅': '巳', '午': '巳', '戌': '巳',
        '亥': '申', '卯': '申', '未': '申',
        '巳': '寅', '酉': '寅', '丑': '寅'
    };
    if (wangShenMap[cdz[nianZhi]] === cdz[pillarZhi] || wangShenMap[cdz[riZhi]] === cdz[pillarZhi]) {
        shenShaList.push('亡神');
    }

    // 劫煞 (Jie Sha)
    const jieShaMap = {
        '申': '巳', '子': '巳', '辰': '巳',
        '寅': '亥', '午': '亥', '戌': '亥',
        '亥': '申', '卯': '申', '未': '申',
        '巳': '寅', '酉': '寅', '丑': '寅'
    };
    if (jieShaMap[cdz[nianZhi]] === cdz[pillarZhi] || jieShaMap[cdz[riZhi]] === cdz[pillarZhi]) {
        shenShaList.push('劫煞');
    }

    // 红鸾 (Hong Luan)
    const hongLuanZhi = (27 - nianZhi) % 12;
    if (pillarZhi === hongLuanZhi) {
        shenShaList.push('红鸾');
    }

    // 天喜 (Tian Xi)
    const tianXiZhi = (hongLuanZhi + 6) % 12;
    if (pillarZhi === tianXiZhi) {
        shenShaList.push('天喜');
    }

    // 孤辰 (Gu Chen)
    const guChenMap = { '寅': '巳', '卯': '巳', '辰': '巳', '巳': '申', '午': '申', '未': '申', '申': '亥', '酉': '亥', '戌': '亥', '亥': '寅', '子': '寅', '丑': '寅' };
    if (guChenMap[cdz[nianZhi]] === cdz[pillarZhi]) {
        shenShaList.push('孤辰');
    }

    // 寡宿 (Gua Su)
    const guaSuMap = { '寅': '丑', '卯': '丑', '辰': '丑', '巳': '戌', '午': '戌', '未': '戌', '申': '未', '酉': '未', '戌': '未', '亥': '辰', '子': '辰', '丑': '辰' };
    if (guaSuMap[cdz[nianZhi]] === cdz[pillarZhi]) {
        shenShaList.push('寡宿');
    }

    return [...new Set(shenShaList)]; // Return unique values
}