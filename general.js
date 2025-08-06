document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    // Get theme from local storage or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
    
    // Add click event listener to toggle theme
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        // Update the theme in local storage and the data attribute
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
    
    // Function to update the sun/moon icon based on the current theme
    function updateIcon(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Sidebar and Hamburger Menu Functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;

    // Add click event to open the sidebar
    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        hamburgerMenu.classList.add('active');
        header.classList.add('blurred');
        mainContent.classList.add('blurred');
        body.style.overflow = 'hidden';
    });

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        header.classList.remove('blurred');
        mainContent.classList.remove('blurred');
        body.style.overflow = '';
    }

    // Add click events to close the sidebar
    sidebarOverlay.addEventListener('click', closeSidebar);
    sidebarClose.addEventListener('click', closeSidebar);

    // Add keyboard event listener to close the sidebar with the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Close sidebar on resize if the viewport is larger than 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});