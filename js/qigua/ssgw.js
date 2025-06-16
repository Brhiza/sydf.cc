document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const userInput = document.getElementById('userInput');
    const outputText = document.getElementById('outputText');
    const inputCard = document.querySelector('.input-card');

    let tossCount = 0;
    let currentQian = null;
    let historyId = null; // To store the ID of the current history entry
    let isFirstToss = true;

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
        isFirstToss = true;
        if (question === "心中所想之事") {
            outputText.innerHTML = `<div class="result-section"><p>请静心默念，准备摇签...</p></div>`;
        } else {
            outputText.innerHTML = `<div class="result-section"><p>您的问题是：<strong>${question}</strong></p><p>请静心默念，准备摇签...</p></div>`;
        }
        setTimeout(shakeLottle, 2000);
    }

    function shakeLottle() {
        // Clear previous bei images if any
        const beiContainer = outputText.querySelector('.bei-container');
        if (beiContainer) {
            beiContainer.remove();
        }

        // Clean up previous results, but keep the initial question
        const resultSections = outputText.querySelectorAll('.result-section');
        resultSections.forEach((section, index) => {
            if (index > 0) { // Keep the first section (the question)
                section.remove();
            }
        });


        const shakingSection = document.createElement('div');
        shakingSection.className = 'result-section';
        shakingSection.innerHTML = `<p>正在摇签中...</p>`;
        outputText.appendChild(shakingSection);

        // Simulate shaking animation
        setTimeout(() => {
            shakingSection.remove(); // Clean up the "shaking" message
            // Exclude the last "penalty" sign
            currentQian = Math.floor(Math.random() * (QIANWEN_DATA.length - 1)) + 1;
            
            const newQianSection = document.createElement('div');
            newQianSection.className = 'result-section';
            newQianSection.innerHTML = `<p>求得第 <strong>${currentQian}</strong> 签。</p><p>请投掷圣杯，询问三山国王是否同意此签...</p>`;
            outputText.appendChild(newQianSection);

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

        // Create a container for the bei images
        const beiContainer = document.createElement('div');
        beiContainer.className = 'bei-container';
        
        // Find the last result section to append the container after it
        const resultSections = outputText.querySelectorAll('.result-section');
        const lastResultSection = resultSections[resultSections.length - 1];
        if (lastResultSection) {
            lastResultSection.insertAdjacentElement('afterend', beiContainer);
        } else {
            outputText.appendChild(beiContainer);
        }


        const buttonWrapper = button.parentElement;
        if (buttonWrapper) {
            buttonWrapper.remove();
        }

        // Simulate tossing two "bei"
        const bei1_result = Math.random() > 0.5 ? 'ping' : 'tu'; // ping: 正, tu: 反
        const bei2_result = Math.random() > 0.5 ? 'ping' : 'tu';

        const bei1_img = document.createElement('img');
        bei1_img.src = `static/${bei1_result}.png`;
        bei1_img.alt = bei1_result;
        bei1_img.className = 'bei-image';

        const bei2_img = document.createElement('img');
        bei2_img.src = `static/${bei2_result}.png`;
        bei2_img.alt = bei2_result;
        bei2_img.className = 'bei-image';

        beiContainer.appendChild(bei1_img);
        beiContainer.appendChild(bei2_img);

        const animateBei = (imgElement) => {
            const duration = 800 + Math.random() * 200; // 800ms to 1000ms
            const peakHeight = -120 - (Math.random() * 40); // -120px to -160px
            const finalRotation = 720 + (Math.random() - 0.5) * 90; // 675 to 765 degrees

            imgElement.animate([
                { transform: 'translateY(0)', opacity: 0, offset: 0 },
                { transform: `translateY(${peakHeight}px) rotate(${finalRotation / 2}deg)`, opacity: 1, offset: 0.4 },
                { transform: `translateY(0) rotate(${finalRotation}deg)`, opacity: 1, offset: 1 }
            ], {
                duration: duration,
                easing: 'ease-out',
                fill: 'forwards',
                delay: Math.random() * 150 // Stagger the start slightly
            });
        };

        if (isFirstToss) {
            animateBei(bei1_img);
            animateBei(bei2_img);
        } else {
            // If not the first toss, just make them appear without animation
            bei1_img.style.opacity = 1;
            bei2_img.style.opacity = 1;
        }
        isFirstToss = false;

        // Determine result after a delay to allow animation to be seen
        setTimeout(() => {
            let result = '';
            if (bei1_result !== bei2_result) {
                result = '圣杯';
            } else if (bei1_result === 'ping') {
                result = '笑杯';
            } else {
                result = '阴杯';
            }

            let resultText = '';
            const resultSection = document.createElement('div');
            resultSection.className = 'result-section';

            if (result === '圣杯') {
                resultText = '<strong>圣杯</strong> (一平一凸) - 神明同意此签。';
                resultSection.innerHTML = `<p>${resultText}</p><p>正在为您解读签文...</p>`;
                outputText.appendChild(resultSection);
                setTimeout(displayResult, 2000);
                isFirstToss = true; // Reset for the next full cycle
            } else {
                tossCount++;
                if (result === '笑杯') {
                    resultText = '<strong>笑杯</strong> (两平) - 神明笑而不语，可能问题不明或时机未到。';
                } else {
                    resultText = '<strong>阴杯</strong> (两凸) - 神明不同意此签。';
                }

                if (tossCount >= 3) {
                    resultSection.innerHTML = `<p>${resultText}</p><p>您已连续三次未能获得圣杯，看来今日不宜再问此事，请改日再来。</p>`;
                    outputText.appendChild(resultSection);
                    isFirstToss = true; // Reset for the next full cycle
                } else {
                    resultSection.innerHTML = `<p>${resultText}</p><p>请重新为您摇签...</p>`;
                    outputText.appendChild(resultSection);
                    setTimeout(shakeLottle, 2000);
                }
            }
        }, 1300); // Wait for animation to mostly finish
    }

    function displayResult() {
        // Clear everything before showing the final result
        const beiContainer = outputText.querySelector('.bei-container');
        if (beiContainer) {
            beiContainer.remove();
        }
        outputText.innerHTML = ''; // Clear all previous messages

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