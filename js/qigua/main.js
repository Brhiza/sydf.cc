document.addEventListener('DOMContentLoaded', function() {
    // --- HTML TEMPLATES ---
    function createCommonLayoutHTML() {
        const html = [
            '<header class="header">',
                '<div class="header-content">',
                    '<h1 class="title">时月东方</h1>',
                    '<button class="menu-toggle">&#9776;</button>',
                '</div>',
            '</header>',
            '<div class="overlay"></div>',
            '<nav class="sidebar">',
                '<div class="logo">',
                    '<img src="static/avatar.png" alt="时月东方Logo">',
                    '<h1>时月东方</h1>',
                    '<p>一个臭算命的不圈钱，学人来搞AI算命？</p>',
                '</div>',
                '<ul>',
                    '<li><a href="ly.html" class="nav-link">六爻</a></li>',
                    '<li><a href="mh.html" class="nav-link">梅花易数</a></li>',
                    '<li><a href="qm.html" class="nav-link">奇门遁甲</a></li>',
                    '<li><a href="dp.html" class="nav-link">塔罗牌·单牌</a></li>',
                    '<li><a href="sp.html" class="nav-link">塔罗牌·三牌</a></li>',
                    '<li><a href="ssgw.html" class="nav-link">三山国王灵签</a></li>',
                    '<li><a href="history.html" class="nav-link">历史记录</a></li>',
                    '<li><a href="rengong.html" class="nav-link">转人工</a></li>',
                    '<li><a href="about.html" class="nav-link">关于</a></li>',
                '</ul>',
                '<div class="sidebar-footer">',
                    '<p>© <span id="year-desktop"></span> By <a href="about.html" target="_blank">少女的美丽忧伤</a></p>',
                '</div>',
            '</nav>'
        ];
        return html.join('');
    }

    function createInspirationCardHTML() {
        // By building the string from an array, we can keep the code readable
        // while ensuring no extra whitespace is added to the final HTML string.
        const html = [
            '<div class="inspiration-card">',
                '<h3 class="inspiration-title">问题灵感</h3>',
                '<div class="inspiration-tabs">',
                    '<button class="tab-btn active" data-tab="ganqing">感情类</button>',
                    '<button class="tab-btn" data-tab="shiye">事业类</button>',
                    '<button class="tab-btn" data-tab="caifu">财富类</button>',
                    '<button class="tab-btn" data-tab="renji">人际关系类</button>',
                    '<button class="tab-btn" data-tab="rensheng">人生长成类</button>',
                '</div>',
                '<div class="inspiration-content">',
                    '<div class="tab-pane active" id="ganqing">',
                        '<div class="question-group">',
                            '<h4>情感发展</h4>',
                            '<div class="questions-grid">',
                                '<p>我近期的桃花运怎么样？</p><p>我们目前的感情走向如何？</p><p>他/她对我的真实情感是什么？</p><p>我们之间有未来吗？</p><p>如何改善我们目前的关系？</p><p>这段感情对我的影响？</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>正缘婚姻</h4>',
                            '<div class="questions-grid">',
                                '<p>我的正缘什么时候出现？</p><p>我的另一半是什么样的人？</p><p>我何时会结婚？</p><p>我适合和现在的对象结婚吗？</p><p>我的婚姻生活会幸福吗？</p><p>如何吸引我的正缘桃花？</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>关系难题</h4>',
                            '<div class="questions-grid">',
                                '<p>我们之间出了什么问题？</p><p>如何解决现在的感情危机？</p><p>我们有机会复合吗？</p><p>我应该放弃这段感情吗？</p><p>我和Ta的缘分有多深？</p><p>我的灵魂伴侣有什么特征？</p>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="tab-pane" id="shiye">',
                        '<div class="question-group"><h4>事业发展</h4><div class="questions-grid"><p>我适合现在的工作/行业吗？</p><p>我的事业什么时候能成功？</p><p>我适合跳槽还是继续坚守？</p><p>我事业上的贵人会是谁？</p><p>我未来的事业走向怎么样？</p><p>我什么时候能找到满意的工作？</p></div></div>',
                        '<div class="question-group"><h4>职场机遇</h4><div class="questions-grid"><p>我今年有机会升职加薪吗？</p><p>如何得到领导的赏识和重用？</p><p>我在公司的发展前景如何？</p><p>如何改善我的职场人际关系？</p><p>如何改善当前的工作状态？</p><p>我最近的职场人际运如何？</p></div></div>',
                        '<div class="question-group"><h4>创业之路</h4><div class="questions-grid"><p>我适合创业吗？</p><p>我的创业最佳时机是什么时候？</p><p>我该和什么样的人合伙？</p><p>我的创业项目前景如何？</p><p>创业过程中需要注意哪些风险？</p><p>我的创业会成功吗？</p></div></div>',
                    '</div>',
                    '<div class="tab-pane" id="caifu">',
                        '<div class="question-group"><h4>财运趋势</h4><div class="questions-grid"><p>我近期的财运怎么样？</p><p>我这辈子财运的整体趋势？</p><p>我什么时候能发财？</p><p>我适合靠什么方式赚钱？</p><p>如何有效提升我的财运？</p><p>我近期会有意外之财吗？</p></div></div>',
                        '<div class="question-group"><h4>投资理财</h4><div class="questions-grid"><p>我适合做投资吗？</p><p>我应该选择什么样的投资方向？</p><p>这个投资项目能赚钱吗？</p><p>如何才能守住我的财富？</p><p>我的投资风险大吗？</p><p>如何更好地管理我的财富？</p></div></div>',
                        '<div class="question-group"><h4>财务状况</h4><div class="questions-grid"><p>我为什么总是存不住钱？</p><p>是什么原因导致我财务紧张？</p><p>我最近会有破财风险吗？</p><p>如何避免不必要的财务损失？</p><p>我需要注意哪些年份的破财？</p><p>我该如何处理我的债务问题？</p></div></div>',
                    '</div>',
                    '<div class="tab-pane" id="renji">',
                        '<div class="question-group"><h4>社交模式</h4><div class="questions-grid"><p>我的人际交往模式有何优缺点？</p><p>如何拓展我的高质量社交圈？</p><p>我目前的人际关系状态如何？</p><p>我会吸引哪些人进入我的生活？</p><p>如何获得他人的信任与支持？</p><p>如何处理与朋友的矛盾？</p></div></div>',
                        '<div class="question-group"><h4>贵人善缘</h4><div class="questions-grid"><p>什么样的朋友是我的贵人？</p><p>我应该远离什么样的朋友？</p><p>如何结交更多志同道合的朋友？</p><p>我该如何维系重要的友谊？</p><p>我该信任我身边的朋友吗？</p><p>如何获得领导或长辈的赏识？</p></div></div>',
                        '<div class="question-group"><h4>家庭关系</h4><div class="questions-grid"><p>我和家人的关系怎么样？</p><p>我的家庭对我有什么样的影响？</p><p>如何改善我与家人的关系？</p><p>我该如何处理家庭矛盾？</p><p>我与家人的缘分有多深？</p><p>如何更好地与家人沟通？</p></div></div>',
                    '</div>',
                    '<div class="tab-pane" id="rensheng">',
                        '<div class="question-group"><h4>学业规划</h4><div class="questions-grid"><p>我的学业运势如何？</p><p>我适合考研/考公吗？</p><p>我适合继续深造还是工作？</p><p>如何提升我的学习效率？</p><p>我该选择哪个专业/学校？</p><p>我这次考试能通过吗？</p></div></div>',
                        '<div class="question-group"><h4>个人成长</h4><div class="questions-grid"><p>我的性格优势和劣势是什么？</p><p>我的人生主要课题是什么？</p><p>如何找到我的人生方向？</p><p>如何克服我性格中的弱点？</p><p>如何有效提升自己的能量状态？</p><p>我的人生转折点在何时？</p></div></div>',
                        '<div class="question-group"><h4>人生机遇</h4><div class="questions-grid"><p>我未来十年的人生大运怎么样？</p><p>我该如何实现我的人生目标？</p><p>我的人生会有什么重大机遇？</p><p>我应该注意哪些健康问题？</p><p>如何才能活出更精彩的人生？</p><p>未来的人生之路走向如何？</p></div></div>',
                    '</div>',
                '</div>',
            '</div>'
        ];
        return html.join('');
    }

    // --- INITIALIZATION ---
    function initializePage() {
        // Step 1: Inject common layout
        document.body.insertAdjacentHTML('afterbegin', createCommonLayoutHTML());

        // Step 2: Setup general page logic AFTER injection
        setupCommonLogic();

        // Step 3: Expose the injection function to the global scope
        window.injectInspirationCard = () => {
            const inputCard = document.querySelector('.input-card');
            if (inputCard) {
                injectAndInitializeInspirationCard(inputCard);
            } else {
                console.error('Could not find .input-card to inject inspiration.');
            }
        };

        window.saveHistory = (type, userInput, resultHTML, aiResponse = '') => {
            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('qigua_history')) || [];
            } catch (e) {
                console.error("Could not parse history from localStorage", e);
                history = [];
            }
            const entryDate = new Date().toISOString();
            const newEntry = {
                id: entryDate, // Use timestamp as unique ID
                date: entryDate,
                type,
                userInput,
                resultHTML,
                aiResponse
            };
            history.push(newEntry);
            localStorage.setItem('qigua_history', JSON.stringify(history));
            return newEntry.id; // Return the ID for later updates
        };

        window.updateHistory = (id, fieldsToUpdate) => {
            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('qigua_history')) || [];
            } catch (e) {
                console.error("Could not parse history from localStorage", e);
                return;
            }
            const entryIndex = history.findIndex(entry => entry.id === id);
            if (entryIndex > -1) {
                history[entryIndex] = { ...history[entryIndex], ...fieldsToUpdate };
                localStorage.setItem('qigua_history', JSON.stringify(history));
            }
        };

        window.loadLatestHistory = (type) => {
            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('qigua_history')) || [];
            } catch (e) {
                console.error("Could not parse history from localStorage", e);
                return null;
            }
            const latestEntry = history.filter(item => item.type === type).pop();
            return latestEntry;
        }
    }

    function setupCommonLogic() {
        // --- iOS Device Detection ---
        if (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
            document.body.classList.add('ios-device');
        }

        // --- Element Selectors (post-injection) ---
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.overlay');
        const navLinks = document.querySelectorAll('.nav-link');
        const mainContent = document.querySelector('.main-content');
// --- Viewport Height Fix for Mobile ---
        function setViewportHeight() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        // --- Mobile Menu Logic ---
        function closeMenu() {
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
        }
        if (menuToggle && sidebar && overlay) {
            menuToggle.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle('open');
                    overlay.classList.toggle('open');
                }
            });
            overlay.addEventListener('click', closeMenu);
        }

        // --- Nav Link Logic ---
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            if (link.getAttribute('href').split('/').pop() === currentPage) {
                link.classList.add('active');
            }
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    if (link.classList.contains('active')) e.preventDefault();
                    closeMenu();
                }
            });
        });
        
        // --- Footer Year ---
        const yearDesktop = document.getElementById('year-desktop');
        if (yearDesktop) {
            yearDesktop.textContent = new Date().getFullYear();
        }

        // Clear userInput on page load to prevent browser caching
        const userInput = document.getElementById('userInput');
        if (userInput) {
            userInput.value = '';
        }
    }

    function injectAndInitializeInspirationCard(inputCard) {
        inputCard.insertAdjacentHTML('afterend', createInspirationCardHTML());
        const inspirationCard = document.querySelector('.inspiration-card');
        if (!inspirationCard) return;

        const tabs = inspirationCard.querySelectorAll('.tab-btn');
        const panes = inspirationCard.querySelectorAll('.tab-pane');
        const questions = inspirationCard.querySelectorAll('.questions-grid p');
        const userInput = document.getElementById('userInput');
        const submitButton = document.getElementById('submitButton');
        const tabsContainer = inspirationCard.querySelector('.inspiration-tabs');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const targetPane = document.getElementById(tab.getAttribute('data-tab'));
                if (targetPane) targetPane.classList.add('active');

                if (window.innerWidth <= 768) {
                    const container = tabsContainer;
                    const tabRect = tab.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    const scrollLeft = container.scrollLeft + tabRect.left - containerRect.left - (containerRect.width / 2) + (tabRect.width / 2);
                    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
            });
        });

        questions.forEach(question => {
            question.addEventListener('click', () => {
                if (userInput && submitButton) {
                    userInput.value = question.textContent;
                    submitButton.click();
                }
            });
        });

        if (submitButton && inspirationCard) {
            submitButton.addEventListener('click', (event) => {
                if (userInput.value) {
                    // Hide the card only on trusted (user-initiated) clicks.
                    if (event.isTrusted) {
                        inspirationCard.style.display = 'none';
                    }
                    
                    // Scroll to results after a short delay to allow the UI to update.
                    setTimeout(() => {
                        const resultElement = document.getElementById('outputText');
                        if (resultElement) {
                            resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
            });
        }
    }

    initializePage();
});