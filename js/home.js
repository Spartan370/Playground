document.addEventListener('DOMContentLoaded', function() {
    // Carousel Functionality
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselTrack = document.getElementById('carouselTrack');
    const scrollbarTrack = document.getElementById('scrollbarTrack');
    const scrollbarThumb = document.getElementById('scrollbarThumb');

    let isDragging = false;
    let startX;
    let scrollLeft;
    let trackWidth;
    let thumbWidth;

    // Calculate initial dimensions and position
    function updateScrollbar() {
        trackWidth = carouselContainer.offsetWidth;
        const scrollWidth = carouselTrack.scrollWidth;
        const scrollPosition = carouselContainer.scrollLeft;

        // Calculate thumb width and position
        thumbWidth = (trackWidth / scrollWidth) * trackWidth;
        const thumbPosition = (scrollPosition / scrollWidth) * trackWidth;

        // Set thumb width and position
        scrollbarThumb.style.width = `${thumbWidth}px`;
        scrollbarThumb.style.transform = `translateX(${thumbPosition}px)`;
    }

    // Handle mouse down event for dragging
    carouselContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.scrollLeft;
        carouselContainer.style.cursor = 'grabbing';
    });

    // Handle mouse leave event
    carouselContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        carouselContainer.style.cursor = 'grab';
    });

    // Handle mouse up event
    carouselContainer.addEventListener('mouseup', () => {
        isDragging = false;
        carouselContainer.style.cursor = 'grab';
    });

    // Handle mouse move event
    carouselContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselContainer.offsetLeft;
        const walk = (x - startX) * 2; // Multiplier for faster scrolling
        carouselContainer.scrollLeft = scrollLeft - walk;
    });

    // Handle scroll event to update scrollbar thumb
    carouselContainer.addEventListener('scroll', updateScrollbar);

    // Initial update
    updateScrollbar();

    // Update on window resize
    window.addEventListener('resize', updateScrollbar);

    // Add click event for the scrollbar to jump to a specific position
    scrollbarTrack.addEventListener('click', (e) => {
        const clickX = e.pageX - scrollbarTrack.getBoundingClientRect().left;
        const newScrollPosition = (clickX / trackWidth) * carouselTrack.scrollWidth - (carouselContainer.offsetWidth / 2);
        carouselContainer.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth'
        });
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            carouselContainer.scrollBy({
                left: -350, // width of one slide
                behavior: 'smooth'
            });
        }
        if (e.key === 'ArrowRight') {
            carouselContainer.scrollBy({
                left: 350, // width of one slide
                behavior: 'smooth'
            });
        }
    });

    // Touch events for carousel on mobile
    let touchStartX = 0;
    let touchMoveX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchmove', (e) => {
        touchMoveX = e.touches[0].clientX;
        const diff = touchStartX - touchMoveX;
        carouselContainer.scrollLeft += diff;
        touchStartX = touchMoveX;
    });

});
