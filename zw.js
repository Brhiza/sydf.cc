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

        // 检查是否勾选了合盘
        const isCombined = document.getElementById('enableSecondPerson').checked;
        
        if (!isCombined) {
            // 显示 AI 提问容器
            const aiQuestionContainer = document.getElementById('aiQuestionContainer');
            if (aiQuestionContainer) {
                aiQuestionContainer.style.display = 'block';
                document.getElementById('aiQuestionOptions').style.display = 'flex';
                setDefaultOption();
            }
        } else {
            // 显示合盘分析选项
                const combinedOptions = document.createElement('div');
                combinedOptions.id = 'combinedQuestionOptions';
                combinedOptions.style.display = 'flex';
                combinedOptions.style.flexWrap = 'nowrap';
                combinedOptions.style.overflowX = 'auto';
                combinedOptions.style.gap = '10px';
                combinedOptions.style.padding = '20px 0';
                combinedOptions.style.marginTop = '20px';
                combinedOptions.style.borderTop = '1px solid #eee';
                
                const marriageButton = document.createElement('button');
                marriageButton.className = 'unified-button';
                marriageButton.textContent = '合婚';
                marriageButton.onclick = function() {
                    setAIPrompt('合婚', '请分析两个人命盘合不合，双方是否互补，双方性格怎么样，在一起几率高不高，有利和不利的婚姻因素，需要注意的年份，并给出总结和建议');
                    selectOption(this);
                };
                
                const cooperationButton = document.createElement('button');
                cooperationButton.className = 'unified-button';
                cooperationButton.textContent = '合作';
                cooperationButton.onclick = function() {
                    setAIPrompt('合作', '请分析我们在事业合作方面的匹配度，并给出总结和建议。');
                    selectOption(this);
                };
                
                const customButton = document.createElement('button');
                customButton.className = 'unified-button';
                customButton.textContent = '自定义';
                customButton.onclick = function() {
                    showCustomInput();
                    selectOption(this);
                };
                
                combinedOptions.appendChild(marriageButton);
                combinedOptions.appendChild(cooperationButton);
                combinedOptions.appendChild(customButton);
                result2Div.appendChild(combinedOptions);
                
                // 添加自定义输入框
                const customInputContainer = document.createElement('div');
                customInputContainer.id = 'customCombinedQuestionContainer';
                customInputContainer.style.width = '100%';
                customInputContainer.style.marginTop = '10px';
                
                const customInput = document.createElement('input');
                customInput.type = 'text';
                customInput.id = 'customCombinedQuestion';
                customInput.placeholder = '请输入您的问题';
                
                customInput.style.width = '100%';
customInput.style.display = 'none'; // 初始隐藏自定义输入框
                customInput.style.padding = '12px';
                customInput.style.border = '1px solid #c5cae9';
                customInput.style.borderRadius = '6px';
                customInput.style.boxSizing = 'border-box';
                customInput.style.fontSize = '16px';
                
                
                // 添加自定义选项点击事件
// 为所有非自定义按钮添加点击事件，隐藏自定义输入框
const nonCustomButtons = document.querySelectorAll('#combinedQuestionOptions button:not(:last-child)');
nonCustomButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        customInputContainer.style.display = 'none';
        customInput.style.display = 'none';
    });
});
                const customOption = document.querySelector('#combinedQuestionOptions button:last-child');
                if (customOption) {
                    customOption.addEventListener('click', function() {
                        // 完全参照AI提问的逻辑
                        customInputContainer.style.display = 'block';
                        customInput.style.display = 'block';
                        customInput.focus();
                        // 清除其他选项的选中状态
                        document.querySelectorAll('#combinedQuestionOptions button').forEach(btn => {
                            if (btn !== customOption) {
                                btn.classList.remove('selected');
                            }
                        });
                        // 清空自定义输入框
                        customInput.value = '';
                        console.log('自定义输入框已显示');
                    });
                }
                
                // 默认选择合婚选项
                const defaultOption = document.querySelector('#combinedQuestionOptions button:first-child');
                if (defaultOption) {
                    defaultOption.click();
                    defaultOption.classList.add('selected');
                }
                
                customInputContainer.appendChild(customInput);
                result2Div.appendChild(customInputContainer);
                
                // 添加提问按钮
                const combinedAskButton = document.createElement('button');
                combinedAskButton.className = 'ai-question-button';
                combinedAskButton.textContent = 'AI 合盘分析';
                combinedAskButton.style.marginTop = '10px';
                combinedAskButton.onclick = function() {
                    askAIForCompatibility();
                };
                result2Div.appendChild(combinedAskButton);
                
                // 确保按钮在结果生成后仍然显示
                combinedOptions.style.display = 'flex';
                customInputContainer.style.display = 'block';
                combinedAskButton.style.display = 'block';
                
                // 确保只显示合盘分析按钮
                const aiQuestionContainer = document.getElementById('aiQuestionContainer');
                if (aiQuestionContainer) {
                    aiQuestionContainer.style.display = 'none';
                }
        }
}
    function setDefaultOption() {
        const defaultButton = document.querySelector('#aiQuestionOptions button:first-child');
        if(defaultButton) {
            defaultButton.click();
        }
    }

