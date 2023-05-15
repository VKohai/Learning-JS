import { getZero } from "./timer";
function carousel({ slidesSelector, sliderSelector, currentCounterSelector, totalCounterSelector,
    nextBtnSelector, prevBtnSelector, wrapper, fieldSelector }) {
    const carousel = {
        slides: document.querySelectorAll(slidesSelector),
        slider: document.querySelector(sliderSelector),
        currentSlideCounter: document.querySelector(currentCounterSelector),
        totalSlidesCounter: document.querySelector(totalCounterSelector),
        nextBtn: document.querySelector(nextBtnSelector),
        prevBtn: document.querySelector(prevBtnSelector),
        wrapper: document.querySelector(wrapper),
        field: document.querySelector(fieldSelector),
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

export default carousel;