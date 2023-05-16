/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const calories = document.querySelector('.calculating__result span');
    let sex, ratio, height, weight, age;

    if (localStorage.getItem('sex'))
        sex = localStorage.getItem('sex');
    else
        sex = document.querySelector('#gender .calculating__choose-item_active').getAttribute('id');

    if (localStorage.getItem('ratio'))
        ratio = localStorage.getItem('ratio');
    else
        ratio = +document.querySelector('.calculating__choose_big .calculating__choose-item_active').getAttribute('data-ratio');

    if (localStorage.getItem('height')) {
        height = +localStorage.getItem('height');
        document.querySelector('#height').value = height;
    }

    if (localStorage.getItem('weight')) {
        weight = +localStorage.getItem('weight');
        document.querySelector('#weight').value = weight;
    }

    if (localStorage.getItem('age')) {
        age = +localStorage.getItem('age');
        document.querySelector('#age').value = age;
    }


    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(`${selector} div`);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');
    initLocalSettings('#gender', 'calculating__choose-item_active');

    function calcTotal() {
        let result = 0;
        if (!sex || !height || !weight || !age || !ratio) {
            calories.textContent = result;
            return;
        }
        if (sex == 'male') {
            result = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        } else {
            result = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        }
        calories.textContent = Math.round(result * 100) / 100;
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        elements.forEach(elem => elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }
            elements.forEach(el => {
                el.classList.remove(activeClass);
            })
            e.target.classList.add(activeClass);
            calcTotal();
        }));
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.trim().match(/\D/g)) {
                input.classList.add('calculating__choose-item_error');
                return;
            } else {
                input.classList.remove('calculating__choose-item_error');
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    localStorage.setItem('height', height);
                    break;
                case 'weight':
                    weight = +input.value;
                    localStorage.setItem('weight', weight);
                    break;
                case 'age':
                    age = +input.value;
                    localStorage.setItem('age', age);
                    break;
            }
            calcTotal();
        });
    }

    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard {
        constructor(srcImg, alt, title, descr, price, parentSelector, ...classes) {
            this.srcImg = srcImg;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const card = document.createElement("div");
            if (this.classes.length === 0) {
                card.classList.add("menu__item");
            } else {
                this.classes.forEach((currentClass) =>
                    card.classList.add(currentClass)
                );
            }
            card.innerHTML = `
      <img src="${this.srcImg}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
            this.parent.append(card);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResoursesAsync)("http://localhost:3000/menu")
        .then(cards => cards.forEach(
            card => new MenuCard(
                card.img,
                card.altimg,
                card.title,
                card.descr,
                card.price,
                ".menu .container",
            ).render()
        ));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/carousel.js":
/*!********************************!*\
  !*** ./js/modules/carousel.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");

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
    carousel.currentSlideCounter.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(carousel.currentIndex + 1);
    carousel.totalSlidesCounter.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(carousel.slides.length);

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
        carousel.currentSlideCounter.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(carousel.currentIndex + 1);
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
        carousel.currentSlideCounter.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(carousel.currentIndex--);
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
            carousel.currentSlideCounter.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(carousel.currentIndex--);
            activateDot();
        }
    });
    carousel.slider.append(dotsWrapper);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (carousel);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро наш менеджер с Вами свяжется.",
        failure: "Что-то пошло не так",
    };
    forms.forEach((form) => bindPostData(form));

    function bindPostData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // Setting notify messages
            let statusMessage = document.createElement("img");
            statusMessage.classList.add("status");
            statusMessage.src = message.loading;
            statusMessage.alt = "loading";
            form.insertAdjacentElement("afterend", statusMessage);

            // Retrieve data from forms
            const formData = new FormData(form);
            const formsJson = JSON.stringify(Object.fromEntries(formData.entries()));

            // Making POST request
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postDataAsync)("http://localhost:3000/requests", formsJson)
                .then((response) => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => form.reset());
        });
    }

    function showThanksModal(message) {
        const modal = document.querySelector(".modal__dialog");
        modal.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(".modal", modalTimerId);

        const thanksContent = document.createElement("div");
        thanksContent.classList.add("modal__dialog");
        thanksContent.innerHTML = `
      <div class="modal__content">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
      </div>
    `;
        document.querySelector(".modal").append(thanksContent);

        // It doesn't work cause a page reloads (and I don't know why);
        setTimeout(() => {
            thanksContent.remove();
            modal.classList.remove("hide");
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
        }, 4 * 1000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("modal_showed");
    document.body.classList.add("body_overflow-restriction");
    clearInterval(modalTimerId);
    window.removeEventListener(
        "scroll",
        showModalByScroll
    );
};

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove("modal_showed");
    modal.classList.add("hide");
    document.body.classList.remove("body_overflow-restriction");
}

function showModalByScroll(modalSelector, modalTimerId) {
    if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
    ) {
        showModal(modalSelector, modalTimerId);
    }
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
        modalTriggers = document.querySelectorAll(triggerSelector);

    modalTriggers.forEach((btn) =>
        btn.addEventListener("click", () => showModal(modalSelector, modalTimerId))
    );
    modal.addEventListener("click", (event) => {
        if (
            event.target === modal ||
            event.target.getAttribute("data-close") == ""
        ) {
            closeModal(modalSelector);
            window.removeEventListener(
                "scroll",
                showModalByScroll
            );
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.code === "Escape" &&
            modal.classList.contains("modal_showed")
        ) {
            closeModal(modalSelector);
        }
    });

    window.addEventListener("scroll", () => showModalByScroll(modalSelector, modalTimerId));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabContent = document.querySelectorAll(tabsContentSelector),
        tabNav = document.querySelector(tabsParentSelector),
        tabItems = document.querySelectorAll(tabsSelector);

    function hideTabContent() {
        tabItems.forEach((item) => {
            item.classList.remove(activeClass);
        });
        tabContent.forEach((item) => {
            item.classList.add("tabcontent_hide");
        });
    };
    function showTabContent(index = 0) {
        tabItems[index].classList.add(activeClass);
        tabContent[index].classList.remove("tabcontent_hide");
    };
    hideTabContent();
    showTabContent();

    tabNav.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains(tabsSelector.slice(1)) && target) {
            tabItems.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    }
    return num;
}

function timer(timerSelector, deadline) {
    const timerController = {
        getTimeRemaining: (endtime) => {
            let days, hours, minutes, seconds;
            // Get the difference between deadline and current date
            const t = Date.parse(endtime) - new Date();
            if (t <= 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24));
                hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                minutes = Math.floor((t / 1000 / 60) % 60);
                seconds = Math.floor((t / 1000) % 60);
            }

            return {
                total: t,
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            };
        },
        setClock: (selector, endtime) => {
            const timer = document.querySelector(selector),
                days = timer.querySelector("#days"),
                hours = timer.querySelector("#hours"),
                minutes = timer.querySelector("#minutes"),
                seconds = timer.querySelector("#seconds"),
                timerInterval = setInterval(updateClock, 1000);

            // Initializing the timer in order to not wait 1 sec
            updateClock();

            function updateClock() {
                const t = timerController.getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timerInterval);
                }
            }
        },
    };

    timerController.setClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResoursesAsync": () => (/* binding */ getResoursesAsync),
/* harmony export */   "postDataAsync": () => (/* binding */ postDataAsync)
/* harmony export */ });
const postDataAsync = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });
    return await response.json();
};
const getResoursesAsync = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    return await response.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/carousel */ "./js/modules/carousel.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");









document.addEventListener("DOMContentLoaded", () => {
  // Show modal in 60 sec.
  const modalTimerId = setInterval(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(".modal", modalTimerId), 60000);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])(".timer", "2023-05-20");
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_carousel__WEBPACK_IMPORTED_MODULE_3__["default"])({
    slidesSelector: '.offer__slide',
    sliderSelector: '.offer__slider',
    currentCounterSelector: '#current',
    totalCounterSelector: '#total',
    nextBtnSelector: '.offer__slider-next',
    prevBtnSelector: '.offer__slider-prev',
    fieldSelector: '.offer__slider-inner',
    wrapper: '.offer__slider-wrapper'
  });
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimerId);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map