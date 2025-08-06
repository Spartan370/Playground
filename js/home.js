document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselTrack = document.getElementById('carouselTrack');
    const scrollbarTrack = document.getElementById('scrollbarTrack');
    const scrollbarThumb = document.getElementById('scrollbarThumb');

    let isDragging = false;
    let startX;
    let scrollLeft;
    let trackWidth;
    let thumbWidth;

    function updateScrollbar() {
        if (!carouselContainer || !carouselTrack || !scrollbarTrack || !scrollbarThumb) {
            return;
        }

        trackWidth = carouselContainer.offsetWidth;
        const scrollWidth = carouselTrack.scrollWidth;
        const scrollPosition = carouselContainer.scrollLeft;

        if (scrollWidth <= trackWidth) {
            scrollbarTrack.style.display = 'none';
            return;
        } else {
            scrollbarTrack.style.display = 'block';
        }

        thumbWidth = (trackWidth / scrollWidth) * trackWidth;
        const thumbPosition = (scrollPosition / scrollWidth) * trackWidth;

        scrollbarThumb.style.width = `${thumbWidth}px`;
        scrollbarThumb.style.transform = `translateX(${thumbPosition}px)`;
    }

    if (carouselContainer) {
        carouselContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
            carouselContainer.style.cursor = 'grabbing';
        });

        carouselContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            carouselContainer.style.cursor = 'grab';
        });

        carouselContainer.addEventListener('mouseup', () => {
            isDragging = false;
            carouselContainer.style.cursor = 'grab';
        });

        carouselContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 1.5;
            carouselContainer.scrollLeft = scrollLeft - walk;
            updateScrollbar();
        });

        carouselContainer.addEventListener('scroll', updateScrollbar);
    }

    if (scrollbarThumb) {
        scrollbarThumb.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            startX = e.pageX - scrollbarThumb.getBoundingClientRect().left;
            scrollLeft = carouselContainer.scrollLeft;
            scrollbarThumb.style.cursor = 'grabbing';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            scrollbarThumb.style.cursor = 'grab';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - scrollbarTrack.getBoundingClientRect().left;
            const newThumbPosition = x - startX;
            const maxThumbPosition = trackWidth - thumbWidth;
            const clampedThumbPosition = Math.max(0, Math.min(newThumbPosition, maxThumbPosition));
            
            const scrollRatio = clampedThumbPosition / trackWidth;
            carouselContainer.scrollLeft = scrollRatio * carouselTrack.scrollWidth;
            updateScrollbar();
        });
    }

    window.addEventListener('resize', updateScrollbar);

    if (scrollbarTrack) {
        scrollbarTrack.addEventListener('click', (e) => {
            const clickX = e.pageX - scrollbarTrack.getBoundingClientRect().left;
            const newScrollPosition = (clickX / trackWidth) * carouselTrack.scrollWidth - (carouselContainer.offsetWidth / 2);
            carouselContainer.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            carouselContainer.scrollBy({
                left: -350,
                behavior: 'smooth'
            });
        }
        if (e.key === 'ArrowRight') {
            carouselContainer.scrollBy({
                left: 350,
                behavior: 'smooth'
            });
        }
    });

    let touchStartX = 0;
    let touchMoveX = 0;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            touchMoveX = e.touches[0].clientX;
            const diff = touchStartX - touchMoveX;
            carouselContainer.scrollLeft += diff;
            touchStartX = touchMoveX;
            updateScrollbar();
        });

        carouselContainer.addEventListener('touchend', () => {
            // No specific action needed on touchend for continuous scroll
        });
    }

    updateScrollbar();
});