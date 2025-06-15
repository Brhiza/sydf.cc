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
                            '<h4>情感发展状态</h4>',
                            '<div class="questions-grid">',
                                '<p>他/她对我的真实情感是什么</p>',
                                '<p>我们之间是否有未来或者复合的可能</p>',
                                '<p>我近期的桃花运怎么样？会遇到新的人吗</p>',
                                '<p>我们目前的感情走向如何</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>感情婚姻</h4>',
                            '<div class="questions-grid">',
                                '<p>如何吸引我的正缘/桃花</p>',
                                '<p>我什么时候能脱单</p>',
                                '<p>我何时会结婚</p>',
                                '<p>我适合和对方结婚吗</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                        '<h4>关系状态</h4>',
                        '<div class="questions-grid">',
                            '<p>我们会复合吗</p>',
                            '<p>他/她想跟我复合吗</p>',
                            '<p>我的正缘是谁</p>',
                            '<p>我的灵魂伴侣有什么特征</p>',
                            '<p>我们之间出了什么问题</p>',
                            '<p>如何解决现在的感情危机</p>',
                        '</div>',
                    '</div>',
                    '</div>',
                    '<div class="tab-pane" id="shiye">',
                        '<div class="question-group">',
                            '<h4>工作发展</h4>',
                            '<div class="questions-grid">',
                                '<p>我的工作走向怎么样</p>',
                                '<p>我适合辞职/跳槽吗</p>',
                                '<p>我什么时候能找到工作</p>',
                                '<p>我的事业什么时候才能成功</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>职场状态</h4>',
                            '<div class="questions-grid">',
                                '<p>我最近的职场人际关系如何</p>',
                                '<p>如何改善我的职场人际关系</p>',
                                '<p>如何改善我的工作状态</p>',
                                '<p>我在公司的发展前景如何</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>创业发展</h4>',
                            '<div class="questions-grid">',
                                '<p>我适合创业吗</p>',
                                '<p>我的创业项目前景如何</p>',
                                '<p>我该和什么样的人合伙</p>',
                                '<p>我的创业会成功吗</p>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="tab-pane" id="caifu">',
                        '<div class="question-group">',
                            '<h4>财运预测</h4>',
                            '<div class="questions-grid">',
                                '<p>我近期的财运怎么样</p>',
                                '<p>我会有意外之财吗</p>',
                                '<p>如何提升我的财运</p>',
                                '<p>我什么时候能发财</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>投资理财</h4>',
                            '<div class="questions-grid">',
                                '<p>我适合投资吗</p>',
                                '<p>这个投资项目能赚钱吗</p>',
                                '<p>如何管理我的财富</p>',
                                '<p>我的投资风险大吗</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>破财风险</h4>',
                            '<div class="questions-grid">',
                                '<p>我最近会破财吗</p>',
                                '<p>如何避免破财</p>',
                                '<p>我为什么总是存不住钱</p>',
                                '<p>我该如何处理我的债务</p>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="tab-pane" id="renji">',
                        '<div class="question-group">',
                            '<h4>社交关系</h4>',
                            '<div class="questions-grid">',
                                '<p>我目前的人际关系/社交运如何</p>',
                                '<p>我会吸引哪些人进入我的生活</p>',
                                '<p>如何获得领导的赏识</p>',
                                '<p>我该如何处理与朋友的矛盾</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>朋友交往</h4>',
                            '<div class="questions-grid">',
                                '<p>如何结交更多的朋友</p>',
                                '<p>我该如何维系我的友谊</p>',
                                '<p>我该信任我的朋友吗</p>',
                                '<p>我与朋友的矛盾如何解决</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>家庭关系</h4>',
                            '<div class="questions-grid">',
                                '<p>如何改善我与家人的关系</p>',
                                '<p>我该如何处理家庭矛盾</p>',
                                '<p>我与家人的缘分如何</p>',
                                '<p>我该如何更好地与家人沟通</p>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="tab-pane" id="rensheng">',
                        '<div class="question-group">',
                            '<h4>学业考试</h4>',
                            '<div class="questions-grid">',
                                '<p>我这次考试能通过吗</p>',
                                '<p>我适合考研/考公吗</p>',
                                '<p>如何提升我的学习效率</p>',
                                '<p>我该选择哪个专业/学校</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>个人成长</h4>',
                            '<div class="questions-grid">',
                                '<p>我的人生课题是什么</p>',
                                '<p>如何找到我的人生方向</p>',
                                '<p>如何提升我自己的能量</p>',
                                '<p>我该如何克服我的人性弱点</p>',
                            '</div>',
                        '</div>',
                        '<div class="question-group">',
                            '<h4>未来规划</h4>',
                            '<div class="questions-grid">',
                                '<p>我未来的人生走向如何</p>',
                                '<p>我该如何实现我的人生目标</p>',
                                '<p>我的人生会有什么重大的转折吗</p>',
                                '<p>如何活出更精彩的人生</p>',
                            '</div>',
                        '</div>',
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

        // Step 3: Inject and initialize the inspiration card on specific pages
        const pagesWithInspiration = ['ly.html', 'mh.html', 'qm.html', 'dp.html', 'sp.html'];
        const currentPageForInspiration = window.location.pathname.split('/').pop() || 'index.html';
        
        if (pagesWithInspiration.includes(currentPageForInspiration)) {
            const maxTries = 20; // Try for 2 seconds (20 * 100ms)
            let currentTry = 0;

            const injectionInterval = setInterval(() => {
                const inputCard = document.querySelector('.input-card');
                if (inputCard) {
                    injectAndInitializeInspirationCard(inputCard);
                    clearInterval(injectionInterval); // Stop polling once injected
                } else if (currentTry >= maxTries) {
                    clearInterval(injectionInterval); // Stop after timeout
                    console.error('Could not find .input-card to inject inspiration.');
                }
                currentTry++;
            }, 100);
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
        const mobileWelcome = document.querySelector('.mobile-welcome');
        const desktopWelcome = document.querySelector('.desktop-welcome');

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

        // --- Page State Logic for index.html ---
        if (document.querySelector('.welcome-card') || document.querySelector('.mobile-welcome')) {
            const quickNavContainer = document.querySelector('.quick-nav');

            // --- Populate Quick Nav for Mobile ---
            if (quickNavContainer && navLinks.length > 0) {
                navLinks.forEach(link => {
                    // Create a new element to avoid issues with cloning event listeners etc.
                    const quickLink = document.createElement('a');
                    quickLink.href = link.href;
                    quickLink.textContent = link.textContent;
                    quickLink.className = 'quick-nav-btn';
                    quickNavContainer.appendChild(quickLink);
                });
            }

             function setIndexPageState() {
                if (window.innerWidth <= 768) {
                    if(mainContent) mainContent.style.display = 'none';
                    if(mobileWelcome) mobileWelcome.style.display = 'flex';
                } else {
                    if(mobileWelcome) mobileWelcome.style.display = 'none';
                    if(mainContent) mainContent.style.display = 'block';
                }
            }
            setIndexPageState();
            window.addEventListener('resize', setIndexPageState);
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
                    inspirationCard.style.display = 'none';
                }
            });
        });
    }

    initializePage();
});