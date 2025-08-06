document.addEventListener('DOMContentLoaded', () => {

    const heroSection = document.getElementById('hero');
    const body = document.body;
    let snowfallContainer;

    if (heroSection) {
        snowfallContainer = document.createElement('div');
        snowfallContainer.classList.add('snowfall-container'); // Renamed from snowfall-container for consistency
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

        const numberOfRaindrops = 150; // Increased for a fuller rain effect
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        for (let i = 0; i < numberOfRaindrops; i++) {
            const raindrop = document.createElement('div');
            raindrop.classList.add('raindrop'); // New class for styling
            raindrop.style.left = `${Math.random() * width}px`;
            raindrop.style.animationDuration = `${Math.random() * 2 + 3}s`; // Faster fall for rain
            raindrop.style.animationDelay = `-${Math.random() * 3}s`; // Staggered start
            raindrop.style.opacity = '0'; // Start invisible
            container.appendChild(raindrop);
        }
    }

    // Re-create raindrops if theme changes back to dark
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const newTheme = body.getAttribute('data-theme');
                if (newTheme === 'dark' && heroSection) {
                    // Clear existing raindrops
                    if (snowfallContainer) {
                        snowfallContainer.innerHTML = '';
                    }
                    // Recreate raindrops
                    createRaindrops(snowfallContainer);
                }
            }
        });
    });

    if (heroSection) {
        observer.observe(body, { attributes: true });
    }

    // Handle resize to adjust raindrop positions
    window.addEventListener('resize', () => {
        if (heroSection && body.getAttribute('data-theme') === 'dark') {
            const raindrops = document.querySelectorAll('.raindrop');
            const newWidth = heroSection.offsetWidth;
            raindrops.forEach(drop => {
                // Re-randomize position within new width
                drop.style.left = `${Math.random() * newWidth}px`;
            });
        }
    });

});