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
    { number: 40, "name": "雷水解", "symbol": "☳☵" },
    { number: 41, "name": "山泽损", "symbol": "☶☱" },
    { number: 42, "name": "风雷益", "symbol": "☴☳" },
    { number: 43, "name": "泽天夬", "symbol": "☱☰" },
    { number: 44, "name": "天风姤", "symbol": "☰☴" },
    { number: 45, "name": "泽地萃", "symbol": "☱☷" },
    { number: 46, "name": "地风升", "symbol": "☷☴" },
    { number: 47, "name": "泽水困", "symbol": "☱☵" },
    { number: 48, "name": "水风井", "symbol": "☵☴" },
    { number: 49, "name": "泽火革", "symbol": "☱☲" },
    { number: 50, "name": "火风鼎", "symbol": "☲☴" },
    { number: 51, "name": "震为雷", "symbol": "☳☳" },
    { number: 52, "name": "艮为山", "symbol": "☶☶" },
    { number: 53, "name": "风山渐", "symbol": "☴☶" },
    { number: 54, "name": "雷泽归妹", "symbol": "☳☱" },
    { number: 55, "name": "雷火丰", "symbol": "☳☲" },
    { number: 56, "name": "火山旅", "symbol": "☲☶" },
    { number: 57, "name": "巽为风", "symbol": "☴☴" },
    { number: 58, "name": "兑为泽", "symbol": "☱☱" },
    { number: 59, "name": "风水涣", "symbol": "☴☵" },
    { number: 60, "name": "水泽节", "symbol": "☵☱" },
    { number: 61, "name": "风泽中孚", "symbol": "☴☱" },
    { number: 62, "name": "雷山小过", "symbol": "☳☶" },
    { number: 63, "name": "水火既济", "symbol": "☵☲" },
    { number: 64, "name": "火水未济", "symbol": "☲☵" }
];
const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

function formatHexagramSymbol(symbol) {
    let formattedSymbol = '';
    for (let i = 0; i < symbol.length; i++) {
        formattedSymbol += `<div>${symbol[i]}</div>`;
    }
    return formattedSymbol;
}

function renderMeihuaHexagrams(data, lunar) {
    const { mainHexagram, interHexagram, changingHexagram } = data;
    const outputText = document.getElementById('outputText');
    outputText.style.display = 'block';

    const date = new Date();
    const 公历 = `公历时间：${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分`;
    const 农历 = `农历时间：${lunar.getYearInChinese()}年 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}日 ${lunar.getTimeZhi()}时`;
    const 干支 = `干支：${lunar.getYearInGanZhi()}年 ${lunar.getMonthInGanZhi()}月 ${lunar.getDayInGanZhi()}日 ${lunar.getTimeInGanZhi()}时`;

    outputText.innerHTML = `
        <div class="result-section">
            <h2 class="result-title">排盘结果</h2>
            <div class="paipan-container">
                <div class="paipan-header">
                    <h3>排盘信息</h3>
                    <div>${公历}</div>
                    <div>${农历}</div>
                    <div>${干支}</div>
                </div>
                <div class="hexagram-container meihua">
                    <div class="hexagram-item meihua">
                        <div class="hexagram">主卦<br/>${mainHexagram.name}</div>
                        <div class="hexagram-symbol">${formatHexagramSymbol(mainHexagram.symbol)}</div>
                    </div>
                    <div class="hexagram-item meihua">
                        <div class="hexagram">互卦<br/>${interHexagram.name}</div>
                        <div class="hexagram-symbol">${formatHexagramSymbol(interHexagram.symbol)}</div>
                    </div>
                    <div class="hexagram-item meihua">
                        <div class="hexagram">变卦<br/>${changingHexagram.name}</div>
                        <div class="hexagram-symbol">${formatHexagramSymbol(changingHexagram.symbol)}</div>
                    </div>
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

const trigrams = {
    1: { name: '乾', symbol: '☰', lines: [1, 1, 1] },
    2: { name: '兑', symbol: '☱', lines: [0, 1, 1] },
    3: { name: '离', symbol: '☲', lines: [1, 0, 1] },
    4: { name: '震', symbol: '☳', lines: [0, 0, 1] },
    5: { name: '巽', symbol: '☴', lines: [1, 1, 0] },
    6: { name: '坎', symbol: '☵', lines: [0, 1, 0] },
    7: { name: '艮', symbol: '☶', lines: [1, 0, 0] },
    8: { name: '坤', symbol: '☷', lines: [0, 0, 0] }
};

function findHexagramByTrigrams(upper, lower) {
    const upperSymbol = trigrams[upper].symbol;
    const lowerSymbol = trigrams[lower].symbol;
    return hexagrams.find(h => h.symbol === `${upperSymbol}${lowerSymbol}`);
}

function generateHexagram() {
    const now = new Date();
    const lunar = Lunar.fromDate(now);

    const yearZhi = lunar.getYearZhi();
    const month = lunar.getMonth();
    const day = lunar.getDay();
    const timeZhi = lunar.getTimeZhi();

    const yearZhiIndex = dizhi.indexOf(yearZhi) + 1;
    const timeZhiIndex = dizhi.indexOf(timeZhi) + 1;

    let upperTrigramIndex = (yearZhiIndex + month + day) % 8;
    if (upperTrigramIndex === 0) upperTrigramIndex = 8;

    let lowerTrigramIndex = (yearZhiIndex + month + day + timeZhiIndex) % 8;
    if (lowerTrigramIndex === 0) lowerTrigramIndex = 8;

    let movingYaoIndex = (yearZhiIndex + month + day + timeZhiIndex) % 6;
    if (movingYaoIndex === 0) movingYaoIndex = 6;

    const mainHexagram = findHexagramByTrigrams(upperTrigramIndex, lowerTrigramIndex);

    const mainLines = [
        ...trigrams[lowerTrigramIndex].lines,
        ...trigrams[upperTrigramIndex].lines
    ];

    // 互卦
    const interLowerLines = mainLines.slice(2, 5);
    const interUpperLines = mainLines.slice(3, 6);
    
    const interLowerTrigram = Object.values(trigrams).find(t => JSON.stringify(t.lines) === JSON.stringify(interLowerLines));
    const interUpperTrigram = Object.values(trigrams).find(t => JSON.stringify(t.lines) === JSON.stringify(interUpperLines));

    const interHexagram = findHexagramByTrigrams(
        Object.keys(trigrams).find(key => trigrams[key] === interUpperTrigram),
        Object.keys(trigrams).find(key => trigrams[key] === interLowerTrigram)
    );

    // 变卦
    const changedLines = [...mainLines];
    changedLines[movingYaoIndex - 1] = 1 - changedLines[movingYaoIndex - 1]; // 阴阳互变

    const changedLowerLines = changedLines.slice(0, 3);
    const changedUpperLines = changedLines.slice(3, 6);

    const changedLowerTrigram = Object.values(trigrams).find(t => JSON.stringify(t.lines) === JSON.stringify(changedLowerLines));
    const changedUpperTrigram = Object.values(trigrams).find(t => JSON.stringify(t.lines) === JSON.stringify(changedUpperLines));
    
    const changingHexagram = findHexagramByTrigrams(
        Object.keys(trigrams).find(key => trigrams[key] === changedUpperTrigram),
        Object.keys(trigrams).find(key => trigrams[key] === changedLowerTrigram)
    );

    return {
        mainHexagram,
        interHexagram,
        changingHexagram,
        movingYao: movingYaoIndex
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const latest = window.loadLatestHistory('梅花易数');
    if (latest) {
        document.getElementById('userInput').value = latest.userInput;
        document.getElementById('outputText').innerHTML = latest.resultHTML;
        document.getElementById('outputText').style.display = 'block';
    }
});

document.getElementById('submitButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) {
        alert('请输入您的问题');
        return;
    }
    
    const date = new Date();
    const lunar = Lunar.fromDate(date);
    const ganzhiInfo = `年：${lunar.getYearInGanZhi()}，月：${lunar.getMonthInGanZhi()}，日：${lunar.getDayInGanZhi()}，时：${lunar.getTimeInGanZhi()}`;

    const hexagramData = generateHexagram();

    const prompt = `你是一个梅花易数大师，根据用户提供的卦象和问题，提供准确的卦象解读和实用建议
任务要求：逻辑清晰，语气得当
1. 解读卦象：解读整体趋势和吉凶
2. 关联问题：针对用户问题，结合卦象信息，提供具体分析
3. 提供建议：根据卦象启示，给出切实可行的建议，帮助用户解决实际问题
当前时间：${ganzhiInfo}\n主卦: ${hexagramData.mainHexagram.name}，互卦: ${hexagramData.interHexagram.name}，变卦: ${hexagramData.changingHexagram.name}\n动爻: ${hexagramData.movingYao}\n问题: ${userInput}\n请帮我解读一下，并以如下格式回复\n此卦象意味着：\n你可以：`;

    const aiResponseDiv = renderMeihuaHexagrams(hexagramData, lunar);
    aiResponseDiv.innerHTML = "";

    try {
        const currentTime = new Date().toLocaleString('zh-CN');
        const promptWithTime = `当前公历时间：${currentTime}\n\n${prompt}`;
        const aiResponse = await queryAI(promptWithTime);
        let fullResponse = "";
        for await (const content of aiResponse.streamResponse()) {
            fullResponse += content;
            aiResponseDiv.append(document.createTextNode(content));
        }
        window.saveHistory('梅花易数', userInput, document.getElementById('outputText').innerHTML);
    } catch (error) {
        console.error('请求失败:', error);
        aiResponseDiv.innerHTML = "哈哈，AI开小差了";
    }
});