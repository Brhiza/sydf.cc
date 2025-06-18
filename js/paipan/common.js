document.addEventListener('DOMContentLoaded', function() {
    // --- Start of content from ui.js ---

    // 定义全局变量来存储星盘数据
    window.astrolabe1 = null;
    window.astrolabe2 = null;

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
        mainContainer: document.querySelector('.container')
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

    window.setDefaultOption = function(type = 'single') {
        const containerId = type === 'combined' ? 'combinedQuestionOptions' : 'aiQuestionOptions';
        const container = document.getElementById(containerId);
        if (container) {
            const defaultButton = container.querySelector('button:first-child');
            if(defaultButton) defaultButton.click();
        }
    }

    window.toggleSecondPersonInputs = function() {
        if (!dom.enableSecondPerson) return;
        const isChecked = dom.enableSecondPerson.checked;
        dom.secondPersonInputs.style.display = isChecked ? 'block' : 'none';
        if (!isChecked) {
            dom.result2Div.innerHTML = '';
            dom.result2Div.style.display = 'none';
            dom.combinedAnalysisContainer.style.display = 'none';
        }
    }

    window.selectOption = function(button, type = 'single') {
        const optionsContainer = type === 'combined' ? dom.combinedQuestionOptions : dom.aiQuestionOptions;
        const customInput = type === 'combined' ? dom.customCombinedQuestion : dom.customQuestion;
        
        // First, manage the visual selection state of buttons
        optionsContainer.querySelectorAll('.unified-button').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    
        // Now, manage the visibility of the custom input box
        if (button.textContent.trim() === '自定义...') {
            customInput.style.display = 'block';
            customInput.focus();
        } else {
            customInput.style.display = 'none';
        }
    }
    
        function createInspirationCardHTML(isCombined = false) {
            const tabsHTML = `
                <div class="inspiration-tabs">
                    <button class="tab-btn active" data-tab="ganqing">感情类</button>
                    <button class="tab-btn" data-tab="shiye">事业类</button>
                    <button class="tab-btn" data-tab="caifu">财富类</button>
                    <button class="tab-btn" data-tab="renji">人际关系类</button>
                    <button class="tab-btn" data-tab="rensheng">人生长成类</button>
                </div>`;
        
            const contentHTML = `
                <div class="inspiration-content">
                    <div class="tab-pane active" id="ganqing">
                        <div class="question-group">
                            <h4>情感发展</h4>
                            <div class="questions-grid">
                                <p>我近期的桃花运怎么样？</p><p>我们目前的感情走向如何？</p><p>他/她对我的真实情感是什么？</p><p>我们之间有未来吗？</p><p>如何改善我们目前的关系？</p><p>这段感情对我的影响？</p>
                            </div>
                        </div>
                        <div class="question-group">
                            <h4>正缘婚姻</h4>
                            <div class="questions-grid">
                                <p>我的正缘什么时候出现？</p><p>我的另一半是什么样的人？</p><p>我何时会结婚？</p><p>我适合和现在的对象结婚吗？</p><p>我的婚姻生活会幸福吗？</p><p>如何吸引我的正缘桃花？</p>
                            </div>
                        </div>
                        <div class="question-group">
                            <h4>关系难题</h4>
                            <div class="questions-grid">
                                <p>我们之间出了什么问题？</p><p>如何解决现在的感情危机？</p><p>我们有机会复合吗？</p><p>我应该放弃这段感情吗？</p><p>我和Ta的缘分有多深？</p><p>我的灵魂伴侣有什么特征？</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="shiye">
                        <div class="question-group"><h4>事业发展</h4><div class="questions-grid"><p>我适合现在的工作/行业吗？</p><p>我的事业什么时候能成功？</p><p>我适合跳槽还是继续坚守？</p><p>我事业上的贵人会是谁？</p><p>我未来的事业走向怎么样？</p><p>我什么时候能找到满意的工作？</p></div></div>
                        <div class="question-group"><h4>职场机遇</h4><div class="questions-grid"><p>我今年有机会升职加薪吗？</p><p>如何得到领导的赏识和重用？</p><p>我在公司的发展前景如何？</p><p>如何改善我的职场人际关系？</p><p>如何改善当前的工作状态？</p><p>我最近的职场人际运如何？</p></div></div>
                        <div class="question-group"><h4>创业之路</h4><div class="questions-grid"><p>我适合创业吗？</p><p>我的创业最佳时机是什么时候？</p><p>我该和什么样的人合伙？</p><p>我的创业项目前景如何？</p><p>创业过程中需要注意哪些风险？</p><p>我的创业会成功吗？</p></div></div>
                    </div>
                    <div class="tab-pane" id="caifu">
                        <div class="question-group"><h4>财运趋势</h4><div class="questions-grid"><p>我近期的财运怎么样？</p><p>我这辈子财运的整体趋势？</p><p>我什么时候能发财？</p><p>我适合靠什么方式赚钱？</p><p>如何有效提升我的财运？</p><p>我近期会有意外之财吗？</p></div></div>
                        <div class="question-group"><h4>投资理财</h4><div class="questions-grid"><p>我适合做投资吗？</p><p>我应该选择什么样的投资方向？</p><p>这个投资项目能赚钱吗？</p><p>如何才能守住我的财富？</p><p>我的投资风险大吗？</p><p>如何更好地管理我的财富？</p></div></div>
                        <div class="question-group"><h4>财务状况</h4><div class="questions-grid"><p>我为什么总是存不住钱？</p><p>是什么原因导致我财务紧张？</p><p>我最近会有破财风险吗？</p><p>如何避免不必要的财务损失？</p><p>我需要注意哪些年份的破财？</p><p>我该如何处理我的债务问题？</p></div></div>
                    </div>
                    <div class="tab-pane" id="renji">
                        <div class="question-group"><h4>社交模式</h4><div class="questions-grid"><p>我的人际交往模式有何优缺点？</p><p>如何拓展我的高质量社交圈？</p><p>我目前的人际关系状态如何？</p><p>我会吸引哪些人进入我的生活？</p><p>如何获得他人的信任与支持？</p><p>如何处理与朋友的矛盾？</p></div></div>
                        <div class="question-group"><h4>贵人善缘</h4><div class="questions-grid"><p>什么样的朋友是我的贵人？</p><p>我应该远离什么样的朋友？</p><p>如何结交更多志同道合的朋友？</p><p>我该如何维系重要的友谊？</p><p>我该信任我身边的朋友吗？</p><p>如何获得领导或长辈的赏识？</p></div></div>
                        <div class="question-group"><h4>家庭关系</h4><div class="questions-grid"><p>我和家人的关系怎么样？</p><p>我的家庭对我有什么样的影响？</p><p>如何改善我与家人的关系？</p><p>我该如何处理家庭矛盾？</p><p>我与家人的缘分有多深？</p><p>如何更好地与家人沟通？</p></div></div>
                    </div>
                    <div class="tab-pane" id="rensheng">
                        <div class="question-group"><h4>学业规划</h4><div class="questions-grid"><p>我的学业运势如何？</p><p>我适合考研/考公吗？</p><p>我适合继续深造还是工作？</p><p>如何提升我的学习效率？</p><p>我该选择哪个专业/学校？</p><p>我这次考试能通过吗？</p></div></div>
                        <div class="question-group"><h4>个人成长</h4><div class="questions-grid"><p>我的性格优势和劣势是什么？</p><p>我的人生主要课题是什么？</p><p>如何找到我的人生方向？</p><p>如何克服我性格中的弱点？</p><p>如何有效提升自己的能量状态？</p><p>我的人生转折点在何时？</p></div></div>
                        <div class="question-group"><h4>人生机遇</h4><div class="questions-grid"><p>我未来十年的人生大运怎么样？</p><p>我该如何实现我的人生目标？</p><p>我的人生会有什么重大机遇？</p><p>我应该注意哪些健康问题？</p><p>如何才能活出更精彩的人生？</p><p>未来的人生之路走向如何？</p></div></div>
                    </div>
                </div>`;
        
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<div>${contentHTML}</div>`, 'text/html');
        
            if (isCombined) {
                const allPanes = doc.querySelectorAll('.tab-pane');
                allPanes.forEach(pane => {
                    if (pane.id !== 'ganqing') {
                        pane.remove();
                    }
                });
            }
        
            const finalContent = doc.body.firstChild.innerHTML;
        
            const html = [
                '<div class="inspiration-card">',
                '<h3 class="inspiration-title">问题灵感</h3>',
                isCombined ? '' : tabsHTML,
                finalContent,
                '</div>'
            ].join('');
        
            return html;
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
                        const customInput = type === 'combined' ? dom.customCombinedQuestion : dom.customQuestion;
                        const optionsContainer = type === 'combined' ? dom.combinedQuestionOptions : dom.aiQuestionOptions;
                        
                        // 1. Set the input value
                        customInput.value = questionText;
                        
                        // 2. Find and programmatically select the 'Custom...' button
                        const customButton = Array.from(optionsContainer.querySelectorAll('.unified-button')).find(btn => btn.textContent.trim() === '自定义...');
                        if (customButton) {
                            // This function now correctly handles showing the input field
                            selectOption(customButton, type);
                        }
    
                        // 3. Directly trigger the AI query, which will now read the state from the DOM
                        if (type === 'combined') {
                            askAIForCompatibility();
                        } else {
                            askAI();
                        }
                    });
                });
            }
        
        async function handleAIQuery(prompt) {
        let aiResponseDiv = document.getElementById('aiResponse');
        if (!aiResponseDiv) {
            aiResponseDiv = document.createElement('div');
            aiResponseDiv.id = 'aiResponse';
            aiResponseDiv.className = 'ai-response';
            aiResponseDiv.style.marginTop = '20px';
            aiResponseDiv.style.padding = '15px';
            aiResponseDiv.style.borderRadius = '8px';
            aiResponseDiv.style.backgroundColor = '#f8f9fa';
            aiResponseDiv.style.whiteSpace = 'pre-wrap';
            aiResponseDiv.style.wordWrap = 'break-word';
            aiResponseDiv.style.overflowY = 'auto'; 
            if (dom.mainContainer) {
                dom.mainContainer.appendChild(aiResponseDiv);
            }
        }
        
        aiResponseDiv.style.display = 'block';
        aiResponseDiv.innerHTML = '';
    
        // Scroll to the newly created/cleared response div
        aiResponseDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
        try {
            const currentTime = new Date().toLocaleString('zh-CN');
            const promptWithTime = `当前公历时间：${currentTime}\n\n${prompt}`;
            const aiResponse = await queryAI(promptWithTime);
            for await (const content of aiResponse.streamResponse()) {
                aiResponseDiv.append(document.createTextNode(content));
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
    };

    window.initializePage = function(config) {
        pageConfig = { ...pageConfig, ...config };
    }

    window.generateAstrolabe = function() {
        const aiResponseDiv = document.getElementById('aiResponse');
        if (aiResponseDiv) {
            aiResponseDiv.innerHTML = '';
            aiResponseDiv.style.display = 'none';
        }

        const year1Val = dom.year1.value;
        const month1Val = dom.month1.value;
        const day1Val = dom.day1.value;
        const hour1Val = dom.hour1.value;
        
        window.astrolabe1 = null;
        window.astrolabe2 = null;
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
            window.astrolabe1 = pageConfig.chartingFunction(1, year1, month1, day1, timeIndex1, gender1, dom.result1Div);
            if (!window.astrolabe1) allSuccess = false;
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
                window.astrolabe2 = pageConfig.chartingFunction(2, year2, month2, day2, timeIndex2, gender2, dom.result2Div);
                if (!window.astrolabe2) allSuccess = false;
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
                dom.combinedQuestionOptions.style.display = 'flex';
                setDefaultOption('combined');
                targetElement = dom.combinedAnalysisContainer;
            } else {
                dom.aiQuestionContainer.style.display = 'block';
                dom.aiQuestionOptions.style.display = 'flex';
                setDefaultOption('single');
                targetElement = dom.aiQuestionContainer;
            }

            // Create and inject the inspiration card
            const cardHTML = createInspirationCardHTML(isCombined);
            const cardElement = document.createElement('div');
            cardElement.innerHTML = cardHTML;
            // The actual element is the first child of the div
            const inspirationCard = cardElement.firstChild;
            targetElement.insertAdjacentElement('afterend', inspirationCard);
            attachInspirationCardListeners(inspirationCard, isCombined ? 'combined' : 'single');

            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        if (allSuccess) {
            updateURLParameters();
        }
    }

    window.askAI = async function() {
        if (!pageConfig.getAIPrompt) return;
        const button = dom.aiQuestionContainer.querySelector('.ai-glow-button');
        const selectedOption = dom.aiQuestionOptions.querySelector('.unified-button.selected');

        if (!selectedOption) {
            alert("请选择一个问题选项。");
            return;
        }

        const isCustom = selectedOption.textContent.trim() === '自定义...';
        const questionText = isCustom ? dom.customQuestion.value : selectedOption.dataset.defaultText;

        if (!questionText) {
            alert("问题不能为空，请输入您的问题。");
            return;
        }

        const prompt = pageConfig.getAIPrompt(questionText, selectedOption);
        
        button.classList.add('glowing');
        try {
            await handleAIQuery(prompt);
        } finally {
            button.classList.remove('glowing');
        }
    }

    window.askAIForCompatibility = async function() {
        if (!pageConfig.getCompatibilityPrompt) return;
        const button = dom.combinedAnalysisContainer.querySelector('.ai-glow-button');
        const selectedOption = dom.combinedQuestionOptions.querySelector('.unified-button.selected');

        if (!selectedOption) {
            alert("请选择一个问题选项。");
            return;
        }

        const isCustom = selectedOption.textContent.trim() === '自定义...';
        const questionText = isCustom ? dom.customCombinedQuestion.value : selectedOption.dataset.defaultText;

        if (!questionText) {
            alert("问题不能为空，请输入您的问题。");
            return;
        }
        
        const prompt = pageConfig.getCompatibilityPrompt(questionText);

        button.classList.add('glowing');
        try {
            await handleAIQuery(prompt);
        } finally {
            button.classList.remove('glowing');
        }
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
    if (document.getElementById('aiQuestionOptions')) {
        setDefaultOption('single');
    }
    loadDataFromURL();

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