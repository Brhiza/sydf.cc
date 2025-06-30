// qimen-engine.js
const palaces = [4, 9, 2, 3, 5, 7, 8, 1, 6];
const spirits = ['值符', '螣蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天'];
const stars = ['天蓬', '天芮', '天冲', '天辅', '天禽', '天心', '天柱', '天任', '天英'];
const doors = ['休', '生', '伤', '杜', '景', '死', '惊', '开'];
const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const sanQiLiuYi = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
const palaceDizhi = {
    1: '子', 2: '丑寅', 3: '卯', 4: '辰巳',
    5: '',
    6: '午', 7: '未申', 8: '酉', 9: '戌亥'
};
const solarTermJu = {
    '冬至': { '阳': 1 }, '小寒': { '阳': 7 }, '大寒': { '阳': 4 },
    '立春': { '阳': 8 }, '雨水': { '阳': 5 }, '惊蛰': { '阳': 2 },
    '春分': { '阳': 3 }, '清明': { '阳': 9 }, '谷雨': { '阳': 6 },
    '立夏': { '阴': 9 }, '小满': { '阴': 8 }, '芒种': { '阴': 7 },
    '夏至': { '阴': 1 }, '小暑': { '阴': 2 }, '大暑': { '阴': 3 },
    '立秋': { '阴': 2 }, '处暑': { '阴': 3 }, '白露': { '阴': 4 },
    '秋分': { '阴': 9 }, '寒露': { '阴': 8 }, '霜降': { '阴': 7 },
    '立冬': { '阴': 6 }, '小雪': { '阴': 5 }, '大雪': { '阴': 4 }
};
const fuShouMap = {
    '甲子': '戊', '甲戌': '己', '甲申': '庚', '甲午': '辛', '甲辰': '壬', '甲寅': '癸'
};
const xunShou = ['甲子', '甲戌', '甲申', '甲午', '甲辰', '甲寅'];

function getXunShou(ganZhi) {
    const ganIndex = tiangan.indexOf(ganZhi[0]);
    const zhiIndex = dizhi.indexOf(ganZhi[1]);
    const xunShouZhiIndex = (zhiIndex - ganIndex + 12) % 12;
    const xunShouZhi = dizhi[xunShouZhiIndex];
    return `甲${xunShouZhi}`;
}

function getKongWang(ganZhi) {
    const ganIndex = tiangan.indexOf(ganZhi[0]);
    const zhiIndex = dizhi.indexOf(ganZhi[1]);
    const xunShouZhiIndex = (zhiIndex - ganIndex + 12) % 12;
    const kongWang1 = dizhi[(xunShouZhiIndex + 10) % 12];
    const kongWang2 = dizhi[(xunShouZhiIndex + 11) % 12];
    return `${kongWang1}${kongWang2}`;
}

function getMaXing(zhi) {
    const zhiName = zhi.toString();
    if (['申', '子', '辰'].includes(zhiName)) return '寅';
    if (['寅', '午', '戌'].includes(zhiName)) return '申';
    if (['亥', '卯', '未'].includes(zhiName)) return '巳';
    if (['巳', '酉', '丑'].includes(zhiName)) return '亥';
    return '';
}

function determineJu(lunar) {
    const prevJieQi = lunar.getPrevJieQi(true);
    const termName = prevJieQi.getName();
    const termInfo = solarTermJu[termName];
    if (!termInfo) {
        throw new Error(`无法找到节气 ${termName} 对应的局数信息。`);
    }
    const dun = Object.keys(termInfo)[0];
    const baseJu = termInfo[dun];
    const dayGanZhi = lunar.getDayInGanZhi();
    const dayZhi = dayGanZhi[1];
    const fuTouZhi = ['子', '午', '卯', '酉'];
    const dayZhiIndex = dizhi.indexOf(dayZhi);
    let yuan;
    if (fuTouZhi.includes(dayZhi)) {
        yuan = '上元';
    } else {
        let fuTouIndex = -1;
        for (let i = 1; i < 6; i++) {
            const prevZhi = dizhi[(dayZhiIndex - i + 12) % 12];
            if (fuTouZhi.includes(prevZhi)) {
                fuTouIndex = dizhi.indexOf(prevZhi);
                break;
            }
        }
        const diff = (dayZhiIndex - fuTouIndex + 12) % 12;
        if (diff <= 4) {
            yuan = '上元';
        } else if (diff <= 9) {
            yuan = '中元';
        } else {
            yuan = '下元';
        }
    }
    let ju;
    if (yuan === '上元') {
        ju = baseJu;
    } else if (yuan === '中元') {
        ju = dun === '阳' ? (baseJu + 5) % 9 || 9 : (baseJu + 3) % 9 || 9;
    } else { // 下元
        ju = dun === '阳' ? (baseJu + 1) % 9 || 9 : (baseJu + 7) % 9 || 9;
    }
    return { dun, ju };
}

function createEarthPlate(ju, dun) {
    const plate = new Array(9).fill(null);
    const sequence = dun === '阳' ? sanQiLiuYi : [...sanQiLiuYi].reverse();
    for (let i = 0; i < 9; i++) {
        let targetPalace;
        if (dun === '阳') {
            targetPalace = (ju + i - 1 + 9) % 9 + 1;
        } else {
            targetPalace = (ju - i - 1 + 18) % 9 + 1;
        }
        const gridIndex = palaces.indexOf(targetPalace);
        if (gridIndex !== -1) {
            plate[gridIndex] = sequence[i];
        }
    }
    return plate;
}

function findZhiFuZhiShi(timeGanZhi, earthPlate) {
    const currentXunShou = getXunShou(timeGanZhi);
    const fuShou = fuShouMap[currentXunShou];
    const fuShouPalaceIndex = earthPlate.indexOf(fuShou);
    if (fuShouPalaceIndex === -1) {
        return { zhiFu: '错误', zhiShi: '错误', fuShouPalace: '未知' };
    }
    const fuShouPalaceNumber = palaces[fuShouPalaceIndex];
    const zhiFu = stars[fuShouPalaceNumber - 1];
    let zhiShiPalaceNumberForDoor = fuShouPalaceNumber;
    if (zhiShiPalaceNumberForDoor === 5) {
        zhiShiPalaceNumberForDoor = 2;
    }
    const doorMap = { 1: '休', 2: '死', 3: '伤', 4: '杜', 6: '开', 7: '惊', 8: '生', 9: '景' };
    const zhiShi = doorMap[zhiShiPalaceNumberForDoor];
    return { zhiFu, zhiShi, fuShouPalace: fuShouPalaceNumber };
}

function rotateArray(arr, count, clockwise = true) {
    const len = arr.length;
    const netCount = count % len;
    if (clockwise) {
        return [...arr.slice(len - netCount), ...arr.slice(0, len - netCount)];
    } else {
        return [...arr.slice(netCount), ...arr.slice(0, netCount)];
    }
}

function createHeavenPlate(earthPlate, zhiFu, timeGanZhi) {
    const timeGan = timeGanZhi[0];
    const currentXunShou = getXunShou(timeGanZhi);
    const fuShou = fuShouMap[currentXunShou];
    const timeGanPalaceIndex = earthPlate.findIndex(gan => gan === timeGan);
    const zhiFuPalaceIndex = earthPlate.findIndex(gan => gan === fuShou);
    const rotation = (timeGanPalaceIndex - zhiFuPalaceIndex + 9) % 9;
    const plate = new Array(9).fill(null);
    for (let i = 0; i < 9; i++) {
        const newIndex = (i + rotation) % 9;
        plate[newIndex] = earthPlate[i];
    }
    return plate;
}

function createSpiritPlate(zhiFu, dun) {
    const plate = new Array(9).fill(null);
    const zhiFuStarIndex = stars.indexOf(zhiFu);
    const zhiFuPalace = palaces[zhiFuStarIndex];
    const startGridIndex = palaces.indexOf(zhiFuPalace);
    const rotatedSpirits = dun === '阳' ? spirits : [spirits[0], ...spirits.slice(1).reverse()];
    for (let i = 0; i < 8; i++) {
        let currentGridIndex;
        if (dun === '阳') {
            currentGridIndex = (startGridIndex + i) % 9;
        } else {
            currentGridIndex = (startGridIndex - i + 9) % 9;
        }
        if (palaces[currentGridIndex] === 5) {
             if (dun === '阳') {
                currentGridIndex = (currentGridIndex + 1) % 9;
            } else {
                currentGridIndex = (currentGridIndex - 1 + 9) % 9;
            }
        }
        if (plate[currentGridIndex] === null) {
            plate[currentGridIndex] = rotatedSpirits[i];
        } else {
            for (let j = 1; j < 9; j++) {
                let nextIndex;
                 if (dun === '阳') {
                    nextIndex = (currentGridIndex + j) % 9;
                } else {
                    nextIndex = (currentGridIndex - j + 9) % 9;
                }
                if (plate[nextIndex] === null && palaces[nextIndex] !== 5) {
                    plate[nextIndex] = rotatedSpirits[i];
                    break;
                }
            }
        }
    }
    const centerIndex = palaces.indexOf(5);
    if (plate[centerIndex] === null) {
        plate[centerIndex] = '值符';
    }
    return plate;
}

function createStarPlate(zhiFu, timeGanZhi, earthPlate) {
    const plate = new Array(9).fill(null);
    const timeGan = timeGanZhi[0];
    const currentXunShou = getXunShou(timeGanZhi);
    const fuShou = fuShouMap[currentXunShou];
    const timeGanPalaceIndex = earthPlate.findIndex(gan => gan === timeGan);
    const zhiFuStarOriginalIndex = stars.indexOf(zhiFu);
    const rotation = (timeGanPalaceIndex - zhiFuStarOriginalIndex + 9) % 9;
    for (let i = 0; i < 9; i++) {
        const newIndex = (i + rotation) % 9;
        plate[newIndex] = stars[i];
    }
    const zhiFuOnHeavenPlateIndex = plate.indexOf(zhiFu);
    const centerIndex = palaces.indexOf(5);
    if (zhiFuOnHeavenPlateIndex !== centerIndex) {
        const tianQinIndex = plate.indexOf('天禽');
        if (tianQinIndex !== -1) {
             [plate[tianQinIndex], plate[zhiFuOnHeavenPlateIndex]] = [plate[zhiFuOnHeavenPlateIndex], plate[tianQinIndex]];
        }
        plate[centerIndex] = '天禽';
    }
    return plate;
}

function createDoorPlate(zhiShi, timeGanZhi, earthPlate) {
    const plate = new Array(9).fill(null);
    const timeGan = timeGanZhi[0];
    const timeGanPalaceIndex = earthPlate.findIndex(gan => gan === timeGan);
    if (timeGanPalaceIndex === -1) return plate;
    const doorMap = { 1: '休', 2: '死', 3: '伤', 4: '杜', 6: '开', 7: '惊', 8: '生', 9: '景' };
    const zhiShiOriginalPalaceNumber = Object.keys(doorMap).find(key => doorMap[key] === zhiShi);
    const zhiShiOriginalGridIndex = palaces.indexOf(parseInt(zhiShiOriginalPalaceNumber));
    const rotation = (timeGanPalaceIndex - zhiShiOriginalGridIndex + 9) % 9;
    const doorSequence = ['休', '生', '伤', '杜', '景', '死', '惊', '开'];
    const doorPalaceMap = [1, 8, 3, 4, 9, 2, 7, 6];
    for (let i = 0; i < 8; i++) {
        const originalDoorPalaceIndex = palaces.indexOf(doorPalaceMap[i]);
        const newGridIndex = (originalDoorPalaceIndex + rotation) % 9;
        plate[newGridIndex] = doorSequence[i];
    }
    return plate;
}

function createQimenChart(date) {
    const lunar = Lunar.fromDate(date);
    const yearGanZhi = lunar.getYearInGanZhi();
    const monthGanZhi = lunar.getMonthInGanZhi();
    const dayGanZhi = lunar.getDayInGanZhi();
    const timeGanZhi = lunar.getTimeInGanZhi();
    const { dun, ju } = determineJu(lunar);
    const earthPlate = createEarthPlate(ju, dun);
    const { zhiFu, zhiShi, fuShouPalace } = findZhiFuZhiShi(timeGanZhi, earthPlate);
    const heavenPlate = createHeavenPlate(earthPlate, zhiFu, timeGanZhi);
    const spiritPlate = createSpiritPlate(zhiFu, dun);
    const starPlate = createStarPlate(zhiFu, timeGanZhi, earthPlate);
    const doorPlate = createDoorPlate(zhiShi, timeGanZhi, earthPlate);
    const kongWang = getKongWang(dayGanZhi);
    const maXing = getMaXing(dayGanZhi[1]);
    const solarDate = lunar.getSolar().toString();
    const lunarDate = lunar.toString();
    const palaceDizhiPlate = palaces.map(p => palaceDizhi[p]);
    return {
        dun,
        ju,
        yearGanZhi,
        monthGanZhi,
        dayGanZhi,
        timeGanZhi,
        earthPlate,
        heavenPlate,
        spiritPlate,
        starPlate,
        doorPlate,
        zhiFu,
        zhiShi,
        fuShouPalace,
        kongWang,
        maXing,
        solarDate,
        lunarDate,
        palaceDizhiPlate
    };
}

// qm-renderer.js
const palaceOrder_renderer = [4, 9, 2, 3, 5, 7, 8, 1, 6];

function getPalaceClass(index) {
    return `palace-${palaceOrder_renderer[index]}`;
}

function renderQimenChart(data) {
    const {
        dun, ju, yearGanZhi, monthGanZhi, dayGanZhi, timeGanZhi,
        earthPlate, heavenPlate, spiritPlate, starPlate, doorPlate,
        zhiFu, zhiShi, fuShouPalace, kongWang, maXing,
        solarDate, lunarDate, palaceDizhiPlate
    } = data;
    const outputText = document.getElementById('outputText');
    outputText.style.display = 'block';
    const info = `
        <div class="chart-info-grid">
            <div class="info-item full-width"><strong>公历:</strong> ${solarDate}</div>
            <div class="info-item full-width"><strong>农历:</strong> ${lunarDate}</div>
            <div class="info-item"><strong>四柱:</strong> ${yearGanZhi} ${monthGanZhi} ${dayGanZhi} ${timeGanZhi}</div>
            <div class="info-item"><strong>局势:</strong> ${dun}遁${ju}局</div>
            <div class="info-item"><strong>值符:</strong> ${zhiFu} (落${fuShouPalace}宫)</div>
            <div class="info-item"><strong>值使:</strong> ${zhiShi}</div>
            <div class="info-item"><strong>空亡:</strong> ${kongWang}</div>
            <div class="info-item"><strong>马星:</strong> ${maXing}</div>
        </div>
    `;
    let grid = '';
    for (let i = 0; i < 9; i++) {
        const palaceIndex = palaceOrder_renderer.indexOf(i + 1);
        if (palaceIndex === -1) continue;
        grid += `
            <div class="qimen-palace ${getPalaceClass(i)}">
                <div class="palace-grid">
                    <div class="palace-spirit">${spiritPlate[palaceIndex] || ''}</div>
                    <div class="palace-heaven">${heavenPlate[palaceIndex] || ''}</div>
                    <div class="palace-star">${starPlate[palaceIndex] || ''}</div>
                    <div class="palace-door">${doorPlate[palaceIndex] || ''}</div>
                </div>
                <div class="palace-earth">
                    <div>${earthPlate[palaceIndex] || ''}</div>
                    <div class="palace-dizhi">${palaceDizhiPlate[palaceIndex] || ''}</div>
                </div>
                <div class="palace-number">${i + 1}</div>
            </div>
        `;
    }
    outputText.innerHTML = `
        <div class="result-section">
            <h2 class="result-title">奇门遁甲排盘</h2>
            <div class="qimen-container">
                ${info}
                <div class="qimen-grid">
                    ${grid}
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

// qm.js
document.addEventListener('DOMContentLoaded', () => {
    const latest = window.loadLatestHistory('奇门遁甲');
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
    const chartData = createQimenChart(date);
    const aiResponseDiv = renderQimenChart(chartData);
    aiResponseDiv.innerHTML = "";
    const prompt = `你是一位精通奇门遁甲的大师。请根据以下奇门遁甲排盘信息和用户的问题，提供详细的解读和建议。

**排盘信息:**
- **局势:** ${chartData.dun}遁${chartData.ju}局
- **四柱:** ${chartData.yearGanZhi} ${chartData.monthGanZhi} ${chartData.dayGanZhi} ${chartData.timeGanZhi}
- **值符:** ${chartData.zhiFu} (落${chartData.fuShouPalace}宫)
- **值使:** ${chartData.zhiShi}
- **天盘:** ${chartData.heavenPlate.join(', ')}
- **地盘:** ${chartData.earthPlate.join(', ')}
- **九星:** ${chartData.starPlate.join(', ')}
- **八门:** ${chartData.doorPlate.join(', ')}
- **八神:** ${chartData.spiritPlate.join(', ')}

**用户问题:** ${userInput}

**任务要求:**
1.  **解读盘象:** 结合奇门格局，分析天、地、人、神四层盘面的相互关系，解读整体趋势和吉凶。
2.  **关联问题:** 针对用户的具体问题，找到对应的用神，并结合用神落宫的旺衰、格局、星门神仪等信息，进行深入分析。
3.  **提供建议:** 根据盘象的启示，为用户提供清晰、具体、可行的行动指导。

请以如下格式回复：
**此盘意味着：**
[在此处详细分析整体趋势和特点]

**你可以：**
[在此处给出具体的建议和行动方向]`;
    try {
        // 确保 marked 库可用
        await ensureMarkedLibrary();

        const currentTime = new Date().toLocaleString('zh-CN');
        const promptWithTime = `当前公历时间：${currentTime}\n\n${prompt}`;
        const aiResponse = await queryAI(promptWithTime);
        let fullResponse = "";
        for await (const content of aiResponse.streamResponse()) {
            fullResponse += content;
            // 使用 markdown 渲染（不再移除 * 和 # 符号，让 markdown 处理）
            aiResponseDiv.innerHTML = renderMarkdown(fullResponse);
        }
        window.saveHistory('奇门遁甲', userInput, document.getElementById('outputText').innerHTML);
    } catch (error) {
        console.error('请求失败:', error);
        aiResponseDiv.innerHTML = "哈哈，AI开小差了";
    }
});