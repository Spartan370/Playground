document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mainNav.classList.toggle('is-open');
        menuToggle.classList.toggle('is-active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

});