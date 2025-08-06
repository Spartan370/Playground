document.addEventListener('DOMContentLoaded', () => {

    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeToggleIcon(savedTheme);
    }

    // Theme toggle functionality
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleIcon(newTheme);
            updateSnowfallVisibility(newTheme);
        });
    }
    
    function updateThemeToggleIcon(theme) {
        const toggleIcon = themeToggleBtn.querySelector('.toggle-icon');
        if (theme === 'dark') {
            toggleIcon.classList.remove('sun');
            toggleIcon.classList.add('moon');
            themeToggleBtn.style.transform = 'rotate(0deg)';
        } else {
            toggleIcon.classList.remove('moon');
            toggleIcon.classList.add('sun');
            themeToggleBtn.style.transform = 'rotate(360deg)';
        }
    }
    
    function updateSnowfallVisibility(theme) {
        const snowfallContainer = document.getElementById('snowfall-container');
        if (snowfallContainer) {
            if (theme === 'light') {
                snowfallContainer.classList.add('fade-out');
            } else {
                snowfallContainer.classList.remove('fade-out');
            }
        }
    }

    // Initial check for snowfall visibility
    updateSnowfallVisibility(body.getAttribute('data-theme'));

    const menuToggleBtn = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Mobile menu toggle functionality (if needed)
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            menuToggleBtn.classList.toggle('is-open');
        });
    }

});