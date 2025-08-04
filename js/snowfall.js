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
            createSnowflakes(snowfallContainer);
        }
    }

    function createSnowflakes(container) {
        if (container.classList.contains('fade-out')) {
            return;
        }

        const numberOfSnowflakes = 100;
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        for (let i = 0; i < numberOfSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.style.left = `${Math.random() * width}px`;
            snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
            snowflake.style.animationDelay = `-${Math.random() * 5}s`;
            snowflake.style.opacity = '0';
            container.appendChild(snowflake);
        }
    }

    // Re-create snowflakes if theme changes back to dark
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const newTheme = body.getAttribute('data-theme');
                if (newTheme === 'dark' && heroSection) {
                    // Clear existing snowflakes
                    if (snowfallContainer) {
                        snowfallContainer.innerHTML = '';
                    }
                    // Recreate snowflakes
                    createSnowflakes(snowfallContainer);
                }
            }
        });
    });

    if (heroSection) {
        observer.observe(body, { attributes: true });
    }

    // Handle resize to adjust snowflake positions
    window.addEventListener('resize', () => {
        if (heroSection && body.getAttribute('data-theme') === 'dark') {
            const snowflakes = document.querySelectorAll('.snowflake');
            const newWidth = heroSection.offsetWidth;
            snowflakes.forEach(flake => {
                flake.style.left = `${Math.random() * newWidth}px`;
            });
        }
    });

});