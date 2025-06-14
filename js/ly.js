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


function generateHexagram() {
    // 生成六个爻
    function generateYao() {
        // 三枚铜钱，每枚正面3，反面2
        const coins = Array(3).fill(0).map(() => Math.random() < 0.5 ? 3 : 2);
        const sum = coins.reduce((a, b) => a + b, 0);
        
        // 6=老阴，7=少阳，8=少阴，9=老阳
        return sum;
    }

    const yaos = Array(6).fill(0).map(() => generateYao());
    
    // 计算本卦
    const mainYaos = yaos.map(yao => {
        // 7或8为不变爻，转换为单纯的阴阳
        if (yao === 7) return '阳';
        if (yao === 8) return '阴';
        if (yao === 9) return '阳'; // 老阳
        if (yao === 6) return '阴'; // 老阴
        return '错误';
    });

    // 计算变卦
    const changingYaos = yaos.map(yao => {
        if (yao === 6) return '阳'; // 老阴变阳
        if (yao === 9) return '阴'; // 老阳变阴
        if (yao === 7) return '阳'; // 少阳不变
        if (yao === 8) return '阴'; // 少阴不变
        return '错误';
    });

    // 转换为卦象
    function yaoArrayToHexagram(yaos) {
        const trigramMap = {
            '阳阳阳': '☰',
            '阳阳阴': '☱',
            '阳阴阳': '☲',
            '阳阴阴': '☳',
            '阴阳阳': '☴',
            '阴阳阴': '☵',
            '阴阴阳': '☶',
            '阴阴阴': '☷'
        };

        const upper = yaos.slice(3).join('');
        const lower = yaos.slice(0, 3).join('');

        return trigramMap[upper] + trigramMap[lower];
    }

    const mainSymbol = yaoArrayToHexagram(mainYaos);
    const changingSymbol = yaoArrayToHexagram(changingYaos);

    // 查找对应的卦象信息
    const mainHexagram = hexagrams.find(h => h.symbol === mainSymbol) || 
                       { number: 0, name: "未知", symbol: mainSymbol };
    const changingHexagram = hexagrams.find(h => h.symbol === changingSymbol) || 
                           { number: 0, name: "未知", symbol: changingSymbol };

    return {
        mainHexagram,
        changingHexagram,
        yaos: yaos // 返回原始爻值，用于显示动爻
    };
}

document.getElementById('submitButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    
    const date = new Date();
    const lunar = Lunar.fromDate(date);
    const ganzhiInfo = `年：${lunar.getYearInGanZhi()}，月：${lunar.getMonthInGanZhi()}，日：${lunar.getDayInGanZhi()}，时：${lunar.getTimeInGanZhi()}`;

    const { mainHexagram, changingHexagram, yaos } = generateHexagram();

    function formatHexagramSymbol(symbol) {
        let formattedSymbol = '';
        for (let i = 0; i < symbol.length; i++) {
            formattedSymbol += `<div>${symbol[i]}</div>`;
        }
        return formattedSymbol;
    }

    const prompt = `你是一个六爻大师，根据用户提供的卦象和问题，提供准确的卦象解读和实用建议
任务要求：逻辑清晰，语气得当
1. 解读卦象：分析主卦、变爻及变卦，解读整体趋势和吉凶
2. 关联问题：针对用户问题，结合卦象信息，提供具体分析
3. 提供建议：根据卦象启示，给出切实可行的建议，帮助用户解决实际问题
当前时间：${ganzhiInfo}
主卦: ${mainHexagram.name}，变卦: ${changingHexagram.name}
问题: ${userInput}
请帮我解读并以如下格式回复
此卦象意味着：
你可以：`;

    const outputText = document.getElementById('outputText');
    outputText.style.display = 'block';
    
    const movingYaos = yaos.map((yao, index) => {
        if (yao === 6 || yao === 9) {
            return `第${6-index}爻动 (${yao === 9 ? '老阳' : '老阴'})`;
        }
        return null;
    }).filter(x => x !== null);

    const movingYaoText = movingYaos.length > 0 
        ? `<div class="moving-yaos">动爻：${movingYaos.join('，')}</div>` 
        : '<div class="moving-yaos">无动爻</div>';

    outputText.innerHTML = `
        <div class="hexagram-container">
            <div class="hexagram-item">
                <div class="hexagram">本卦<br/>${mainHexagram.name}</div>
                <div class="hexagram-symbol">${formatHexagramSymbol(mainHexagram.symbol)}</div>
            </div>
            <div class="hexagram-item">
                <div class="hexagram">变卦<br/>${changingHexagram.name}</div>
                <div class="hexagram-symbol">${formatHexagramSymbol(changingHexagram.symbol)}</div>
            </div>
        </div>
        ${movingYaoText}
        <div class="ai-response"></div>
    `;

    const aiResponseDiv = outputText.querySelector('.ai-response');
    aiResponseDiv.innerHTML = "";

    try {
        const aiResponse = await queryAI(prompt);
        for await (const content of aiResponse.streamResponse()) {
            aiResponseDiv.append(document.createTextNode(content));
        }
    } catch (error) {
        console.error('请求失败:', error);
        aiResponseDiv.innerHTML = "哈哈，AI开小差了";
    }
});