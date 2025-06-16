
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

    result += `### 五行旺衰\n`;
    result += `* **五行个数**: 水(${baziResult.nwx[0]}), 木(${baziResult.nwx[1]}), 火(${baziResult.nwx[2]}), 土(${baziResult.nwx[3]}), 金(${baziResult.nwx[4]})\n\n`;


    result += `### 大运\n`;
    result += `* **起运**: ${baziResult.qyy_desc}\n`;
    baziResult.dy.forEach(yun => {
        const tenGodGan = window.calendar.ssq[window.calendar.dgs[yun.zfman][baziResult.tg[2]]];
        const tenGodZhi = window.calendar.ssq[window.calendar.dzs[yun.zfmbn][baziResult.tg[2]]];
        result += `* **${yun.syear} - ${yun.eyear} (${yun.zqage}-${yun.zboz}岁)**: ${yun.zfma}${yun.zfmb} (${tenGodGan}, ${tenGodZhi})\n`;
    });
    result += `\n`;

    // Conditionally add Liunian (Flowing Years) info
    if (selectedOption) {
        const questionText = selectedOption.dataset.defaultText || '';
        const currentYear = new Date().getFullYear();
        let relevantYears = [];
        let title = '';

        if (questionText.includes('流年') && !questionText.includes('年运')) { //流年
            relevantYears.push(currentYear);
            title = '### 流年信息\n';
        } else if (questionText.includes('年运')) { // 年运
            relevantYears.push(currentYear);
            title = '### 流年信息\n';
        } else if (questionText.includes('三年')) { // 三年
            relevantYears.push(currentYear, currentYear + 1, currentYear + 2);
            title = '### 流年信息\n';
        } else if (
            questionText.includes('事业财运') ||
            questionText.includes('感情婚姻') ||
            questionText.includes('家庭/人际') ||
            questionText.includes('健康')
        ) {
            // No liunian for these topics
        } else {
            // Default for '综合', '大运', '自定义'
            const currentLuckCycle = baziResult.dy.find(yun => currentYear >= yun.syear && currentYear <= yun.eyear);
            if (currentLuckCycle) {
                result += `### 当前大运流年\n`;
                currentLuckCycle.ly.forEach(liunian => {
                    result += `  - ${liunian.year}年 (${liunian.age}岁): ${liunian.lye}\n`;
                });
                result += `\n`;
            }
        }

        if (relevantYears.length > 0) {
            let liunianResult = '';
            baziResult.dy.forEach(yun => {
                yun.ly.forEach(liunian => {
                    if (relevantYears.includes(liunian.year)) {
                        liunianResult += `  - ${liunian.year}年 (${liunian.age}岁): ${liunian.lye}\n`;
                    }
                });
            });
            if (liunianResult) {
                result += title + liunianResult + '\n';
            }
        }
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

function getLunarCalendarInfoForYear(year) {
    let info = `\n\n${year}年 农历月历参考：\n`;
    const [mc, sjd] = window.calendar.GetZQandSMandLunarMonthCode(year);
    
    for (let i = 0; i < sjd.length - 1; i++) {
        const monthCode = mc[i];
        if (monthCode < 2) continue;

        const monthName = window.calendar.dxy[Math.floor(monthCode - 2) % 12];
        const isLeap = monthCode !== Math.floor(monthCode);
        const startDate = window.calendar.Jtime(sjd[i]);
        const endDate = window.calendar.Jtime(sjd[i+1] - 1);

        const gzYear = window.p.GetGZ(year, 1, 1, 0, 0, 0)[2].ty;
        const monthGZIndex = (gzYear % 5) * 12 + 2 + Math.floor(monthCode - 2);
        const monthGZ = window.calendar.gz[(monthGZIndex + 60) % 60];

        info += `农历${isLeap ? '闰' : ''}${monthName}(${monthGZ}月): 西历${startDate[0]}年${startDate[1]}月${startDate[2]}日 - ${endDate[0]}年${endDate[1]}月${endDate[2]}日\n`;
    }
    return info;
}


document.addEventListener('DOMContentLoaded', () => {
    initializePage({
        chartingFunction: generateAstrolabeForPerson,
        getAIPrompt: (questionText, selectedOption) => {
            const baziData = window.baziResult1 ? formatBaziForAI(window.baziResult1, selectedOption) : "无法获取命盘数据。";
            let prompt = `你是一个精通八字命理的AI大师，现在是${new Date().toLocaleString()}，请基于以下命盘数据回答问题。\n\n---\n\n${baziData}\n\n---\n\n**问题**: ${questionText}\n\n---\n\n**分析要求**:\n1. **结构清晰**: 先总论命格特点、格局、旺衰和喜用神，再分述各阶段运势，最后给出具体建议。\n2. **现代诠释**: 结合当代社会环境，给出可操作的、积极的建议，避免宿命论的消极表述。\n3. **重点突出**: 根据问题，重点分析相关的十神、宫位、大运和流年。`;
            
            if (selectedOption && selectedOption.dataset.defaultText && selectedOption.dataset.defaultText.includes("今年每一个月的运势")) {
                const year = new Date().getFullYear();
                prompt += getLunarCalendarInfoForYear(year);
            }
            return prompt;
        },
        getCompatibilityPrompt: (questionText) => {
            const baziData1 = window.baziResult1 ? formatBaziForAI(window.baziResult1) : "无法获取第一人命盘数据。";
            const baziData2 = window.baziResult2 ? formatBaziForAI(window.baziResult2) : "无法获取第二人命盘数据。";
            return `你是一个精通八字合婚的AI大师，现在是${new Date().toLocaleString()}，请基于以下两个命盘数据进行合盘分析。\n\n# 第一人命盘\n${baziData1}\n\n# 第二人命盘\n${baziData2}\n\n---\n\n**问题**: ${questionText}\n\n---\n\n**分析要求**:\n1. **五行互补**: 分析双方五行是否互补，有何助益或损耗。\n2. **十神关系**: 从双方的十神生克关系，分析性格互动和吸引力。\n3. **婚姻宫**: 重点分析双方日柱（夫妻宫）的干支关系，判断婚姻稳定性。\n4. **大运同步性**: 比较双方大运走势，看是否存在同步的吉运或凶运。\n5. **综合建议**: 总结双方匹配度，提出促进关系和谐发展的具体建议。`;
        }
    });
});