document.addEventListener("DOMContentLoaded", () => {
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }
  // Tabs
  const tabsController = {
    tabContent: document.querySelectorAll(".tabcontent"),
    tabNav: document.querySelector(".tabheader__items"),
    tabItems: document.querySelectorAll(".tabheader__item"),

    hideTabContent: () => {
      tabsController.tabItems.forEach((item) => {
        item.classList.remove("tabheader__item_active");
      });
      tabsController.tabContent.forEach((item) => {
        item.classList.add("tabcontent_hide");
      });
    },

    showTabContent: (index = 0) => {
      tabsController.tabItems[index].classList.add("tabheader__item_active");
      tabsController.tabContent[index].classList.remove("tabcontent_hide");
    },
  };

  tabsController.hideTabContent();
  tabsController.showTabContent();
  tabsController.tabNav.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("tabheader__item") && target) {
      tabsController.tabItems.forEach((item, index) => {
        if (target == item) {
          tabsController.hideTabContent();
          tabsController.showTabContent(index);
        }
      });
    }
  });

  // Timer
  const deadline = "2023-05-20";
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

  timerController.setClock(".timer", deadline);

  // Modal form
  const modalFormController = {
    modal: document.querySelector(".modal"),
    modalTriggers: document.querySelectorAll("[data-modal]"),
    showModal: () => {
      modalFormController.modal.classList.add("modal_showed");
      document.body.classList.add("body_overflow-restriction");
      clearInterval(modalTimerId);
      window.removeEventListener(
        "scroll",
        modalFormController.showModalByScroll
      );
    },
    closeModal: () => {
      modalFormController.modal.classList.remove("modal_showed");
      modalFormController.modal.classList.add("hide");
      document.body.classList.remove("body_overflow-restriction");
    },
    showModalByScroll: () => {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        modalFormController.showModal();
      }
    },
  };

  modalFormController.modalTriggers.forEach((btn) =>
    btn.addEventListener("click", modalFormController.showModal)
  );
  modalFormController.modal.addEventListener("click", (event) => {
    if (
      event.target === modalFormController.modal ||
      event.target.getAttribute("data-close") == ""
    ) {
      modalFormController.closeModal();
      window.removeEventListener(
        "scroll",
        modalFormController.showModalByScroll
      );
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.code === "Escape" &&
      modalFormController.modal.classList.contains("modal_showed")
    ) {
      modalFormController.closeModal();
    }
  });

  // Show modal in 60 sec.
  const modalTimerId = setInterval(modalFormController.showModal, 60000);
  window.addEventListener("scroll", modalFormController.showModalByScroll);

  // Card class
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

  const getResoursesAsync = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    return await response.json();
  };

  getResoursesAsync("http://localhost:3000/menu")
    .then(cards => cards.forEach(
      card => new MenuCard(
        card.img,
        card.altimg,
        card.title,
        card.descr,
        card.price,
        ".menu .container",
      ).render()
    )
    );

  // Forms
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро наш менеджер с Вами свяжется.",
    failure: "Что-то пошло не так",
  };
  forms.forEach((form) => bindPostData(form));



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
      postDataAsync("http://localhost:3000/requests", formsJson)
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
    modalFormController.showModal();

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
      modalFormController.closeModal();
    }, 4 * 1000);
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
});
