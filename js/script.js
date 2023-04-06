document.addEventListener("DOMContentLoaded", () => {
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
    getZero: (num) => {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      }
      return num;
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

        days.innerHTML = timerController.getZero(t.days);
        hours.innerHTML = timerController.getZero(t.hours);
        minutes.innerHTML = timerController.getZero(t.minutes);
        seconds.innerHTML = timerController.getZero(t.seconds);

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
    closeModalBtn: document.querySelector(".modal__close"),
    modalTriggers: document.querySelectorAll("[data-modal]"),
    showModal: () => {
      modalFormController.modal.classList.add("modal_showed");
      document.body.classList.add("body_overflow-restriction");
      clearInterval(modalTimerId);
      window.removeEventListener('scroll', modalFormController.showModalByScroll);
    },
    closeModal: () => {
      modalFormController.modal.classList.remove("modal_showed");
      document.body.classList.remove("body_overflow-restriction");
    },
    showModalByScroll: () => {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        modalFormController.showModal();
      }
    }
  };

  modalFormController.modalTriggers.forEach((btn) => btn.addEventListener("click", modalFormController.showModal));
  modalFormController.closeModalBtn.addEventListener("click", modalFormController.closeModal);
  modalFormController.modal.addEventListener("click", (event) => {
    if (event.target === modalFormController.modal) {
      modalFormController.closeModal();
      window.removeEventListener('scroll', modalFormController.showModalByScroll);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" &&
      modalFormController.modal.classList.contains("modal_showed")
    ) {
      modalFormController.closeModal();
    }
  });

  // Show modal in 5 sec.
  // const modalTimerId = setInterval(modalFormController.showModal, 5000);
  window.addEventListener('scroll', modalFormController.showModalByScroll);


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
      const card = document.createElement('div');
      if (this.classes.length === 0) {
        card.classList.add('menu__item');
      } else {
        this.classes.forEach(currentClass => card.classList.add(currentClass));
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

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Сбалансированное"',
    'Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.',
    3455666,
    ".menu .container",
    "menu__item", "big__ass"
  ).render();
});