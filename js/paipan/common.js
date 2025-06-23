document.addEventListener('DOMContentLoaded', function() {
    // --- Start of content from ui.js ---

    // 将星盘数据存储在局部变量中，避免污染全局作用域
    let astrolabe1 = null;
    let astrolabe2 = null;

    // 缓存 DOM 元素
    const dom = {
        nameInput: document.getElementById('name'),
        year1: document.getElementById('year'),
        month1: document.getElementById('month'),
        day1: document.getElementById('day'),
        hour1: document.getElementById('hour'),
        genderMale1: document.getElementById('genderMale'),
        genderFemale1: document.getElementById('genderFemale'),
        enableSecondPerson: document.getElementById('enableSecondPerson'),
        secondPersonInputs: document.getElementById('secondPersonInputs'),
        year2: document.getElementById('year2'),
        month2: document.getElementById('month2'),
        day2: document.getElementById('day2'),
        hour2: document.getElementById('hour2'),
        genderMale2: document.getElementById('genderMale2'),
        genderFemale2: document.getElementById('genderFemale2'),
        result1Div: document.getElementById('result'),
        result2Div: document.getElementById('result2'),
        aiQuestionContainer: document.getElementById('aiQuestionContainer'),
        aiQuestionOptions: document.getElementById('aiQuestionOptions'),
        customQuestion: document.getElementById('customQuestion'),
        combinedAnalysisContainer: document.getElementById('combinedAnalysisContainer'),
        combinedQuestionOptions: document.getElementById('combinedQuestionOptions'),
        customCombinedQuestion: document.getElementById('customCombinedQuestion'),
        mainContainer: document.querySelector('.container'),
        // 新增交互按钮
        generateButton: document.getElementById('generateAstrolabe'),
        askAIButton: document.getElementById('askAI'),
        askAIForCompatibilityButton: document.getElementById('askAIForCompatibility')
    };

    // 性别选择事件监听 - 只处理视觉状态
    if (dom.genderMale1) {
        dom.genderMale1.addEventListener('click', () => {
            dom.genderMale1.classList.add('selected');
            dom.genderFemale1.classList.remove('selected');
        });
    }
    if (dom.genderFemale1) {
        dom.genderFemale1.addEventListener('click', () => {
            dom.genderFemale1.classList.add('selected');
            dom.genderMale1.classList.remove('selected');
        });
    }
    if (dom.genderMale2) {
        dom.genderMale2.addEventListener('click', () => {
            dom.genderMale2.classList.add('selected');
            dom.genderFemale2.classList.remove('selected');
        });
    }
    if (dom.genderFemale2) {
        dom.genderFemale2.addEventListener('click', () => {
            dom.genderFemale2.classList.add('selected');
            dom.genderMale2.classList.remove('selected');
        });
    }

    function setDefaultOption(type = 'single') {
        const containerId = type === 'combined' ? 'combinedQuestionOptions' : 'aiQuestionOptions';
        const container = document.getElementById(containerId);
        if (container) {
            const defaultButton = container.querySelector('button:first-child');
            if(defaultButton) defaultButton.click();
        }
    }

    function toggleSecondPersonInputs() {
        if (!dom.enableSecondPerson) return;
        const isChecked = dom.enableSecondPerson.checked;
        dom.secondPersonInputs.style.display = isChecked ? 'block' : 'none';
        if (!isChecked) {
            dom.result2Div.innerHTML = '';
            dom.result2Div.style.display = 'none';
            if (dom.combinedAnalysisContainer) dom.combinedAnalysisContainer.style.display = 'none';
        }
    }

    function selectOption(button, type = 'single') {
        const optionsContainer = type === 'combined' ? dom.combinedQuestionOptions : dom.aiQuestionOptions;
        const customInput = type === 'combined' ? dom.customCombinedQuestion : dom.customQuestion;
        
        if (!optionsContainer) return;

        // First, manage the visual selection state of buttons
        optionsContainer.querySelectorAll('.unified-button').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    
        // Now, manage the visibility of the custom input box
        if (button.dataset.prompt === '') { // Custom buttons have an empty prompt
            customInput.style.display = 'block';
            customInput.focus();
        } else {
            customInput.style.display = 'none';
        }
    }
    
    function createInspirationCard(isCombined = false) {
        const template = document.getElementById('inspirationCardTemplate');
        if (!template) return null;

        const cardClone = template.content.cloneNode(true);
        const cardElement = cardClone.querySelector('.inspiration-card');

        if (isCombined) {
            // For combined analysis, remove tabs and all panes except 'ganqing'
            const tabs = cardElement.querySelector('.inspiration-tabs');
            if (tabs) tabs.remove();
            
            const allPanes = cardElement.querySelectorAll('.tab-pane');
            allPanes.forEach(pane => {
                if (pane.id !== 'ganqing') {
                    pane.remove();
                }
            });
        }

        return cardElement;
    }

    function attachInspirationCardListeners(cardElement, type = 'single') {
        const tabs = cardElement.querySelectorAll('.tab-btn');
        const panes = cardElement.querySelectorAll('.tab-pane');
        const questions = cardElement.querySelectorAll('.questions-grid p');
    
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
    
                const targetPaneId = tab.getAttribute('data-tab');
                panes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === targetPaneId) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    
        questions.forEach(question => {
            question.addEventListener('click', () => {
                const questionText = question.textContent;
                // Directly trigger the AI query with the question text
                if (type === 'combined') {
                    askAIForCompatibility(questionText);
                } else {
                    askAI(questionText);
                }
            });
        });
    }
        
        async function handleAIQuery(prompt) {
        // Use the container we created in the HTML
        const aiResponseDiv = document.getElementById('aiResponseOutput');
        if (!aiResponseDiv) {
            console.error("AI response container 'aiResponseOutput' not found.");
            return;
        }
        
        aiResponseDiv.style.display = 'block';
        aiResponseDiv.innerHTML = ''; // Clear previous content
    
        // Scroll to the newly cleared response div
        aiResponseDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
        try {
            const currentTime = new Date().toLocaleString('zh-CN');
            const promptWithTime = `当前公历时间：${currentTime}\n\n${prompt}`;
            const aiResponse = await queryAI(promptWithTime);
            
            let accumulatedContent = '';
            for await (const chunk of aiResponse.streamResponse()) {
                // Clean up excessive newlines before processing
                const cleanedChunk = chunk.replace(/\n{3,}/g, '\n\n');
                accumulatedContent += cleanedChunk;
                // Use marked.parse to convert Markdown to HTML
                aiResponseDiv.innerHTML = marked.parse(accumulatedContent);
            }
        } catch (error) {
            console.error('请求失败:', error);
            aiResponseDiv.innerHTML = "哈哈，AI开小差了";
        }
    }

    let pageConfig = {
        chartingFunction: null,
        getAIPrompt: null,
        getCompatibilityPrompt: null,
        aiPrompts: null, // To hold AI prompt configurations
    };

    window.initializePage = function(config) {
        pageConfig = { ...pageConfig, ...config };
        // Automatically populate buttons on page load if config is available
        if (pageConfig.aiPrompts) {
            populateAIOptions();
        }
    }

    function populateAIOptions() {
        if (!pageConfig.aiPrompts) return;

        const createButtons = (prompts, container) => {
            if (!container) return;
            container.innerHTML = ''; // Clear existing buttons
            if (!prompts) return;
            prompts.forEach(prompt => {
                const button = document.createElement('button');
                button.id = prompt.id;
                button.className = 'unified-button';
                button.textContent = prompt.text;
                button.dataset.prompt = prompt.prompt; // Store full prompt in data attribute
                button.addEventListener('click', () => selectOption(button, container === dom.combinedQuestionOptions ? 'combined' : 'single'));
                container.appendChild(button);
            });
        };

        createButtons(pageConfig.aiPrompts.single, dom.aiQuestionOptions);
        createButtons(pageConfig.aiPrompts.combined, dom.combinedQuestionOptions);
    }

    function generateAstrolabe() {
        const aiResponseDiv = document.getElementById('aiResponse');
        if (aiResponseDiv) {
            aiResponseDiv.innerHTML = '';
            aiResponseDiv.style.display = 'none';
        }

        const year1Val = dom.year1.value;
        const month1Val = dom.month1.value;
        const day1Val = dom.day1.value;
        const hour1Val = dom.hour1.value;
        
        astrolabe1 = null;
        astrolabe2 = null;
        let allSuccess = true;

        const getSelectedGender = (maleBtn, femaleBtn) => {
            if (maleBtn.classList.contains('selected')) return 'male';
            if (femaleBtn.classList.contains('selected')) return 'female';
            return null;
        };

        const gender1 = getSelectedGender(dom.genderMale1, dom.genderFemale1);
        
        if (year1Val && month1Val && day1Val && hour1Val && gender1) {
            const year1 = parseInt(year1Val);
            const month1 = parseInt(month1Val);
            const day1 = parseInt(day1Val);
            const timeIndex1 = parseInt(hour1Val);
            astrolabe1 = pageConfig.chartingFunction(1, year1, month1, day1, timeIndex1, gender1, dom.result1Div);
            if (!astrolabe1) allSuccess = false;
        } else {
            dom.result1Div.innerHTML = '<p style="color: red;">请输入第一个人的完整出生信息！</p>';
            dom.result1Div.style.display = 'block';
            allSuccess = false;
        }

        if (dom.enableSecondPerson && dom.enableSecondPerson.checked) {
            const year2Val = dom.year2.value;
            const month2Val = dom.month2.value;
            const day2Val = dom.day2.value;
            const hour2Val = dom.hour2.value;
            const gender2 = getSelectedGender(dom.genderMale2, dom.genderFemale2);

            if (year2Val && month2Val && day2Val && hour2Val && gender2) {
                const year2 = parseInt(year2Val);
                const month2 = parseInt(month2Val);
                const day2 = parseInt(day2Val);
                const timeIndex2 = parseInt(hour2Val);
                astrolabe2 = pageConfig.chartingFunction(2, year2, month2, day2, timeIndex2, gender2, dom.result2Div);
                if (!astrolabe2) allSuccess = false;
            } else {
                dom.result2Div.innerHTML = '<p style="color: red;">请输入第二个人的完整出生信息！</p>';
                dom.result2Div.style.display = 'block';
                allSuccess = false;
            }
        } else if (dom.result2Div) {
            dom.result2Div.innerHTML = '';
            dom.result2Div.style.display = 'none';
        }

        if (dom.aiQuestionContainer) dom.aiQuestionContainer.style.display = 'none';
        if (dom.combinedAnalysisContainer) dom.combinedAnalysisContainer.style.display = 'none';

        if (allSuccess) {
            // Remove any existing inspiration card first
            const existingCard = document.querySelector('.inspiration-card');
            if (existingCard) {
                existingCard.remove();
            }

            let targetElement;
            const isCombined = dom.enableSecondPerson && dom.enableSecondPerson.checked;

            if (isCombined) {
                dom.combinedAnalysisContainer.style.display = 'block';
                if (dom.combinedQuestionOptions) dom.combinedQuestionOptions.style.display = 'flex';
                setDefaultOption('combined');
                targetElement = dom.combinedAnalysisContainer;
            } else {
                dom.aiQuestionContainer.style.display = 'block';
                if (dom.aiQuestionOptions) dom.aiQuestionOptions.style.display = 'flex';
                setDefaultOption('single');
                targetElement = dom.aiQuestionContainer;
            }

            // Create and inject the inspiration card
            const inspirationCard = createInspirationCard(isCombined);
            if (inspirationCard) {
                targetElement.insertAdjacentElement('afterend', inspirationCard);
                attachInspirationCardListeners(inspirationCard, isCombined ? 'combined' : 'single');
            }

            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        if (allSuccess) {
            updateURLParameters();
        }
    }

    async function executeAIQuery(type, directQuestionText = null) {
        const isCombined = type === 'combined';
        const config = {
            promptFn: isCombined ? pageConfig.getCompatibilityPrompt : pageConfig.getAIPrompt,
            button: isCombined ? dom.askAIForCompatibilityButton : dom.askAIButton,
            optionsContainer: isCombined ? dom.combinedQuestionOptions : dom.aiQuestionOptions,
            customInput: isCombined ? dom.customCombinedQuestion : dom.customQuestion,
            loadingText: isCombined ? 'AI 合盘中...' : 'AI 思考中...',
            defaultText: isCombined ? 'AI 合盘分析' : '向 AI 提问'
        };

        if (!config.promptFn || !config.button || !config.optionsContainer) return;

        let questionText;
        let selectedOption;

        if (directQuestionText) {
            questionText = directQuestionText;
            // When a question is passed directly, it's conceptually a "custom" question.
            // We find the custom button to get its dataset for the prompt builder.
            selectedOption = config.optionsContainer.querySelector('.unified-button[id$="-custom"]');
            if (!selectedOption) {
                alert("自定义问题按钮未找到，无法提交。");
                return;
            }
        } else {
            selectedOption = config.optionsContainer.querySelector('.unified-button.selected');
            if (!selectedOption) {
                alert("请选择一个问题选项。");
                return;
            }
            const isCustom = selectedOption.dataset.prompt === '';
            questionText = isCustom ? config.customInput.value : selectedOption.textContent; // Use textContent for non-custom questions

            if (!questionText) { // Check for empty custom question
                alert("问题不能为空，请输入您的问题。");
                return;
            }
        }

        const prompt = isCombined
            ? config.promptFn(questionText, astrolabe1, astrolabe2)
            : config.promptFn(questionText, selectedOption, astrolabe1, window.horoscopeAnalyzerInstance ? window.horoscopeAnalyzerInstance.state : null);

        config.button.disabled = true;
        config.button.textContent = config.loadingText;
        config.button.classList.add('glowing');
        try {
            await handleAIQuery(prompt);
        } finally {
            config.button.disabled = false;
            config.button.textContent = config.defaultText;
            config.button.classList.remove('glowing');
        }
    }

    function askAI(arg) {
        const directQuestionText = typeof arg === 'string' ? arg : null;
        executeAIQuery('single', directQuestionText);
    }

    function askAIForCompatibility(arg) {
        const directQuestionText = typeof arg === 'string' ? arg : null;
        executeAIQuery('combined', directQuestionText);
    }

    function loadDataFromURL() {
        const params = new URLSearchParams(window.location.search);
        if (!dom.year1 || !params.has('y1')) {
            return;
        }

        const name = params.get('name');
        if (name && dom.nameInput) {
            dom.nameInput.value = name;
        }

        dom.year1.value = params.get('y1');
        dom.month1.value = params.get('m1');
        dom.day1.value = params.get('d1');
        dom.hour1.value = params.get('h1');
        const gender1 = params.get('g1');
        if (gender1 === 'male') {
            dom.genderMale1.click();
        } else if (gender1 === 'female') {
            dom.genderFemale1.click();
        }

        const isCombined = params.get('hp') === 'true';
        if (isCombined && dom.enableSecondPerson) {
            dom.enableSecondPerson.checked = true;
            toggleSecondPersonInputs();
            dom.year2.value = params.get('y2');
            dom.month2.value = params.get('m2');
            dom.day2.value = params.get('d2');
            dom.hour2.value = params.get('h2');
            const gender2 = params.get('g2');
            if (gender2 === 'male') {
                dom.genderMale2.click();
            } else if (gender2 === 'female') {
                dom.genderFemale2.click();
            }
        }

        setTimeout(generateAstrolabe, 100);
    }

    function updateURLParameters() {
        if (!dom.year1 || !dom.year1.value) return; // Don't update URL if no data
        const params = new URLSearchParams();
        const name = dom.nameInput ? dom.nameInput.value.trim() : '';
        if (name) {
            params.set('name', name);
        }
        params.set('y1', dom.year1.value);
        params.set('m1', dom.month1.value);
        params.set('d1', dom.day1.value);
        params.set('h1', dom.hour1.value);
        const gender1 = dom.genderMale1.classList.contains('selected') ? 'male' : 'female';
        params.set('g1', gender1);

        if (dom.enableSecondPerson && dom.enableSecondPerson.checked) {
            params.set('hp', 'true');
            params.set('y2', dom.year2.value);
            params.set('m2', dom.month2.value);
            params.set('d2', dom.day2.value);
            params.set('h2', dom.hour2.value);
            const gender2 = dom.genderMale2.classList.contains('selected') ? 'male' : 'female';
            params.set('g2', gender2);
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        history.pushState({}, '', newUrl);
    }

    // Initial setup from ui.js
    loadDataFromURL();

    // --- Event Listeners ---
    if (dom.generateButton) {
        dom.generateButton.addEventListener('click', generateAstrolabe);
    }
    if (dom.askAIButton) {
        dom.askAIButton.addEventListener('click', askAI);
    }
    if (dom.askAIForCompatibilityButton) {
        dom.askAIForCompatibilityButton.addEventListener('click', askAIForCompatibility);
    }
    if (dom.enableSecondPerson) {
        dom.enableSecondPerson.addEventListener('change', toggleSecondPersonInputs);
    }

    // --- End of content from ui.js ---


    // --- Start of content from main.js ---

    // --- iOS Device Detection ---
    function isIOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    if (isIOS()) {
        document.body.classList.add('ios-device');
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const quickNavContainer = document.querySelector('.quick-nav');
    const mainContent = document.querySelector('.main-content');
    const mobileWelcome = document.querySelector('.mobile-welcome');
    const desktopWelcome = document.querySelector('.desktop-welcome');

    // --- Mobile Menu Toggle ---
    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }

    function handleMenuToggle() {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        }
    }

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', handleMenuToggle);
        overlay.addEventListener('click', closeMenu);
    }

    // --- Active Nav Link Highlight & Close menu on click ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Close menu on link click
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // If it's the current page, just close the menu.
                if (link.classList.contains('active')) {
                    e.preventDefault();
                }
                closeMenu();
            }
        });
    });

    // --- Quick Nav Buttons for Mobile ---
    if (quickNavContainer) {
        navLinks.forEach(link => {
            const btn = document.createElement('button');
            btn.textContent = link.textContent;
            btn.className = 'quick-nav-btn';
            btn.addEventListener('click', () => {
                window.location.href = link.getAttribute('href');
            });
            quickNavContainer.appendChild(btn);
        });
    }

    // --- Initial Page State for Mobile vs Desktop ---
    function setInitialPageState() {
        if (window.innerWidth <= 768) {
            if (currentPage === 'index.html') {
                if(mainContent) mainContent.style.display = 'none';
                if(mobileWelcome) mobileWelcome.style.display = 'flex';
            } else {
                if(mobileWelcome) mobileWelcome.style.display = 'none';
                if(mainContent) mainContent.style.display = 'block';
            }
        } else {
            // Desktop state
            if(mobileWelcome) mobileWelcome.style.display = 'none';
            if(mainContent) mainContent.style.display = 'block';
            if(desktopWelcome) desktopWelcome.style.display = 'block';
        }
    }

    setInitialPageState();
    window.addEventListener('resize', setInitialPageState);

    // --- Set Year in Footer ---
    const yearDesktop = document.getElementById('year-desktop');
    if (yearDesktop) {
        yearDesktop.textContent = new Date().getFullYear();
    }
    
    // --- End of content from main.js ---
});