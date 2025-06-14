document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const quickNavContainer = document.querySelector('.quick-nav');
    const mainContent = document.querySelector('main');
    const mobileWelcome = document.querySelector('.mobile-welcome');

    // --- Mobile Menu Toggle ---
    function closeMenu() {
        nav.classList.remove('open');
        overlay.classList.remove('open');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            overlay.classList.toggle('open');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // --- Active Nav Link Highlight ---
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Close menu on link click in mobile view
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // --- Quick Nav Buttons for Mobile ---
    if (quickNavContainer) {
        document.querySelectorAll('nav .nav-link').forEach(link => {
            const btn = document.createElement('button');
            btn.textContent = link.textContent;
            btn.className = 'quick-nav-btn';
            btn.addEventListener('click', () => {
                // Hide welcome screen and navigate
                if (mobileWelcome) mobileWelcome.classList.add('hidden');
                if (mainContent) mainContent.classList.add('active');
                window.location.href = link.getAttribute('href');
            });
            quickNavContainer.appendChild(btn);
        });
    }
    
    // --- Initial Page State for Mobile ---
    // On mobile, if we are on the index page, show the welcome message.
    // Otherwise, on specific pages, ensure the content is visible.
    if (window.innerWidth <= 768) {
        if (currentPage === 'index.html' || currentPage === '') {
             if (mainContent) mainContent.classList.remove('active');
             if (mobileWelcome) mobileWelcome.classList.remove('hidden');
        } else {
             if (mainContent) mainContent.classList.add('active');
             if (mobileWelcome) mobileWelcome.classList.add('hidden');
        }
    } else {
        // On desktop, content is always active
        if (mainContent) mainContent.classList.add('active');
    }


    // --- Set Year in Footer ---
    const yearDesktop = document.getElementById('year-desktop');
    if (yearDesktop) {
        yearDesktop.textContent = new Date().getFullYear();
    }
});