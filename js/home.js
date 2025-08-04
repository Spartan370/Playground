document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('carouselContainer');
    const track = document.getElementById('carouselTrack');
    const scrollbarThumb = document.getElementById('scrollbarThumb');
    const scrollbarTrack = scrollbarThumb.parentElement;
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Theme toggle logic
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Carousel scrollbar logic
    function updateScrollbar() {
        if (!container) return;

        const scrollWidth = track.scrollWidth;
        const clientWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;

        // Only show scrollbar if content overflows
        if (scrollWidth <= clientWidth) {
            scrollbarTrack.style.display = 'none';
            return;
        } else {
            scrollbarTrack.style.display = 'block';
        }

        const thumbWidth = Math.max(40, (clientWidth / scrollWidth) * scrollbarTrack.clientWidth);
        scrollbarThumb.style.width = thumbWidth + 'px';

        const maxScroll = scrollWidth - clientWidth;
        const thumbPosition = maxScroll > 0 ? (scrollLeft / maxScroll) * (scrollbarTrack.clientWidth - thumbWidth) : 0;
        scrollbarThumb.style.left = thumbPosition + 'px';
    }

    container.addEventListener('scroll', updateScrollbar);

    scrollbarThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - scrollbarThumb.offsetLeft;
        scrollLeft = container.scrollLeft;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        e.preventDefault();
    });

    scrollbarTrack.addEventListener('click', (e) => {
        if (e.target === scrollbarThumb) return;

        const rect = scrollbarTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const scrollbarWidth = scrollbarTrack.clientWidth;
        const thumbWidth = scrollbarThumb.offsetWidth;

        const scrollRatio = clickX / scrollbarWidth;
        const maxScroll = track.scrollWidth - container.clientWidth;
        const newScrollLeft = scrollRatio * maxScroll;

        container.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    });

    function handleMouseMove(e) {
        if (!isDragging) return;

        e.preventDefault();
        const x = e.pageX - startX;
        const scrollbarWidth = scrollbarTrack.clientWidth - scrollbarThumb.offsetWidth;
        const scrollRatio = x / scrollbarWidth;
        const maxScroll = track.scrollWidth - container.clientWidth;

        container.scrollLeft = scrollRatio * maxScroll;
    }

    function handleMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    window.addEventListener('resize', updateScrollbar);
    window.addEventListener('load', updateScrollbar);
});
