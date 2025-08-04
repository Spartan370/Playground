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
            mainNav.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll('.features-grid .feature-card, .info-item, .faq-card, .cta-banner');
    animatedElements.forEach(el => observer.observe(el));

});