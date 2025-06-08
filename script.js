// 在文件顶部或适当位置添加对性别按钮的事件监听
document.addEventListener('DOMContentLoaded', () => {
    const genderMaleButton = document.getElementById('genderMale');
    const genderFemaleButton = document.getElementById('genderFemale');
    let selectedGender = null;

    genderMaleButton.addEventListener('click', () => {
        genderMaleButton.classList.add('selected');
        genderFemaleButton.classList.remove('selected');
        selectedGender = '男';
    });

    genderFemaleButton.addEventListener('click', () => {
        genderFemaleButton.classList.add('selected');
        genderMaleButton.classList.remove('selected');
        selectedGender = '女';
    });

    window.getSelectedGender = () => selectedGender;

    // 第二个人的性别选择
    const genderMaleButton2 = document.getElementById('genderMale2');
    const genderFemaleButton2 = document.getElementById('genderFemale2');
    let selectedGender2 = null;

    if (genderMaleButton2 && genderFemaleButton2) { // 确保元素存在
        genderMaleButton2.addEventListener('click', () => {
            genderMaleButton2.classList.add('selected');
            genderFemaleButton2.classList.remove('selected');
            selectedGender2 = '男';
        });

        genderFemaleButton2.addEventListener('click', () => {
            genderFemaleButton2.classList.add('selected');
            genderMaleButton2.classList.remove('selected');
            selectedGender2 = '女';
        });
    }
    window.getSelectedGender2 = () => selectedGender2;
});

function generateAstrolabeForPerson(personNumber, year, month, day, hour, gender, resultDivId) {
    const resultDiv = document.getElementById(resultDivId);
    resultDiv.innerHTML = ''; // 清空之前的输出
    resultDiv.style.display = 'none'; // 先隐藏，有内容再显示

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour)) {
        resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人：请输入所有必填的出生信息！</p>`;
        resultDiv.style.display = 'block'; // 显示错误信息
        return null;
    }

    if (!gender) {
        resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人：性别都不告诉我？</p>`;
        resultDiv.style.display = 'block'; // 显示错误信息
        return null;
    }

    const solarDate = `${year}-${month}-${day}`;
    let timeIndex;
    if (hour >= 23 || hour < 1) timeIndex = 0; // 子时
    else if (hour >= 1 && hour < 3) timeIndex = 1; // 丑时
    else if (hour >= 3 && hour < 5) timeIndex = 2; // 寅时
    else if (hour >= 5 && hour < 7) timeIndex = 3; // 卯时
    else if (hour >= 7 && hour < 9) timeIndex = 4; // 辰时
    else if (hour >= 9 && hour < 11) timeIndex = 5; // 巳时
    else if (hour >= 11 && hour < 13) timeIndex = 6; // 午时
    else if (hour >= 13 && hour < 15) timeIndex = 7; // 未时
    else if (hour >= 15 && hour < 17) timeIndex = 8; // 申时
    else if (hour >= 17 && hour < 19) timeIndex = 9; // 酉时
    else if (hour >= 19 && hour < 21) timeIndex = 10; // 戌时
    else if (hour >= 21 && hour < 23) timeIndex = 11; // 亥时

    try {
        console.log(`第${personNumber}人排盘参数: 日期=${solarDate}, 时辰索引=${timeIndex}, 性别=${gender}`);
        const astrolabe = iztro.astro.bySolar(solarDate, timeIndex, gender, true, 'zh-CN');
        console.log(`第${personNumber}人完整的 astrolabe 对象:`, astrolabe);

        let htmlResult = '';
        if (personNumber !== 1) {
            htmlResult += `<h3>第${personNumber}人 - 基本信息：</h3>`;
        } else {
            htmlResult += `<h3>基本信息：</h3>`;
        }
        htmlResult += `<p><strong>阳历：</strong>${astrolabe.solarDate}</p>`;
        htmlResult += `<p><strong>农历：</strong>${astrolabe.lunarDate}</p>`;
        htmlResult += `<p><strong>干支：</strong>${astrolabe.chineseDate}</p>`;
        htmlResult += `<p><strong>性别：</strong>${astrolabe.gender}</p>`;
        htmlResult += `<p><strong>时辰：</strong>${astrolabe.time}</p>`;
        htmlResult += `<p><strong>命主：</strong>${astrolabe.soul}</p>`;
        htmlResult += `<p><strong>身主：</strong>${astrolabe.body}</p>`;
        htmlResult += `<p><strong>五行局：</strong>${astrolabe.fiveElementsClass}</p>`;
        htmlResult += `<p><strong>星座：</strong>${astrolabe.sign}</p>`;
        htmlResult += `<p><strong>生肖：</strong>${astrolabe.zodiac}</p>`;

        if (personNumber !== 1) {
            htmlResult += `<h3>第${personNumber}人 - 宫位信息：</h3>`;
        } else {
            htmlResult += `<h3>宫位信息：</h3>`;
        }
        htmlResult += '<ul>';
        astrolabe.palaces.forEach(palace => {
            htmlResult += `<li><strong>${palace.name}宫 (${palace.heavenlyStem}${palace.earthlyBranch}):</strong>`;
            htmlResult += ` 主星: ${palace.majorStars.map(s => s.name).join(', ') || '无'}`;
            htmlResult += `; 副星: ${palace.minorStars.map(s => s.name).join(', ') || '无'}`;
            htmlResult += `; 小星: ${palace.adjectiveStars.map(s => s.name).join(', ') || '无'}`;
            htmlResult += `</li>`;
        });
        htmlResult += '</ul>';

        resultDiv.innerHTML = htmlResult;
        resultDiv.style.display = 'block'; // 有结果了，显示
        return astrolabe;
    } catch (error) {
        console.error(`第${personNumber}人排盘错误:`, error);
        resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人排盘失败，请检查输入或查看控制台错误信息。</p><p>${error.message}</p>`;
        resultDiv.style.display = 'block'; // 显示错误信息
        return null;
    }
}

function generateAstrolabe() {
    // 第一个人的信息
    const year1Element = document.getElementById('year');
    const year1 = year1Element ? parseInt(year1Element.value) : null;
    const month1 = parseInt(document.getElementById('month').value);
    const day1 = parseInt(document.getElementById('day').value);
    const hour1 = parseInt(document.getElementById('hour').value);
    const gender1 = window.getSelectedGender ? window.getSelectedGender() : null;
    const result1Div = document.getElementById('result');

    let allSuccess = true;
    
    if (year1 && month1 && day1 && hour1 && gender1) {
        const result1 = generateAstrolabeForPerson(1, year1, month1, day1, hour1, gender1, 'result');
        if (!result1) {
            allSuccess = false;
        }
    } else {
        result1Div.innerHTML = '<p style="color: red;">请输入第一个人的完整出生信息！</p>';
        result1Div.style.display = 'block';
        allSuccess = false;
    }

    // 检查是否需要为第二个人排盘
    const enableSecondPersonCheckbox = document.getElementById('enableSecondPerson');
    const result2Div = document.getElementById('result2');
    const gender2 = window.getSelectedGender2 ? window.getSelectedGender2() : null;

    // 第二个人的信息处理
    const year2 = parseInt(document.getElementById('year2').value);
    const month2 = parseInt(document.getElementById('month2').value);
    const day2 = parseInt(document.getElementById('day2').value);
    const hour2 = parseInt(document.getElementById('hour2').value);
    
    if (enableSecondPersonCheckbox && enableSecondPersonCheckbox.checked && gender2) {
        if (year2 && month2 && day2 && hour2) {
            const result2 = generateAstrolabeForPerson(2, year2, month2, day2, hour2, gender2, 'result2');
            if (!result2) {
                allSuccess = false;
            }
        } else {
            result2Div.innerHTML = '<p style="color: red;">请输入第二个人的完整出生信息！</p>';
            result2Div.style.display = 'block';
            allSuccess = false;
        }
    } else {
        if(result2Div) {
            result2Div.innerHTML = '';
            result2Div.style.display = 'none'; // 确保未勾选时第二个结果区隐藏
        }
    }
    if (year1 && month1 && day1 && hour1 && gender1) {
        const result1 = generateAstrolabeForPerson(1, year1, month1, day1, hour1, gender1, 'result');
        if (!result1) {
            allSuccess = false;
        }
    }

    if (enableSecondPersonCheckbox && enableSecondPersonCheckbox.checked && gender2) {
        const result2 = generateAstrolabeForPerson(2, year2, month2, day2, hour2, gender2, 'result2');
        if (!result2) {
            allSuccess = false;
        }
    }

    // 排盘结束后显示相关按钮和 AI 提问按钮
        const unifiedButtons = document.querySelectorAll('.unified-button');
        unifiedButtons.forEach(button => {
            button.classList.remove('hidden');
        });

        const aiButton = document.querySelector('button[onclick="askAI()"]');
        if (aiButton) {
            aiButton.classList.remove('hidden');
        }
        
        // 显示 AI 问题选项
        const aiQuestionOptions = document.getElementById('aiQuestionOptions');
        if (aiQuestionOptions) {
            aiQuestionOptions.style.display = 'flex';
            setDefaultOption();
        }
}
    function setDefaultOption() {
        const defaultButton = document.querySelector('#aiQuestionOptions button:first-child');
        if(defaultButton) {
            defaultButton.click();
        }
    }
    // 排盘结束后显示 AI 提问按钮
    const aiButton = document.querySelector('button[onclick="askAI()"]');
    if (aiButton) {
        // 删除多余的显示 AI 提问按钮代码
        // aiButton.style.display = 'block';
    }
// 删除多余的 } 符号
