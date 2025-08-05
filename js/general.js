/* general.js - Handles global site functionality */

document.addEventListener('DOMContentLoaded', () => {
    // === DOM Element References ===
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    // === Sidebar Navigation Logic ===
    /**
     * Opens the sidebar and displays the overlay.
     */
    const openSidebar = () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    };

    /**
     * Closes the sidebar and hides the overlay.
     */
    const closeSidebar = () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Add event listeners for sidebar actions
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', openSidebar);
    }
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // === Theme Toggle Logic ===
    /**
     * Toggles the website's color theme between light and dark.
     */
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    };

    /**
     * Updates the visibility of the sun and moon icons based on the current theme.
     * @param {boolean} isDark - True if the dark theme is active, false otherwise.
     */
    const updateThemeIcons = (isDark) => {
        if (isDark) {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    };

    // Apply the saved theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcons(true);
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcons(false);
    }

    // Add click event listener to the theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});
