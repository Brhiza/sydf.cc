document.addEventListener('DOMContentLoaded', function() {
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
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
    }

    function handleMenuToggle() {
        if (window.innerWidth <= 768) {
            if (sidebar) sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('open');
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
            if (currentPage === 'index.html' || currentPage === '') {
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
});