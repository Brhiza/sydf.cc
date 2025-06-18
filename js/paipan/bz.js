document.addEventListener('DOMContentLoaded', () => {
    // --- Dependency Check ---
    // Explicitly pull dependencies from the global scope and check for their existence.
    // This makes dependencies clear and fails early if they are missing.
    const p = window.p;
    const calendar = window.calendar;

    if (!p || !calendar) {
        console.error('Error: Missing required libraries `paipan.js` or `calendar.js`. Please check the script tags in your HTML.');
        // You could display an error message to the user here as well.
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: red;">错误：缺少必要的命理库文件，请联系管理员。</p>';
            resultDiv.style.display = 'block';
        }
        return; // Stop execution if dependencies are not met
    }

    initializePage({
        chartingFunction: generateAstrolabeForPerson,
        aiPrompts: BAZI_AI_PROMPTS,
        getAIPrompt: (questionText, selectedOption, baziResult1) => {
            const baziData = baziResult1 ? formatBaziForAI(baziResult1, selectedOption) : "无法获取命盘数据。";
            let prompt = `你是一个精通八字命理的AI大师，请基于以下命盘数据回答问题。\n\n---\n\n${baziData}\n\n---\n\n**问题**: ${questionText}\n\n---\n\n**分析要求**:\n1. **深入浅出**: 请使用通俗易懂的语言和生活化的比喻来解释专业的命理概念。分析的最终目的是为了给用户提供清晰的指引，而不是展示术语。\n2. **先定性，后定量**: 先对命格的核心特点（如性格、优势、挑战）进行定性描述，再结合大运流年进行定量的运势分析。\n3. **积极正向**: 所有的分析都应以积极、善意的视角出发。在指出潜在的挑战或风险时，必须同步提供具体的、可操作的规避方法或转化策略，避免宿命论和不必要的焦虑。\n4. **聚焦建议**: 最终的落脚点是提供清晰、可行的建议。无论是事业、感情还是健康，都要给出用户在现实生活中可以参考和实践的指引。`;
            
            // 为“年运分析”添加特定的、更详细的分析要求
            if (selectedOption && selectedOption.dataset.prompt.includes("年运分析")) {
                prompt += `\n\n**特别分析要求（年运分析）**:\n1. **总览先行**: 首先对今年的流年与命盘、大运的整体关系进行一个简要的总评，定下全年运势的基调。\n2. **逐月深入**: 严格按照上面提供的“逐月运势分析参考”列表，逐一分析每个月。\n3. **结合分析**: 每个月的分析都必须结合该月的**干支**与**原命局、大运、流年**产生的生克制化关系来展开。\n4. **具体指引**: 明确指出每个月在事业、财运、感情、健康等方面的**具体机遇和注意事项**。语言要通俗易懂，给出可操作的建议。`;
            }

            return prompt;
        },
        getCompatibilityPrompt: (questionText, baziResult1, baziResult2) => {
            const baziData1 = baziResult1 ? formatBaziForAI(baziResult1) : "无法获取第一人命盘数据。";
            const baziData2 = baziResult2 ? formatBaziForAI(baziResult2) : "无法获取第二人命盘数据。";
            return `你是一个精通八字合婚的AI大师，请基于以下两个命盘数据进行合盘分析。\n\n# 第一人命盘\n${baziData1}\n\n# 第二人命盘\n${baziData2}\n\n---\n\n**问题**: ${questionText}\n\n---\n\n**分析要求**:\n1. **通俗易懂**: 用生活化的语言解释双方的互动模式，避免生涩的专业术语。\n2. **突出重点**: 聚焦于双方性格的吸引点、潜在的矛盾点，以及五行能量的互补性。\n3. **关系导向**: 分析的目的不是给出“合”或“不合”的简单结论，而是深入剖析双方的相处之道。\n4. **提供策略**: 必须提供具体的、可操作的建议，用于促进双方关系的和谐发展，以及如何化解潜在的矛盾。`;
        }
    });
});

// --- AI Prompt Configuration ---
    const BAZI_AI_PROMPTS = {
        single: [
            {
                id: 'ai-mingge-zonglun',
                text: '命格总论',
            prompt: `请对该命盘进行一次全面、深入、详尽的命格总论分析，内容需丰富详实。分析需严格按照以下结构展开：

1.  **命局核心提要**：
    *   **日主与五行**：分析日主的特性以及命局中五行（金木水火土）的分布、力量与平衡状况。
    *   **格局与旺衰**：明确判断八字属于何种格局（如正官格、七杀格、食神格等），并精确判断日主的强弱（旺衰）。
    *   **喜用神与忌神**：基于格局和旺衰，清晰地指出本命局的喜用神和忌神是什么，并简要说明理由。

2.  **性格、能力与天赋**：
    *   **核心性格**：根据日主、十神组合和格局，深入剖析命主最核心的性格特质，包括其思维模式、价值观和行为倾向。
    *   **先天优势**：详细描述命主与生俱来的天赋和才能，例如学习能力、社交手腕、创造力、领导力等，并说明这些优势在哪些领域最能得到发挥。
    *   **潜在挑战**：客观指出命主性格中可能存在的弱点、盲点或潜在的内在冲突，并解释这些挑战可能在生活中如何体现。

3.  **人生主要领域剖析**：
    *   **事业财运**：分析命主的事业发展方向、适合的行业领域、财富能量等级以及获取财富的主要方式。
    *   **感情婚姻**：解读命主的感情观、择偶偏好、婚姻生活的特点以及与伴侣的互动模式。
    *   **健康状况**：根据五行平衡，提示命主需要先天关注的身体部位和易发健康问题。

4.  **人生大运总览与核心建议**：
    *   **大运趋势**：简要概括未来几步大运（每步大运为十年）的整体走势起伏，点明人生的几个关键转折期。
    *   **核心指导与人生课题**：综合以上所有分析，为命主提炼出最核心、最重要的人生发展建议。明确指出TA此生的主要人生课题是什么，并提供具体的、可操作的策略来帮助TA扬长避短、趋吉避凶，更好地实现人生价值。`
        },
        { id: 'ai-current-luck', text: '当前大运', prompt: '请详细分析命主当前所处的这步大运。说明这步大运的干支对原局的作用（合、冲、刑、害），并结合十神和星运，解读在此期间事业、财运、感情和健康方面的主要机遇和挑战。最后，提供针对性的行事建议。' },
        { id: 'ai-this-year', text: '今年运势', prompt: '请详细分析命主在今年的流年运势。说明流年干支与命局、大运的相互作用。重点解读事业、财运、感情、健康四个方面的具体情况，并指出需要特别注意的月份和关键的转折点。' },
        {
            id: 'ai-year-analysis',
            text: '年运分析',
            prompt: `请为我进行一次全面而深入的流年运势分析。你需要扮演一位既精通传统命理，又善于现代生活指导的八字专家。

分析报告必须严格遵循以下结构，确保逻辑清晰、内容详实、指导性强：

**第一部分：流年总论——定调全年**

1.  **核心关系解读**：首先，请明确指出今年的流年天干和地支，分别与我的原命局四柱、以及当前大运的天干地支产生了哪些核心的生克制化关系（如天合地合、天克地冲、三会、三合、刑冲破害等）。
2.  **年度基调判断**：基于上述关系，请用一两句精炼的话，为我今年的整体运势定下一个总基调。例如：“机遇与挑战并存，事业有突破，但需防口舌是非”，或“平稳发展之年，宜静守内敛，不宜冒进”等。
3.  **年度关键词**：请为我提炼3-5个今年的年度运势关键词，如“变革”、“合作”、“学习”、“健康”、“家庭”等。

**第二部分：四大领域深度剖析**

请分别从以下四个核心领域，详细分析我今年的具体运势：

1.  **事业学业**：
    *   **机遇**：今年在工作或学习上可能出现哪些新的机会、突破点或贵人？
    *   **挑战**：可能遇到哪些阻碍、竞争或需要特别注意的陷阱？
    *   **行动指南**：我应该采取什么样的策略来抓住机遇、规避风险？

2.  **财富收入**：
    *   **机遇**：正财和偏财方面有哪些机会？是否适合投资或拓展新的收入来源？
    *   **挑战**：需要注意哪些潜在的破财风险或不必要的开支？
    *   **理财建议**：我今年的理财策略应该是积极进取还是保守稳健？

3.  **感情婚恋**：
    *   **机遇**：单身者是否有正缘桃花机会？有伴侣者关系能否升温？
    *   **挑战**：感情上可能出现哪些矛盾、烂桃花或外部干扰？
    *   **相处之道**：我应该如何与伴侣沟通或提升个人魅力来促进感情和谐？

4.  **健康状况**：
    *   **机遇**：今年是否适合养生、健身或改善不良生活习惯？
    *   **挑战**：需要特别关注哪些身体部位的健康问题？（需结合五行分析）
    *   **养生贴士**：请提供一些简单易行的年度健康保养建议。

**第三部分：逐月运势详批——把握节奏**

请严格按照命盘信息中的“逐月运势分析参考”列表，从正月到腊月，逐一分析每个月的运势。每个月的分析需包含：

1.  **运势简评**：用一句话概括当月运势的吉凶与主要特点。
2.  **重点关注**：指出当月在事业、财运、感情、健康中，哪个领域的变化最为突出。
3.  **行动锦囊**：给出一句当月最核心的行动建议或提醒。

请确保你的语言风格既专业又通俗易懂，充满善意和智慧，避免使用恐吓性或宿命论的断语，最终目的是赋能于我，让我更好地规划和度过这一年。`
        },
        { id: 'ai-career', text: '事业财运', prompt: '请根据以下八字信息，从【整体命格】和【当前大运】两个角度，详细分析我的事业和财运状况。在整体命格方面，请分析我的事业发展方向、适合的行业领域、财富能量等级以及获取财富的主要方式。在当前大运方面，请分析这十年事业和财运上的主要机遇和挑战，并提供针对性的行事建议。' },
        { id: 'ai-marriage', text: '感情婚姻', prompt: '请根据以下八字信息，从【整体命格】和【当前大运】两个角度，详细分析我的感情和婚姻状况。在整体命格方面，请解读我的感情观、择偶偏好、婚姻生活的特点以及与伴侣的互动模式。在当前大运方面，请分析这十年感情上的主要机遇和挑战，并提供针对性的行事建议。' },
        { id: 'ai-health', text: '健康状况', prompt: '请根据以下八字信息，从【整体命格】和【当前大运】两个角度，详细分析我的健康状况。在整体命格方面，请根据五行平衡，提示我需要先天关注的身体部位和易发健康问题。在当前大运方面，请分析这十年健康上的主要机遇和挑战，并提供针对性的保养建议。' },
        { id: 'ai-next-three-years', text: '未来三年', prompt: '请分析命主在未来三年的流年运势。逐年说明运势的起伏变化，并给出每年在事业、感情、生活等方面的规划建议和注意事项。' },
        { id: 'ai-custom', text: '自定义...', prompt: '' }
    ],
    combined: [
        { id: 'ai-compat-marriage', text: '婚恋匹配', prompt: '请对这两个命盘进行婚恋匹配分析。从五行互补、十神吸引、夫妻宫互动、大运同步性等角度，系统评估双方的缘分深浅和相处模式。总结双方的匹配优势和潜在矛盾，并为促进关系和谐提供具体建议。' },
        { id: 'ai-compat-career', text: '事业合作', prompt: '请对这两个命盘进行事业合作匹配分析。评估双方在性格、资源、行事风格上的互补性。分析合作过程中可能出现的机遇和矛盾点，并对如何建立长期、共赢的合作关系提供策略建议。' },
        { id: 'ai-compat-custom', text: '自定义...', prompt: '' }
    ]
};

function getWuxingClass(char) {
    const wuxingMap = ['shui', 'mu', 'huo', 'tu', 'jin']; // 修正五行顺序以匹配 calendar.js
    const tgIndex = window.calendar.ctg.indexOf(char);
    if (tgIndex !== -1) {
        return `wuxing-${wuxingMap[window.calendar.wxtg[tgIndex]]}`;
    }
    const dzIndex = window.calendar.cdz.indexOf(char);
    if (dzIndex !== -1) {
        return `wuxing-${wuxingMap[window.calendar.wxdz[dzIndex]]}`;
    }
    return '';
}

function colorizeGanZhi(ganzhi) {
    if (!ganzhi || ganzhi.length === 0) return '';
    return ganzhi.split('').map(char => `<span class="${getWuxingClass(char)}">${char}</span>`).join('');
}

function formatBaziForAI(baziResult, selectedOption = null) {
    if (!baziResult) {
        return "无法获取八字数据。";
    }

    let result = `### 基本信息\n`;
    result += `* **性别**: ${baziResult.xb}\n`;
    result += `* **公历**: ${baziResult.gl.join('-')}\n`;
    result += `* **农历**: ${baziResult.nl[0]}年 ${baziResult.nl[4].ym}${baziResult.nl[2]}日\n`;
    result += `* **日主**: ${baziResult.ctg[2]} (${window.calendar.cyy[baziResult.yytg[2]]} ${window.calendar.wuxing[baziResult.ewxtg[2]]})\n\n`;

    result += `### 八字四柱\n`;
    const pillars = ['年柱', '月柱', '日柱', '时柱'];
    for (let i = 0; i < 4; i++) {
        const tenGodGan = window.calendar.ssq[window.calendar.dgs[baziResult.tg[i]][baziResult.tg[2]]];
        const hiddenStems = baziResult.bctg.slice(i * 3, i * 3 + 3).filter(s => s).join(',');
        const hiddenGods = baziResult.bzcg.slice(i * 3, i * 3 + 3).filter(s => s).join(',');
        result += `* **${pillars[i]}**: ${baziResult.sz[i]} (${tenGodGan}) | 藏干: ${hiddenStems} (${hiddenGods})\n`;
    }
    result += `\n`;

    result += `### 命盘结构\n`;
    result += `* **四柱纳音**: ${baziResult.naYin.join(', ')}\n`;
    result += `* **四柱星运**: ${baziResult.pillarLifeStages.join(', ')}\n`;
    result += `* **空亡**: 年柱(${baziResult.kongWang.year.join('')}), 日柱(${baziResult.kongWang.day.join('')})\n`;

    const relationships = p.getRelationships(baziResult.sz);
    if (Object.keys(relationships).length > 0) {
        const relMap = {
            tianGanHe: '天干五合', diZhiSanHui: '三会局', diZhiSanHe: '三合局',
            diZhiLiuHe: '六合', diZhiChong: '相冲', diZhiXing: '相刑',
            diZhiHai: '相害', diZhiPo: '相破'
        };
        const relEntries = Object.entries(relationships).map(([key, value]) => {
            const title = relMap[key];
            const details = value.map(item => {
                if (item.gans) return `${item.gans.join('')}合化${item.he}`;
                if (item.zhis) return item.zhis.join('');
                if (item.type && item.members) return `${item.members.join('')}${item.type}`;
                return '';
            }).join(' ');
            return `${title}(${details})`;
        });
        result += `* **干支关系**: ${relEntries.join('; ')}\n`;
    }
    result += `\n`;

    result += `### 五行旺衰\n`;
    result += `* **五行个数**: 水(${baziResult.nwx[0]}), 木(${baziResult.nwx[1]}), 火(${baziResult.nwx[2]}), 土(${baziResult.nwx[3]}), 金(${baziResult.nwx[4]})\n\n`;


    const currentYear = new Date().getFullYear();
    const currentLuckCycle = baziResult.dy.find(yun => currentYear >= yun.syear && currentYear <= yun.eyear);

    if (selectedOption) {
        const optionId = selectedOption.id;

        // 命格总论：显示所有大运
        if (optionId === 'ai-mingge-zonglun') {
            result += `### 大运\n`;
            result += `* **起运**: ${baziResult.qyy_desc}\n`;
            baziResult.dy.forEach(yun => {
                const tenGodGan = calendar.ssq[calendar.dgs[yun.zfman][baziResult.tg[2]]];
                const tenGodZhi = calendar.ssq[calendar.dzs[yun.zfmbn][baziResult.tg[2]]];
                result += `* **${yun.syear} - ${yun.eyear} (${yun.zqage}-${yun.zboz}岁)**: ${yun.zfma}${yun.zfmb} (${tenGodGan}, ${tenGodZhi})\n`;
            });
            result += `\n`;
        }
        // 其他所有情况，都只显示当前大运和相关流年
        else if (currentLuckCycle) {
            result += `### 当前大运\n`;
            const tenGodGan = window.calendar.ssq[window.calendar.dgs[currentLuckCycle.zfman][baziResult.tg[2]]];
            const tenGodZhi = window.calendar.ssq[window.calendar.dzs[currentLuckCycle.zfmbn][baziResult.tg[2]]];
            result += `* **${currentLuckCycle.syear} - ${currentLuckCycle.eyear} (${currentLuckCycle.zqage}-${currentLuckCycle.zboz}岁)**: ${currentLuckCycle.zfma}${currentLuckCycle.zfmb} (${tenGodGan}, ${tenGodZhi})\n\n`;

            const getYearInfo = (year) => {
                const age = year - baziResult.gl[0] + 1;
                let yearGZ = '', tenGodGan = '', tenGodZhi = '';

                if (baziResult.baziYear && baziResult.sz[0]) {
                    const birthYearGZIndex = window.calendar.gz.indexOf(baziResult.sz[0]);
                    if (birthYearGZIndex !== -1) {
                        const yearOffset = year - baziResult.baziYear;
                        const yearGZIndex = (birthYearGZIndex + yearOffset + 60) % 60;
                        yearGZ = window.calendar.gz[yearGZIndex];
                        
                        const yearGan = window.calendar.ctg[yearGZIndex % 10];
                        const yearZhi = window.calendar.cdz[yearGZIndex % 12];
                        
                        const riGanIndex = baziResult.tg[2];
                        tenGodGan = window.calendar.ssq[window.calendar.dgs[window.calendar.ctg.indexOf(yearGan)][riGanIndex]];
                        tenGodZhi = window.calendar.ssq[window.calendar.dzs[window.calendar.cdz.indexOf(yearZhi)][riGanIndex]];
                    }
                }
                return { age, yearGZ, tenGodGan, tenGodZhi };
            };

            if (optionId === 'ai-this-year' || optionId === 'ai-year-analysis') {
                const { age, yearGZ, tenGodGan, tenGodZhi } = getYearInfo(currentYear);
                result += `### 流年信息\n`;
                result += `* **年份**: ${currentYear}年 (${age}岁)\n`;
                result += `* **干支**: ${yearGZ} (${tenGodGan}, ${tenGodZhi})\n`;

                if (optionId === 'ai-year-analysis') {
                    try {
                        result += getMonthlyFortuneDetails(currentYear, yearGZ);
                    } catch (e) {
                        console.error("生成逐月信息失败:", e);
                        result += "\n生成逐月信息时发生错误，请检查控制台。\n";
                    }
                } else {
                    result += '\n';
                }
            } else if (optionId === 'ai-next-three-years') {
                result += `### 未来三年流年信息\n`;
                for (let i = 0; i < 3; i++) {
                    const yearToFind = currentYear + i;
                    const { age, yearGZ, tenGodGan, tenGodZhi } = getYearInfo(yearToFind);
                    result += `* ${yearToFind}年 (${age}岁): ${yearGZ} (${tenGodGan}, ${tenGodZhi})\n`;
                }
                result += `\n`;
            }
            // 对于"当前大运"、"事业财运"、"感情婚姻"、"健康状况"等问题，
            // 只需提供当前大运信息，让AI根据按钮上详细的data-default-text聚焦分析，无需额外添加流年。
        }
    } else {
        // Fallback for no selected option, show all dayun as default
        result += `### 大运\n`;
        result += `* **起运**: ${baziResult.qyy_desc}\n`;
        baziResult.dy.forEach(yun => {
            const tenGodGan = window.calendar.ssq[window.calendar.dgs[yun.zfman][baziResult.tg[2]]];
            const tenGodZhi = window.calendar.ssq[window.calendar.dzs[yun.zfmbn][baziResult.tg[2]]];
            result += `* **${yun.syear} - ${yun.eyear} (${yun.zqage}-${yun.zboz}岁)**: ${yun.zfma}${yun.zfmb} (${tenGodGan}, ${tenGodZhi})\n`;
        });
        result += `\n`;
    }

    return result;
}


function generateAstrolabeForPerson(personNumber, year, month, day, timeIndex, gender, resultDiv) {
    resultDiv.innerHTML = '';
    resultDiv.style.display = 'none';
    if (personNumber === 1) {
        document.getElementById('aiQuestionContainer').style.display = 'none';
    }

    if (isNaN(year) || isNaN(month) || isNaN(day) || timeIndex === null) {
        resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人：请输入所有必填的出生信息！</p>`;
        resultDiv.style.display = 'block';
        return null;
    }

    if (!gender) {
        resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人：性别都不告诉我？</p>`;
        resultDiv.style.display = 'block';
        return null;
    }

    try {
        const hourMap = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23];
        const hourForPaipan = hourMap[timeIndex];
        const baziResult = p.fatemaps(gender === 'male' ? 0 : 1, year, month, day, hourForPaipan, 0, 0);

        if (!baziResult) {
            throw new Error('排盘库返回了空结果。');
        }

        // Generate HTML for display
        const name = document.getElementById('name').value.trim();
        if (name && personNumber === 1) {
            document.title = `${name}的八字排盘`;
        }

        let htmlResult = `<h3>${personNumber === 1 ? (name ? `${name}的基本信息` : '基本信息') : `第${personNumber}人 - 基本信息`}</h3>`;
        htmlResult += `<p><strong>性别:</strong> ${baziResult.xb} | <strong>公历:</strong> ${baziResult.gl.join('-')} | <strong>农历:</strong> ${baziResult.nl[0]}年 ${baziResult.nl[4].ym}${baziResult.nl[2]}日</p>`;
        htmlResult += `<p><strong>生肖:</strong> ${baziResult.sx} | <strong>星座:</strong> ${baziResult.xz} | <strong>日主:</strong> ${baziResult.ctg[2]} (${window.calendar.cyy[baziResult.yytg[2]]} ${window.calendar.wuxing[baziResult.ewxtg[2]]})</p>`;
        
        htmlResult += `<h3>八字排盘</h3>`;
        htmlResult += `<table class="bazi-table">`;
        htmlResult += `<thead><tr><th></th><th>年柱</th><th>月柱</th><th>日柱</th><th>时柱</th></tr></thead>`;
        htmlResult += `<tbody>`;
        // 十神
        htmlResult += `<tr><th>主星</th>`;
        for (let i = 0; i < 4; i++) { htmlResult += `<td><span class="ten-god">${window.calendar.ssq[window.calendar.dgs[baziResult.tg[i]][baziResult.tg[2]]]}</span></td>`; }
        htmlResult += `</tr>`;
        // 四柱
        htmlResult += `<tr><th>四柱</th>`;
        for (let i = 0; i < 4; i++) {
            const gan = baziResult.sz[i][0];
            const zhi = baziResult.sz[i][1];
            htmlResult += `<td><span class="gan-zhi">${colorizeGanZhi(gan)}<br>${colorizeGanZhi(zhi)}</span></td>`;
        }
        htmlResult += `</tr>`;
        // 藏干
        htmlResult += `<tr><th>藏干</th>`;
        for (let i = 0; i < 4; i++) {
            const hiddenStems = baziResult.bctg.slice(i * 3, i * 3 + 3).filter(s => s);
            htmlResult += `<td><span class="hidden-stems">${hiddenStems.map(s => colorizeGanZhi(s)).join('<br>')}</span></td>`;
        }
        htmlResult += `</tr>`;
        // 藏干十神
        htmlResult += `<tr><th>副星</th>`;
        for (let i = 0; i < 4; i++) { htmlResult += `<td><span class="hidden-gods">${baziResult.bzcg.slice(i * 3, i * 3 + 3).filter(s => s).join('<br>')}</span></td>`; }
        htmlResult += `</tr>`;

        // 十二长生 (from paipan.js)
        if (baziResult.pillarLifeStages) {
           htmlResult += `<tr><th>星运</th>`;
           for (let i = 0; i < 4; i++) {
               htmlResult += `<td><span class="life-stage">${baziResult.pillarLifeStages[i]}</span></td>`;
           }
           htmlResult += `</tr>`;
        }

        // Nayin
        if (baziResult.naYin) {
            htmlResult += `<tr><th>纳音</th>`;
            for (let i = 0; i < 4; i++) {
                htmlResult += `<td><span class="shen-sha">${baziResult.naYin[i]}</span></td>`;
            }
            htmlResult += `</tr>`;
        }

        // Kong Wang
        if (baziResult.kongWang) {
            const kw = baziResult.kongWang;
            htmlResult += `<tr><th>空亡</th>`;
            htmlResult += `<td><span class="shen-sha">${kw.year.join('')}</span></td>`;
            htmlResult += `<td></td>`;
            htmlResult += `<td><span class="shen-sha">${kw.day.join('')}</span></td>`;
            htmlResult += `<td></td>`;
            htmlResult += `</tr>`;
        }

        // 神煞
        const baziArray = baziResult.sz;
        const isMan = baziResult.xb === '男';

        htmlResult += `<tr><th>神煞</th>`;
        for (let i = 0; i < 4; i++) {
            const shenShaList = p.queryShenSha(baziResult.sz[i], baziArray, isMan, i + 1);
            htmlResult += `<td><span class="shen-sha">${shenShaList.sort((a, b) => b.length - a.length).join('<br>')}</span></td>`;
        }
        htmlResult += `</tr>`;
        htmlResult += `</tbody></table>`;

        htmlResult += `<h3>大运</h3>`;
        htmlResult += `<p><strong>起运：</strong>${baziResult.qyy_desc}</p>`;
        htmlResult += `<table class="bazi-table">`;
        htmlResult += `<thead><tr><th>大运</th><th>岁数</th><th>起止年份</th><th>星运</th></tr></thead>`;
        htmlResult += `<tbody>`;
        baziResult.dy.forEach((yun) => {
            const tenGodGan = window.calendar.ssq[window.calendar.dgs[yun.zfman][baziResult.tg[2]]];
            const tenGodZhi = window.calendar.ssq[window.calendar.dzs[yun.zfmbn][baziResult.tg[2]]];
            htmlResult += `<tr class="luck-cycle">`;
            htmlResult += `<td><span class="luck-info">${colorizeGanZhi(yun.zfma)} <small class="luck-ten-god">${tenGodGan}</small><br>${colorizeGanZhi(yun.zfmb)} <small class="luck-ten-god">${tenGodZhi}</small></span></td>`;
            htmlResult += `<td>${yun.zqage}岁</td>`;
            htmlResult += `<td>${yun.syear}-${yun.eyear}</td>`;
            htmlResult += `<td><span class="luck-life-stage">${yun.nzsc}</span></td>`;
            htmlResult += `</tr>`;
        });
        htmlResult += `</tbody></table>`;

        resultDiv.innerHTML = htmlResult;
        resultDiv.style.display = 'block';

        if (personNumber === 1) {
            document.getElementById('aiQuestionContainer').style.display = 'block';
        }

        return baziResult; // Return the full object
    } catch (error) {
        console.error(`第${personNumber}人排盘错误:`, error);
        resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人排盘失败，请检查输入或查看控制台错误信息。</p><p>${error.message}</p>`;
        resultDiv.style.display = 'block';
        return null;
    }
}

function getMonthlyFortuneDetails(year, yearGZ = '') {
    const displayGZ = yearGZ ? ` (${yearGZ})` : '';
    let info = `\n### ${year}年${displayGZ} 逐月运势分析参考\n`;
    
    // 1. 获取该年及后一年的节气数据
    const jqDataCurr = window.calendar.GetAdjustedJQ(year, false);
    const jqDataNext = window.calendar.GetAdjustedJQ(year + 1, false);

    // 2. 获取年干用于五虎遁元
    // 我们需要的是节气年，所以用立春来判断
    const liChunJd = jqDataCurr[21];
    const dateForGz = window.calendar.Jtime(liChunJd + 1); // 立春后一天肯定属于该节气年
    const baziForYear = window.p.GetGZ(dateForGz[0], dateForGz[1], dateForGz[2], dateForGz[3], dateForGz[4], dateForGz[5]);
    const yearGanIndex = baziForYear[0][0]; // 年干索引

    // 3. 五虎遁元计算月干的起始
    const tigerMonthGan = [2, 4, 6, 8, 0]; // 丙, 戊, 庚, 壬, 甲
    const monthGanStart = tigerMonthGan[Math.floor(yearGanIndex / 2)];

    // 4. 循环生成每个月的信息
    const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    
    // 节气索引: 立春(21) -> 惊蛰(23) -> ... -> 大寒(20)
    const jqIndices = [21, 23, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    
    for (let i = 0; i < 12; i++) {
        const monthName = lunarMonths[i];
        
        // 计算月干支
        const monthGan = window.calendar.ctg[(monthGanStart + i) % 10];
        const monthZhi = window.calendar.cdz[(i + 2) % 12]; // 寅月(正月)地支索引是2
        const monthGZ = monthGan + monthZhi;

        // 获取节气开始和结束的儒略日
        let startJd, endJd;
        const currentJqIndex = jqIndices[i];

        startJd = jqDataCurr[currentJqIndex];
        
        const nextMonthIndex = (i + 1) % 12;
        const nextJqIndex = jqIndices[nextMonthIndex];

        if (nextJqIndex >= 21) {
             // 如果下个月是立春或惊蛰，那它在下一年的数据里
             if (i === 11) { // 当前是腊月，下一个是正月
                endJd = jqDataNext[nextJqIndex];
             } else {
                endJd = jqDataCurr[nextJqIndex];
             }
        } else {
            endJd = jqDataCurr[nextJqIndex];
        }


        // 转换日期
        const startDate = window.calendar.Jtime(startJd);
        const endDate = window.calendar.Jtime(endJd - 0.00001); // 减去一点点时间，确保是前一天

        info += `* **农历${monthName} ${monthGZ}月** (西历${startDate[1]}.${startDate[2]} - ${endDate[1]}.${endDate[2]})\n`;
    }

    return info + '\n';
}

