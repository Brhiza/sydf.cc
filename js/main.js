document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.querySelector('main');
    const mobileWelcome = document.querySelector('.mobile-welcome');

    const pageMetadata = {
        'ly.html': {
            title: '六爻',
            description: '在分析人事方面较为细致准确，能够深入剖析事情的内在联系和发展趋势，对应期的判断也有一定的规律可循，尤其适合详细探究复杂问题',
            buttonText: '询问赛博大师',
            scripts: ['js/lunar.js', 'js/ai.js', 'js/ly.js']
        },
        'mh.html': {
            title: '梅花易数',
            description: '能够快速抓住事物发展的关键点，给出相对准确的吉凶判断，在需要快速得到结果的情况下非常实用',
            buttonText: '询问赛博大师',
            scripts: ['js/lunar.js', 'js/ai.js', 'js/mh.js']
        },
        'qm.html': {
            title: '奇门遁甲',
            description: '在分析复杂局势和决策方面具有显著优势，能够综合考虑各种因素，为决策提供较为全面的参考依据',
            buttonText: '询问赛博大师',
            scripts: ['js/lunar.js', 'js/ai.js', 'js/qm.js']
        },
        'dp.html': {
            title: '塔罗牌·单牌',
            description: '在需要快速得到答案或建议时非常实用，例如紧急决策和日运，想知道大致的方向，抽取单牌能迅速给出一个直观的指引',
            buttonText: '询问塔罗大师',
            scripts: ['js/lunar.js', 'js/ai.js', 'js/dp.js']
        },
        'sp.html': {
            title: '塔罗牌·三牌',
            description: '在处理复杂问题或需要考虑多方面因素时，三牌布局可以提供更丰富的细节和更全面的视角，过去现在和未来',
            buttonText: '询问塔罗大师',
            scripts: ['js/lunar.js', 'js/ai.js', 'js/sp.js']
        }
    };

    function closeMenu() {
        nav.classList.remove('open');
        overlay.classList.remove('open');
    }

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        overlay.classList.toggle('open');
    });

    overlay.addEventListener('click', closeMenu);

    async function loadScripts(scripts) {
        // Clear old scripts
        const oldScripts = document.querySelectorAll('script[data-dynamic-script]');
        oldScripts.forEach(s => s.remove());

        for (const scriptSrc of scripts) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = scriptSrc;
                script.setAttribute('data-dynamic-script', 'true');
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        }
    }

    async function loadPage(url) {
        try {
            if (url === 'about.html') {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                mainContent.innerHTML = await response.text();
                // about.html has no scripts to load
                const oldScripts = document.querySelectorAll('script[data-dynamic-script]');
                oldScripts.forEach(s => s.remove());
            } else {
                const metadata = pageMetadata[url];
                if (!metadata) throw new Error(`No metadata for page: ${url}`);

                const template = document.getElementById('divination-template');
                const content = template.content.cloneNode(true);
                mainContent.innerHTML = ''; // Clear previous content
                mainContent.appendChild(content);

                document.getElementById('divination-title').textContent = metadata.title;
                document.getElementById('divination-description').textContent = metadata.description;
                document.getElementById('submitButton').textContent = metadata.buttonText;

                await loadScripts(metadata.scripts);
            }
        } catch (error) {
            console.error('Failed to load page: ', error);
            mainContent.innerHTML = `<p>Error loading page. Please try again later.</p>`;
        }
    }

    async function navigateTo(url, linkElement, pushState = true) {
        await loadPage(url);

        navLinks.forEach(l => l.classList.remove('active'));
        if (linkElement) {
            linkElement.classList.add('active');
        }

        const pageId = url.split('.')[0];
        localStorage.setItem('activePage', url);

        if (pushState) {
            history.pushState({ page: url }, '', `?${pageId}`);
        }

        if (window.innerWidth <= 768) {
            closeMenu();
            mainContent.classList.add('active');
            setTimeout(() => {
                void mainContent.offsetHeight;
                if (mobileWelcome) mobileWelcome.classList.add('hidden');
            }, 0);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', async function(e) { // Make event listener async
            e.preventDefault();
            const url = this.getAttribute('href');
            await navigateTo(url, this);
        });
    });

    // Quick nav buttons for mobile
    const quickNavContainer = document.querySelector('.quick-nav');
    if (quickNavContainer) {
        navLinks.forEach(link => {
            const btn = document.createElement('button');
            btn.textContent = link.textContent;
            btn.className = 'quick-nav-btn';
            btn.addEventListener('click', async () => { // Make event listener async
                const url = link.getAttribute('href');
                await navigateTo(url, link);
            });
            quickNavContainer.appendChild(btn);
        });
    }

    // Initial page load logic
    function initialLoad() {
        const urlParams = new URLSearchParams(window.location.search);
        const pageIdFromUrl = urlParams.toString().split('=')[0];
        const storedPage = localStorage.getItem('activePage');

        let initialUrl = 'ly.html'; // Default page
        if (pageIdFromUrl) {
            initialUrl = `${pageIdFromUrl}.html`;
        } else if (storedPage) {
            initialUrl = storedPage;
        }

        const linkElement = document.querySelector(`.nav-link[href="${initialUrl}"]`);

        if (window.innerWidth > 768) {
            mainContent.classList.add('active');
            navigateTo(initialUrl, linkElement, false);
        } else {
            // On mobile, don't load a page by default, show the welcome screen.
            // But if there's a direct link, load it.
            if (pageIdFromUrl) {
                 navigateTo(initialUrl, linkElement, false);
            } else {
                mainContent.classList.remove('active');
                if (mobileWelcome) mobileWelcome.classList.remove('hidden');
            }
        }
    }

    initialLoad();

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page) {
            const linkElement = document.querySelector(`.nav-link[href="${event.state.page}"]`);
            navigateTo(event.state.page, linkElement, false);
        } else {
            // Handle cases where state is null (e.g., initial page load)
            initialLoad();
        }
    });

    // Set year in footer
    const yearDesktop = document.getElementById('year-desktop');
    if (yearDesktop) {
        yearDesktop.textContent = new Date().getFullYear();
    }
});