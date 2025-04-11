document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const sliderContainer = document.querySelector('.gallery-slider');

    const slideWidth = slides[0].offsetWidth + 20;
    const visibleSlides = Math.ceil(sliderContainer.offsetWidth / slideWidth);
    const clonesNeeded = visibleSlides * 3;
    let currentPosition = 0;
    let animationId;
    let isPaused = false;
    const speed = 0.5;

    function cloneSlides() {
        const oldClones = track.querySelectorAll('.cloned');
        oldClones.forEach(clone => clone.remove());

        for (let i = 0; i < clonesNeeded; i++) {
            const clone = slides[i % slides.length].cloneNode(true);
            clone.classList.add('cloned');
            track.appendChild(clone);
        }
    }

    function autoScroll() {
        if (isPaused) return;

        currentPosition -= speed;
        const totalWidth = slideWidth * (slides.length + clonesNeeded);
        const resetPosition = slideWidth * slides.length;

        if (currentPosition <= -resetPosition) {
            currentPosition += resetPosition;
            track.style.transition = 'none';
            track.style.transform = `translateX(${currentPosition}px)`;
            void track.offsetWidth;
        }

        track.style.transition = 'transform 0.1s linear';
        track.style.transform = `translateX(${currentPosition}px)`;

        animationId = requestAnimationFrame(autoScroll);
    }

    function initSlider() {
        cloneSlides();
        animationId = requestAnimationFrame(autoScroll);
    }

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cancelAnimationFrame(animationId);
            currentPosition = 0;
            track.style.transform = 'translateX(0)';
            initSlider();
        }, 100);
    });

    initSlider();
});