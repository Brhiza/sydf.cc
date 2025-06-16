document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const userInput = document.getElementById('userInput');
    const outputText = document.getElementById('outputText');
    const inputCard = document.querySelector('.input-card');

    let tossCount = 0;
    let currentQian = null;
    let historyId = null; // To store the ID of the current history entry

    submitButton.addEventListener('click', () => {
        let question = userInput.value.trim();
        if (!question) {
            question = "心中所想之事";
        }
        inputCard.style.display = 'none';
        if (window.injectInspirationCard && event.isTrusted) {
            const inspirationCard = document.querySelector('.inspiration-card');
            if (inspirationCard) {
                inspirationCard.style.display = 'none';
            }
        }
        startProcess(question);
    });

    function startProcess(question) {
        tossCount = 0;
        currentQian = null;
        historyId = null; // Reset history ID
        if (question === "心中所想之事") {
            outputText.innerHTML = `<div class="result-section"><p>请静心默念，准备摇签...</p></div>`;
        } else {
            outputText.innerHTML = `<div class="result-section"><p>您的问题是：<strong>${question}</strong></p><p>请静心默念，准备摇签...</p></div>`;
        }
        setTimeout(shakeLottle, 2000);
    }

    function shakeLottle() {
        outputText.innerHTML += `<div class="result-section"><p>正在摇签中...</p></div>`;
        // Simulate shaking animation
        setTimeout(() => {
            // Exclude the last "penalty" sign
            currentQian = Math.floor(Math.random() * (QIANWEN_DATA.length - 1)) + 1;
            outputText.innerHTML += `<div class="result-section"><p>求得第 <strong>${currentQian}</strong> 签。</p><p>请投掷圣杯，询问三山国王是否同意此签...</p></div>`;
            addTossButton();
        }, 2000);
    }

    function addTossButton() {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'button-wrapper';
        buttonWrapper.style.marginTop = '20px';

        const tossButton = document.createElement('button');
        tossButton.id = 'tossButton';
        tossButton.textContent = '投掷圣杯';
        
        buttonWrapper.appendChild(tossButton);
        outputText.appendChild(buttonWrapper);

        tossButton.addEventListener('click', tossShengBei);
    }

    function tossShengBei() {
        const button = this;
        button.disabled = true;
        button.textContent = '投掷中...';

        setTimeout(() => {
            // Remove the button's wrapper after the toss animation
            const buttonWrapper = button.parentElement;
            if (buttonWrapper) {
                buttonWrapper.remove();
            }

            const results = ['圣杯', '笑杯', '阴杯'];
            const result = results[Math.floor(Math.random() * results.length)];
            
            let resultText = '';
            if (result === '圣杯') {
                resultText = '<strong>圣杯</strong> - 神明同意此签。';
                outputText.innerHTML += `<div class="result-section"><p>${resultText}</p><p>正在为您解读签文...</p></div>`;
                setTimeout(displayResult, 2000);
            } else {
                tossCount++;
                if (result === '笑杯') {
                    resultText = '<strong>笑杯</strong> - 神明笑而不语，可能问题不明或时机未到。';
                } else {
                    resultText = '<strong>阴杯</strong> - 神明不同意此签。';
                }

                if (tossCount >= 3) {
                    outputText.innerHTML += `<div class="result-section"><p>${resultText}</p><p>您已连续三次未能获得圣杯，看来今日不宜再问此事，请改日再来。</p></div>`;
                } else {
                    outputText.innerHTML += `<div class="result-section"><p>${resultText}</p><p>请重新为您摇签...</p></div>`;
                    setTimeout(shakeLottle, 2000);
                }
            }
        }, 1500);
    }

    function displayResult() {
        const qianData = QIANWEN_DATA.find(q => q.id === currentQian);
        if (!qianData) {
            outputText.innerHTML = '<p>签文数据错误，请稍后再试。</p>';
            return;
        }

        let detailsHTML = '';
        for (const [key, value] of Object.entries(qianData.details)) {
            detailsHTML += `<p><strong>${key}：</strong>${value}</p>`;
        }

        const resultHTML = `
            <div class="result-section">
                <h3 class="result-title">${qianData.title}</h3>
                <p><strong>签文：</strong>${qianData.qianwen}</p>
            </div>
            <div class="result-section">
                <h3 class="result-title">典故</h3>
                <p>${qianData.story}</p>
            </div>
            <div class="result-section">
                <h3 class="result-title">详细解签</h3>
                ${detailsHTML}
            </div>
        `;
        outputText.innerHTML = resultHTML;
        
        const question = userInput.value.trim();
        // Save initial result and get the ID
        historyId = window.saveHistory('三山国王灵签', question, resultHTML, '');

        // Add a button to trigger the AI assistant
        const triggerButtonWrapper = document.createElement('div');
        triggerButtonWrapper.className = 'button-wrapper';
        triggerButtonWrapper.id = 'aiTriggerWrapper';
        triggerButtonWrapper.innerHTML = `<button id="aiTriggerButton">AI 深度解读</button>`;
        outputText.appendChild(triggerButtonWrapper);

        document.getElementById('aiTriggerButton').addEventListener('click', showAIAssistant);
    }

    function showAIAssistant() {
        // Remove the trigger button
        const triggerWrapper = document.getElementById('aiTriggerWrapper');
        if (triggerWrapper) {
            triggerWrapper.remove();
        }

        // Add the full AI assistant UI
        const aiSection = document.createElement('div');
        aiSection.className = 'input-card';
        aiSection.id = 'aiAssistantSection';
        // Margin is now handled by CSS

        aiSection.innerHTML = `
            <h3 class="card-title">AI深度解读</h3>
            <p class="card-description">结合您的问题和签文，让AI为您提供更个性化的分析。</p>
            <input type="text" id="aiQuestionInput" placeholder="可以问AI更具体的问题，如“请结合我的感情问题解读”">
            <div class="button-wrapper">
                <button id="askAIButton">询问AI</button>
            </div>
            <div id="aiResponseOutput" class="ai-response" style="margin-top: 20px;"></div>
        `;
        outputText.insertAdjacentElement('afterend', aiSection);

        document.getElementById('askAIButton').addEventListener('click', askAI);
        
        // Scroll the new section into view
        aiSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function askAI(event) {
        const button = event.target;
        const aiQuestionInput = document.getElementById('aiQuestionInput');
        const aiResponseOutput = document.getElementById('aiResponseOutput');
        const userQuestion = userInput.value.trim();
        const aiQuestion = aiQuestionInput.value.trim() || "请结合我最初的问题，为我详细解读这支签。";
        const qianData = QIANWEN_DATA.find(q => q.id === currentQian);

        const prompt = `
您是一位精通中国传统文化和解签的AI大师。请根据以下信息，为用户提供详细、富有同理心和启发性的解答。

用户最初的问题是：“${userQuestion}”
用户抽到了【三山国王灵签】第 ${currentQian} 签：${qianData.title}
签文是：“${qianData.qianwen}”
签文的典故和基本解释是：“${JSON.stringify(qianData.details)}”

现在，用户追问了一个问题：“${aiQuestion}”

请遵循以下指引进行回答：
1.  **结合问题**：将你的回答与用户最初的问题和追问的问题紧密结合。
2.  **深入解读**：不要仅仅重复签文的字面意思，要深入挖掘其背后的象征意义和智慧。
3.  **提供建议**：在分析的基础上，提供具体、积极、可行的行动建议。
4.  **温暖鼓励**：用温暖、鼓励和富有同理心的语气进行回答，给予用户支持和力量。
5.  **格式清晰**：使用分段和重点标识，让回答易于阅读。
        `;

        aiResponseOutput.innerHTML = '<p>AI大师正在思考中，请稍候...</p>';
        button.disabled = true;
        button.textContent = '思考中...';

        getAIResponse(prompt, (response) => {
            aiResponseOutput.innerHTML = response;
            button.disabled = false;
            button.textContent = '询问AI';

            // Update the history entry with the AI response
            if (historyId) {
                window.updateHistory(historyId, { aiResponse: response });
            }
        });
    }
});