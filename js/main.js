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

    async function navigateTo(url, linkElement) { // Make navigateTo async
        await loadPage(url); // Await for page content and scripts to load

        navLinks.forEach(l => l.classList.remove('active'));
        if (linkElement) {
            linkElement.classList.add('active');
        }

        if (window.innerWidth <= 768) {
            closeMenu();
            mainContent.classList.add('active');
            // Force reflow/repaint to ensure correct initial layout
            // and add a small timeout for Android Chrome rendering quirks
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
            await navigateTo(url, this); // Await navigateTo
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
                await navigateTo(url, link); // Await navigateTo
            });
            quickNavContainer.appendChild(btn);
        });
    }

    // Initial page load
    if (window.innerWidth > 768) {
        mainContent.classList.add('active');
        const initialUrl = document.querySelector('.nav-link.active')?.getAttribute('href');
        if (initialUrl) {
            loadPage(initialUrl);
        }
    } else {
        mainContent.classList.remove('active');
        if (mobileWelcome) mobileWelcome.classList.remove('hidden');
    }

    // Set year in footer
    const yearDesktop = document.getElementById('year-desktop');
    if (yearDesktop) {
        yearDesktop.textContent = new Date().getFullYear();
    }
});