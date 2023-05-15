function carousel() {
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }
    const carousel = {
        slides: document.querySelectorAll('.offer__slide'),
        slider: document.querySelector('.offer__slider'),
        currentSlideCounter: document.querySelector('#current'),
        totalSlidesCounter: document.querySelector('#total'),
        nextBtn: document.querySelector('.offer__slider-next'),
        prevBtn: document.querySelector('.offer__slider-prev'),
        wrapper: document.querySelector('.offer__slider-wrapper'),
        field: document.querySelector('.offer__slider-inner'),
        currentIndex: 0,
        offset: 0
    };
    innerWidth = +window.getComputedStyle(carousel.wrapper).width.replace(/\D/g, '');

    // Carousel settings
    carousel.field.style.width = 100 * carousel.slides.length + '%';
    carousel.slides.forEach(slide => slide.style.width = innerWidth);
    carousel.currentSlideCounter.textContent = getZero(carousel.currentIndex + 1);
    carousel.totalSlidesCounter.textContent = getZero(carousel.slides.length);

    // Dots Wrapper
    const dotsWrapper = document.createElement('ol'),
        dots = [];
    dotsWrapper.classList.add('carousel-indicators');

    function activateDot() {
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('dot_active'));
        dots[carousel.currentIndex].classList.add('dot_active');
    }
    // Navigating forward
    carousel.nextBtn.addEventListener('click', () => {
        if (carousel.offset == innerWidth * (carousel.slides.length - 1)) {
            carousel.offset = 0;
            carousel.currentIndex = 0;
        } else {
            carousel.offset += innerWidth;
            ++carousel.currentIndex;
        }
        carousel.currentSlideCounter.textContent = getZero(carousel.currentIndex + 1);
        carousel.field.style.transform = `translateX(-${carousel.offset}px)`;

        activateDot();
    });

    // Navigating back
    carousel.prevBtn.addEventListener('click', () => {
        if (carousel.offset == 0) {
            carousel.offset = innerWidth * (carousel.slides.length - 1);
            carousel.currentIndex = carousel.slides.length;
        } else {
            carousel.offset -= innerWidth;
        }
        carousel.currentSlideCounter.textContent = getZero(carousel.currentIndex--);
        carousel.field.style.transform = `translateX(-${carousel.offset}px)`;

        activateDot();
    });

    // Creating dots
    for (let i = 0; i < carousel.slides.length; ++i) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dotsWrapper.append(dot);
        dots.push(dot);
    }

    // Matches current slide with dot
    dots[carousel.currentIndex].classList.add('dot_active');

    // Navigating by click
    dotsWrapper.addEventListener('click', event => {
        if (event.target.classList.contains('dot') && event.target) {
            carousel.currentIndex = event.target.getAttribute('data-slide-to');
            carousel.offset = innerWidth * (carousel.currentIndex - 1);
            carousel.field.style.transform = `translateX(-${carousel.offset}px)`;
            carousel.currentSlideCounter.textContent = getZero(carousel.currentIndex--);
            activateDot();
        }
    });
    carousel.slider.append(dotsWrapper);
}

module.exports = carousel;