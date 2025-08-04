document.addEventListener('DOMContentLoaded', function() {
    // Select all necessary elements from the DOM for theme toggling
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    // Get the current theme from local storage, default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
    
    // Add event listener for theme toggle button
    themeToggle.addEventListener('click', () => {
        // Get the current theme attribute from the HTML element
        const theme = document.documentElement.getAttribute('data-theme');
        // Determine the new theme
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        // Update the theme attribute and local storage
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        // Update the visible icon
        updateIcon(newTheme);
    });
    
    // Function to show the correct icon based on the theme
    function updateIcon(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Select all necessary elements for the sidebar navigation
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;

    // Add event listener to open the sidebar
    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        hamburgerMenu.classList.add('active');
        header.classList.add('blurred');
        mainContent.classList.add('blurred');
        body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    });

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        header.classList.remove('blurred');
        mainContent.classList.remove('blurred');
        body.style.overflow = ''; // Re-enable scrolling
    }

    // Add event listeners to close the sidebar
    sidebarOverlay.addEventListener('click', closeSidebar);
    sidebarClose.addEventListener('click', closeSidebar);

    // Close sidebar on 'Escape' key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Close sidebar if window is resized to a larger size (desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});
