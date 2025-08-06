document.addEventListener('DOMContentLoaded', () => {

    const heroSection = document.getElementById('hero');
    const body = document.body;
    let snowfallContainer;

    if (heroSection) {
        snowfallContainer = document.createElement('div');
        snowfallContainer.classList.add('snowfall-container');
        snowfallContainer.id = 'snowfall-container';
        heroSection.prepend(snowfallContainer);

        const savedTheme = localStorage.getItem('theme') || body.getAttribute('data-theme');
        if (savedTheme === 'light') {
            snowfallContainer.classList.add('fade-out');
        } else {
            createRaindrops(snowfallContainer);
        }
    }

    function createRaindrops(container) {
        if (container.classList.contains('fade-out')) {
            return;
        }

        const numberOfRaindrops = 200;
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        for (let i = 0; i < numberOfRaindrops; i++) {
            const raindrop = document.createElement('div');
            raindrop.classList.add('raindrop');
            raindrop.style.left = `${Math.random() * width}px`;
            raindrop.style.animationDuration = `${Math.random() * 2 + 3}s`;
            raindrop.style.animationDelay = `-${Math.random() * 3}s`;
            raindrop.style.opacity = '0';
            container.appendChild(raindrop);
        }
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const newTheme = body.getAttribute('data-theme');
                if (newTheme === 'dark' && heroSection) {
                    if (snowfallContainer) {
                        snowfallContainer.innerHTML = '';
                    }
                    createRaindrops(snowfallContainer);
                }
            }
        });
    });

    if (heroSection) {
        observer.observe(body, { attributes: true });
    }

    window.addEventListener('resize', () => {
        if (heroSection && body.getAttribute('data-theme') === 'dark') {
            const raindrops = document.querySelectorAll('.raindrop');
            const newWidth = heroSection.offsetWidth;
            raindrops.forEach(drop => {
                drop.style.left = `${Math.random() * newWidth}px`;
            });
        }
    });

});
