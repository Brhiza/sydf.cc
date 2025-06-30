const hexagrams = [
    { number: 1, name: "乾为天", symbol: "☰☰" },
    { number: 2, name: "坤为地", symbol: "☷☷" },
    { number: 3, name: "水雷屯", symbol: "☵☳" },
    { number: 4, name: "山水蒙", symbol: "☶☵" },
    { number: 5, name: "水天需", symbol: "☵☰" },
    { number: 6, name: "天水讼", symbol: "☰☵" },
    { number: 7, name: "地水师", symbol: "☷☵" },
    { number: 8, name: "水地比", symbol: "☵☷" },
    { number: 9, name: "风天小畜", symbol: "☴☰" },
    { number: 10, name: "天泽履", symbol: "☰☱" },
    { number: 11, name: "地天泰", symbol: "☷☰" },
    { number: 12, name: "天地否", symbol: "☰☷" },
    { number: 13, name: "天火同人", symbol: "☰☲" },
    { number: 14, name: "火天大有", symbol: "☲☰" },
    { number: 15, name: "地山谦", symbol: "☷☶" },
    { number: 16, name: "雷地豫", symbol: "☳☷" },
    { number: 17, name: "泽雷随", symbol: "☱☳" },
    { number: 18, name: "山风蛊", symbol: "☶☴" },
    { number: 19, name: "地泽临", symbol: "☷☱" },
    { number: 20, name: "风地观", symbol: "☴☷" },
    { number: 21, name: "火雷噬嗑", symbol: "☲☳" },
    { number: 22, name: "山火贲", symbol: "☶☲" },
    { number: 23, name: "山地剥", symbol: "☶☷" },
    { number: 24, name: "地雷复", symbol: "☷☳" },
    { number: 25, name: "天雷无妄", symbol: "☰☳" },
    { number: 26, name: "山天大畜", symbol: "☶☰" },
    { number: 27, name: "山雷颐", symbol: "☶☳" },
    { number: 28, name: "泽风大过", symbol: "☱☴" },
    { number: 29, name: "坎为水", symbol: "☵☵" },
    { number: 30, name: "离为火", symbol: "☲☲" },
    { number: 31, name: "泽山咸", symbol: "☱☶" },
    { number: 32, name: "雷风恒", symbol: "☳☴" },
    { number: 33, name: "天山遁", symbol: "☰☶" },
    { number: 34, name: "雷天大壮", symbol: "☳☰" },
    { number: 35, name: "火地晋", symbol: "☲☷" },
    { number: 36, name: "地火明夷", symbol: "☷☲" },
    { number: 37, name: "风火家人", symbol: "☴☲" },
    { number: 38, name: "火泽睽", symbol: "☲☱" },
    { number: 39, name: "水山蹇", symbol: "☵☶" },
    { number: 40, name: "雷水解", symbol: "☳☵" },
    { number: 41, name: "山泽损", symbol: "☶☱" },
    { number: 42, name: "风雷益", symbol: "☴☳" },
    { number: 43, name: "泽天夬", symbol: "☱☰" },
    { number: 44, name: "天风姤", symbol: "☰☴" },
    { number: 45, name: "泽地萃", symbol: "☱☷" },
    { number: 46, name: "地风升", symbol: "☷☴" },
    { number: 47, name: "泽水困", symbol: "☱☵" },
    { number: 48, name: "水风井", symbol: "☵☴" },
    { number: 49, name: "泽火革", symbol: "☱☲" },
    { number: 50, name: "火风鼎", symbol: "☲☴" },
    { number: 51, name: "震为雷", symbol: "☳☳" },
    { number: 52, name: "艮为山", symbol: "☶☶" },
    { number: 53, name: "风山渐", symbol: "☴☶" },
    { number: 54, name: "雷泽归妹", symbol: "☳☱" },
    { number: 55, name: "雷火丰", symbol: "☳☲" },
    { number: 56, name: "火山旅", symbol: "☲☶" },
    { number: 57, name: "巽为风", symbol: "☴☴" },
    { number: 58, name: "兑为泽", symbol: "☱☱" },
    { number: 59, name: "风水涣", symbol: "☴☵" },
    { number: 60, name: "水泽节", symbol: "☵☱" },
    { number: 61, name: "风泽中孚", symbol: "☴☱" },
    { number: 62, name: "雷山小过", symbol: "☳☶" },
    { number: 63, name: "水火既济", symbol: "☵☲" },
    { number: 64, name: "火水未济", symbol: "☲☵" }
];
const palaces = {
    '乾': { name: '乾', wuxing: '金' },
    '兑': { name: '兑', wuxing: '金' },
    '离': { name: '离', wuxing: '火' },
    '震': { name: '震', wuxing: '木' },
    '巽': { name: '巽', wuxing: '木' },
    '坎': { name: '坎', wuxing: '水' },
    '艮': { name: '艮', wuxing: '土' },
    '坤': { name: '坤', wuxing: '土' }
};
const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const wuxing = {
    '金': ['申', '酉'],
    '木': ['寅', '卯'],
    '水': ['子', '亥'],
    '火': ['巳', '午'],
    '土': ['辰', '戌', '丑', '未']
};
const liuqinRelations = {
    '金': { '金': '兄弟', '木': '妻财', '水': '子孙', '火': '官鬼', '土': '父母' },
    '木': { '木': '兄弟', '土': '妻财', '火': '子孙', '金': '官鬼', '水': '父母' },
    '水': { '水': '兄弟', '火': '妻财', '木': '子孙', '土': '官鬼', '金': '父母' },
    '火': { '火': '兄弟', '金': '妻财', '土': '子孙', '水': '官鬼', '木': '父母' },
    '土': { '土': '兄弟', '水': '妻财', '金': '子孙', '木': '官鬼', '火': '父母' }
};
const najia = {
    '乾': { inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'], wuxing: '金' },
    '坤': { inner: ['未', '巳', '卯'], outer: ['丑', '亥', '酉'], wuxing: '土' },
    '震': { inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'], wuxing: '木' },
    '巽': { inner: ['丑', '亥', '酉'], outer: ['未', '巳', '卯'], wuxing: '木' },
    '坎': { inner: ['寅', '辰', '午'], outer: ['申', '戌', '子'], wuxing: '水' },
    '离': { inner: ['卯', '丑', '亥'], outer: ['酉', '未', '巳'], wuxing: '火' },
    '艮': { inner: ['辰', '午', '申'], outer: ['戌', '子', '寅'], wuxing: '土' },
    '兑': { inner: ['巳', '卯', '丑'], outer: ['亥', '酉', '未'], wuxing: '金' }
};
const sixAnimals = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'];
const sixAnimalsStart = {
    '甲': '青龙', '乙': '青龙',
    '丙': '朱雀', '丁': '朱雀',
    '戊': '勾陈',
    '己': '螣蛇',
    '庚': '白虎', '辛': '白虎',
    '壬': '玄武', '癸': '玄武'
};
const voidBranches = {
    '甲子': ['戌', '亥'], '乙丑': ['戌', '亥'], '丙寅': ['戌', '亥'], '丁卯': ['戌', '亥'], '戊辰': ['戌', '亥'], '己巳': ['戌', '亥'], '庚午': ['戌', '亥'], '辛未': ['戌', '亥'], '壬申': ['戌', '亥'], '癸酉': ['戌', '亥'],
    '甲戌': ['申', '酉'], '乙亥': ['申', '酉'], '丙子': ['申', '酉'], '丁丑': ['申', '酉'], '戊寅': ['申', '酉'], '己卯': ['申', '酉'], '庚辰': ['申', '酉'], '辛巳': ['申', '酉'], '壬午': ['申', '酉'], '癸未': ['申', '酉'],
    '甲申': ['午', '未'], '乙酉': ['午', '未'], '丙戌': ['午', '未'], '丁亥': ['午', '未'], '戊子': ['午', '未'], '己丑': ['午', '未'], '庚寅': ['午', '未'], '辛卯': ['午', '未'], '壬辰': ['午', '未'], '癸巳': ['午', '未'],
    '甲午': ['辰', '巳'], '乙未': ['辰', '巳'], '丙申': ['辰', '巳'], '丁酉': ['辰', '巳'], '戊戌': ['辰', '巳'], '己亥': ['辰', '巳'], '庚子': ['辰', '巳'], '辛丑': ['辰', '巳'], '壬寅': ['辰', '巳'], '癸卯': ['辰', '巳'],
    '甲辰': ['寅', '卯'], '乙巳': ['寅', '卯'], '丙午': ['寅', '卯'], '丁未': ['寅', '卯'], '戊申': ['寅', '卯'], '己酉': ['寅', '卯'], '庚戌': ['寅', '卯'], '辛亥': ['寅', '卯'], '壬子': ['寅', '卯'], '癸丑': ['寅', '卯'],
    '甲寅': ['子', '丑'], '乙卯': ['子', '丑'], '丙辰': ['子', '丑'], '丁巳': ['子', '丑'], '戊午': ['子', '丑'], '己未': ['子', '丑'], '庚申': ['子', '丑'], '辛酉': ['子', '丑'], '壬戌': ['子', '丑'], '癸亥': ['子', '丑']
};

function generateYao() {
    const coins = Array(3).fill(0).map(() => Math.random() < 0.5 ? 3 : 2);
    const sum = coins.reduce((a, b) => a + b, 0);
    return sum;
}

function yaoArrayToHexagramInfo(yaos) {
    const trigramMap = {
        '111': { name: '乾', symbol: '☰' },
        '110': { name: '兑', symbol: '☱' },
        '101': { name: '离', symbol: '☲' },
        '100': { name: '震', symbol: '☳' },
        '011': { name: '巽', symbol: '☴' },
        '010': { name: '坎', symbol: '☵' },
        '001': { name: '艮', symbol: '☶' },
        '000': { name: '坤', symbol: '☷' }
    };
    const binaryYaos = yaos.map(y => (y === '阳' ? '1' : '0'));
    const upperTrigramKey = binaryYaos.slice(3).join('');
    const lowerTrigramKey = binaryYaos.slice(0, 3).join('');
    const upperTrigram = trigramMap[upperTrigramKey];
    const lowerTrigram = trigramMap[lowerTrigramKey];
    return {
        symbol: upperTrigram.symbol + lowerTrigram.symbol,
        upper: upperTrigram,
        lower: lowerTrigram
    };
}

function findPalace(hexagramName) {
    const palaceMap = {
        "乾为天": "乾", "天风姤": "乾", "天山遁": "乾", "天地否": "乾", "风地观": "乾", "山地剥": "乾", "火地晋": "乾", "火天大有": "乾",
        "坤为地": "坤", "地雷复": "坤", "地泽临": "坤", "地天泰": "坤", "雷天大壮": "坤", "泽天夬": "坤", "水天需": "坤", "水地比": "坤",
        "震为雷": "震", "雷地豫": "震", "雷水解": "震", "雷风恒": "震", "地风升": "震", "水风井": "震", "泽风大过": "震", "泽雷随": "震",
        "巽为风": "巽", "风天小畜": "巽", "风火家人": "巽", "风雷益": "巽", "天雷无妄": "巽", "火雷噬嗑": "巽", "山雷颐": "巽", "山风蛊": "巽",
        "坎为水": "坎", "水泽节": "坎", "水雷屯": "坎", "水火既济": "坎", "泽火革": "坎", "雷火丰": "坎", "地火明夷": "坎", "地水师": "坎",
        "离为火": "离", "火山旅": "离", "火风鼎": "离", "火水未济": "离", "山水蒙": "离", "风水涣": "离", "天水讼": "离", "天火同人": "离",
        "艮为山": "艮", "山火贲": "艮", "山天大畜": "艮", "山泽损": "艮", "火泽睽": "艮", "天泽履": "艮", "风泽中孚": "艮", "风山渐": "艮",
        "兑为泽": "兑", "泽水困": "兑", "泽地萃": "兑", "泽山咸": "兑", "水山蹇": "兑", "地山谦": "兑", "雷山小过": "兑", "雷泽归妹": "兑"
    };
    return palaces[palaceMap[hexagramName]];
}

function getShiYing(hexagramName, palaceName) {
    const palaceOrder = ["首卦", "一世", "二世", "三世", "四世", "五世", "游魂", "归魂"];
    const shiYaoMap = { "首卦": 6, "一世": 1, "二世": 2, "三世": 3, "四世": 4, "五世": 5, "游魂": 4, "归魂": 3 };
    const palaceMap = {
        "乾为天": "乾", "天风姤": "乾", "天山遁": "乾", "天地否": "乾", "风地观": "乾", "山地剥": "乾", "火地晋": "乾", "火天大有": "乾",
        "坤为地": "坤", "地雷复": "坤", "地泽临": "坤", "地天泰": "坤", "雷天大壮": "坤", "泽天夬": "坤", "水天需": "坤", "水地比": "坤",
        "震为雷": "震", "雷地豫": "震", "雷水解": "震", "雷风恒": "震", "地风升": "震", "水风井": "震", "泽风大过": "震", "泽雷随": "震",
        "巽为风": "巽", "风天小畜": "巽", "风火家人": "巽", "风雷益": "巽", "天雷无妄": "巽", "火雷噬嗑": "巽", "山雷颐": "巽", "山风蛊": "巽",
        "坎为水": "坎", "水泽节": "坎", "水雷屯": "坎", "水火既济": "坎", "泽火革": "坎", "雷火丰": "坎", "地火明夷": "坎", "地水师": "坎",
        "离为火": "离", "火山旅": "离", "火风鼎": "离", "火水未济": "离", "山水蒙": "离", "风水涣": "离", "天水讼": "离", "天火同人": "离",
        "艮为山": "艮", "山火贲": "艮", "山天大畜": "艮", "山泽损": "艮", "火泽睽": "艮", "天泽履": "艮", "风泽中孚": "艮", "风山渐": "艮",
        "兑为泽": "兑", "泽水困": "兑", "泽地萃": "兑", "泽山咸": "兑", "水山蹇": "兑", "地山谦": "兑", "雷山小过": "兑", "雷泽归妹": "兑"
    };
    let generation = 0;
    const palaceHexagrams = Object.keys(palaceMap).filter(k => palaceMap[k] === palaceName);
    const index = palaceHexagrams.indexOf(hexagramName);
    if (index !== -1) {
        generation = index;
    }
    const shiYao = shiYaoMap[palaceOrder[generation]];
    const yingYao = (shiYao + 3) > 6 ? (shiYao - 3) : (shiYao + 3);
    return { shi: shiYao, ying: yingYao };
}

function getNaJiaAndLiuQin(mainHexagram, palace) {
    const innerNaijia = najia[mainHexagram.lower.name];
    const outerNaijia = najia[mainHexagram.upper.name];
    const palaceWuxing = palace.wuxing;
    const yaosWithInfo = [];
    for (let i = 0; i < 6; i++) {
        const dizhi = (i < 3) ? innerNaijia.inner[i] : outerNaijia.outer[i - 3];
        let yaoWuxing = '';
        for (const [wx, dzs] of Object.entries(wuxing)) {
            if (dzs.includes(dizhi)) {
                yaoWuxing = wx;
                break;
            }
        }
        const liuqin = liuqinRelations[palaceWuxing][yaoWuxing];
        yaosWithInfo.push({
            dizhi: dizhi,
            wuxing: yaoWuxing,
            liuqin: liuqin
        });
    }
    return yaosWithInfo;
}

function getSixAnimals(dayGan) {
    const startAnimal = sixAnimalsStart[dayGan];
    const startIndex = sixAnimals.indexOf(startAnimal);
    const result = [];
    for (let i = 0; i < 6; i++) {
        result.push(sixAnimals[(startIndex + i) % 6]);
    }
    return result;
}

function getVoidBranches(dayGanZhi) {
    return voidBranches[dayGanZhi] || ['无', '无'];
}

function getHexagrams(ganzhi) {
    const rawYaos = Array(6).fill(0).map(() => generateYao());
    const mainYaos = rawYaos.map(yao => {
        if (yao === 7 || yao === 9) return '阳';
        if (yao === 6 || yao === 8) return '阴';
        return '错误';
    });
    const changedYaos = rawYaos.map(yao => {
        if (yao === 6) return '阳';
        if (yao === 9) return '阴';
        return (yao === 7 || yao === 9) ? '阳' : '阴';
    });
    const mainHexagramInfo = yaoArrayToHexagramInfo(mainYaos);
    const changedHexagramInfo = yaoArrayToHexagramInfo(changedYaos);
    const mainHexagram = {
        ...hexagrams.find(h => h.symbol === mainHexagramInfo.symbol),
        ...mainHexagramInfo
    };
    const changedHexagram = {
        ...hexagrams.find(h => h.symbol === changedHexagramInfo.symbol),
        ...changedHexagramInfo
    };
    const mainPalace = findPalace(mainHexagram.name);
    const mainShiYing = getShiYing(mainHexagram.name, mainPalace.name);
    const mainYaosInfo = getNaJiaAndLiuQin(mainHexagram, mainPalace);
    const changedPalace = findPalace(changedHexagram.name);
    const changedYaosInfo = getNaJiaAndLiuQin(changedHexagram, changedPalace);
    const dayGan = ganzhi.day.substring(0, 1);
    const animals = getSixAnimals(dayGan);
    const voids = getVoidBranches(ganzhi.day);
    return {
        mainHexagram,
        changedHexagram,
        rawYaos,
        palace: mainPalace,
        shiYing: mainShiYing,
        yaosInfo: mainYaosInfo,
        changedPalace,
        changedYaosInfo,
        animals,
        voids
    };
}

function createYaoSymbol(yao, isMain) {
    let type = '';
    let isMoving = false;
    if (isMain) {
        isMoving = (yao === 6 || yao === 9);
        type = (yao === 6 || yao === 8) ? 'yin' : 'yang';
    } else {
        const isYang = (yao === 7 || yao === 9);
        type = isYang ? 'yang' : 'yin';
    }
    let classes = `yao-line ${type}`;
    let movingIndicator = '';
    if (isMoving) {
        movingIndicator = `<div class="moving-indicator">${yao === 6 ? '×' : '●'}</div>`;
    }
    return `<div class="${classes}">${movingIndicator}</div>`;
}

function renderYaoLine(animal, mainYao, mainYaoInfo, changedYaoInfo, shiYing, index) {
    const isShi = shiYing.shi === (6 - index);
    const isYing = shiYing.ying === (6 - index);
    let mainYaoText = `${mainYaoInfo.liuqin}${mainYaoInfo.dizhi}${mainYaoInfo.wuxing}`;
    if (isShi) mainYaoText += '<span class="shi-ying"> 世</span>';
    if (isYing) mainYaoText += '<span class="shi-ying"> 应</span>';
    let changedYaoText = `${changedYaoInfo.liuqin}${changedYaoInfo.dizhi}${changedYaoInfo.wuxing}`;
    if (isShi) changedYaoText += '<span class="shi-ying"> 世</span>';
    if (isYing) changedYaoText += '<span class="shi-ying"> 应</span>';
    return `
        <div class="paipan-row">
            <div class="animal">${animal}</div>
            <div class="yao-symbol main-yao">${createYaoSymbol(mainYao, true)}</div>
            <div class="yao-info main-info">${mainYaoText}</div>
            <div class="yao-symbol changed-yao">${createYaoSymbol(mainYao, false)}</div>
            <div class="yao-info changed-info">${changedYaoText}</div>
        </div>
    `;
}

function renderHexagrams(data, lunar) {
    const { mainHexagram, changedHexagram, rawYaos, palace, shiYing, yaosInfo, changedPalace, changedYaosInfo, animals, voids } = data;
    const outputText = document.getElementById('outputText');
    outputText.style.display = 'block';
    const date = new Date();
    const 公历 = `公历时间：${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分`;
    const 农历 = `农历时间：${lunar.getYearInChinese()}年 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}日 ${lunar.getTimeZhi()}时`;
    const 干支 = `干支：${lunar.getYearInGanZhi()}年 ${lunar.getMonthInGanZhi()}月 ${lunar.getDayInGanZhi()}日 ${lunar.getTimeInGanZhi()}时`;
    const 主变卦 = `主变卦：${mainHexagram.name}-${palace.name} ${changedHexagram.name}-${changedPalace.name} [${voids.join('')}:空]`;
    let paipanBody = '';
    for (let i = 5; i >= 0; i--) {
        paipanBody += renderYaoLine(animals[5-i], rawYaos[i], yaosInfo[i], changedYaosInfo[i], shiYing, i);
    }
    outputText.innerHTML = `
        <div class="result-section">
            <h2 class="result-title">排盘结果</h2>
            <div class="paipan-container">
                <div class="paipan-header">
                    <h3>排盘信息</h3>
                    <div>${公历}</div>
                    <div>${农历}</div>
                    <div>${干支}</div>
                    <div>${主变卦}</div>
                </div>
                <div class="paipan-body">
                    ${paipanBody}
                </div>
            </div>
        </div>
        <div class="result-section">
            <h2 class="result-title">AI解答</h2>
            <div class="ai-response"></div>
        </div>
    `;
    return outputText.querySelector('.ai-response');
}

document.addEventListener('DOMContentLoaded', () => {
    // const latest = window.loadLatestHistory('六爻');
    // if (latest) {
    //     document.getElementById('userInput').value = latest.userInput;
    //     document.getElementById('outputText').innerHTML = latest.resultHTML;
    //     document.getElementById('outputText').style.display = 'block';
    // }
});

document.getElementById('submitButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) {
        alert('请输入您的问题');
        return;
    }
    const date = new Date();
    const lunar = Lunar.fromDate(date);
    const ganzhi = {
        year: lunar.getYearInGanZhi(),
        month: lunar.getMonthInGanZhi(),
        day: lunar.getDayInGanZhi(),
        time: lunar.getTimeInGanZhi()
    };
    const ganzhiInfo = `年：${ganzhi.year}，月：${ganzhi.month}，日：${ganzhi.day}，时：${ganzhi.time}`;
    const hexagramData = getHexagrams(ganzhi);
    const prompt = `你是一个六爻大师，根据用户提供的卦象和问题，提供准确的卦象解读和实用建议
任务要求：逻辑清晰，语气得当
1. 解读卦象：分析卦象信息，解读整体趋势和吉凶
2. 关联问题：针对用户问题，结合卦象信息，提供具体分析
3. 提供建议：根据卦象启示，给出切实可行的建议，帮助用户解决实际问题
当前时间：${ganzhiInfo}
主卦: ${hexagramData.mainHexagram.name} (${hexagramData.palace.name}宫)，变卦: ${hexagramData.changedHexagram.name} (${hexagramData.changedPalace.name}宫)
空亡: ${hexagramData.voids.join(' ')}
问题: ${userInput}
请帮我解读并以如下格式回复
此卦象意味着：
你可以：`;
    const aiResponseDiv = renderHexagrams(hexagramData, lunar);
    aiResponseDiv.innerHTML = "";
    try {
        // 确保 marked 库可用
        await ensureMarkedLibrary();

        const aiResponse = await queryAI(prompt);
        let fullResponse = "";
        for await (const content of aiResponse.streamResponse()) {
            fullResponse += content;
            // 使用 markdown 渲染
            aiResponseDiv.innerHTML = renderMarkdown(fullResponse);
        }
        window.saveHistory('六爻', userInput, document.getElementById('outputText').innerHTML);
    } catch (error) {
        console.error('请求失败:', error);
        aiResponseDiv.innerHTML = "哈哈，AI开小差了";
    }
});