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
                const tenGodGan = window.calendar.ssq[window.calendar.dgs[yun.zfman][baziResult.tg[2]]];
                const tenGodZhi = window.calendar.ssq[window.calendar.dzs[yun.zfmbn][baziResult.tg[2]]];
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

        // Store raw bazi data
        if (personNumber === 1) {
            window.baziResult1 = baziResult;
        } else {
            window.baziResult2 = baziResult;
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


document.addEventListener('DOMContentLoaded', () => {
    initializePage({
        chartingFunction: generateAstrolabeForPerson,
        getAIPrompt: (questionText, selectedOption) => {
            const baziData = window.baziResult1 ? formatBaziForAI(window.baziResult1, selectedOption) : "无法获取命盘数据。";
            let prompt = `你是一个精通八字命理的AI大师，请基于以下命盘数据回答问题。\n\n---\n\n${baziData}\n\n---\n\n**问题**: ${questionText}\n\n---\n\n**分析要求**:\n1. **深入浅出**: 请使用通俗易懂的语言和生活化的比喻来解释专业的命理概念。分析的最终目的是为了给用户提供清晰的指引，而不是展示术语。\n2. **先定性，后定量**: 先对命格的核心特点（如性格、优势、挑战）进行定性描述，再结合大运流年进行定量的运势分析。\n3. **积极正向**: 所有的分析都应以积极、善意的视角出发。在指出潜在的挑战或风险时，必须同步提供具体的、可操作的规避方法或转化策略，避免宿命论和不必要的焦虑。\n4. **聚焦建议**: 最终的落脚点是提供清晰、可行的建议。无论是事业、感情还是健康，都要给出用户在现实生活中可以参考和实践的指引。`;
            
            // 为“年运分析”添加特定的、更详细的分析要求
            if (selectedOption && selectedOption.dataset.defaultText && selectedOption.dataset.defaultText.includes("年运分析")) {
                prompt += `\n\n**特别分析要求（年运分析）**:\n1. **总览先行**: 首先对今年的流年与命盘、大运的整体关系进行一个简要的总评，定下全年运势的基调。\n2. **逐月深入**: 严格按照上面提供的“逐月运势分析参考”列表，逐一分析每个月。\n3. **结合分析**: 每个月的分析都必须结合该月的**干支**与**原命局、大运、流年**产生的生克制化关系来展开。\n4. **具体指引**: 明确指出每个月在事业、财运、感情、健康等方面的**具体机遇和注意事项**。语言要通俗易懂，给出可操作的建议。`;
            }

            return prompt;
        },
        getCompatibilityPrompt: (questionText) => {
            const baziData1 = window.baziResult1 ? formatBaziForAI(window.baziResult1) : "无法获取第一人命盘数据。";
            const baziData2 = window.baziResult2 ? formatBaziForAI(window.baziResult2) : "无法获取第二人命盘数据。";
            return `你是一个精通八字合婚的AI大师，请基于以下两个命盘数据进行合盘分析。\n\n# 第一人命盘\n${baziData1}\n\n# 第二人命盘\n${baziData2}\n\n---\n\n**问题**: ${questionText}\n\n---\n\n**分析要求**:\n1. **通俗易懂**: 用生活化的语言解释双方的互动模式，避免生涩的专业术语。\n2. **突出重点**: 聚焦于双方性格的吸引点、潜在的矛盾点，以及五行能量的互补性。\n3. **关系导向**: 分析的目的不是给出“合”或“不合”的简单结论，而是深入剖析双方的相处之道。\n4. **提供策略**: 必须提供具体的、可操作的建议，用于促进双方关系的和谐发展，以及如何化解潜在的矛盾。`;
        }
    });
});