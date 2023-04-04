document.addEventListener("DOMContentLoaded", () => {

    // Tabs
    const tabsController = {
        tabContent: document.querySelectorAll(".tabcontent"),
        tabNav: document.querySelector(".tabheader__items"),
        tabItems: document.querySelectorAll(".tabheader__item"),

        hideTabContent: () => {
            tabsController.tabItems.forEach(item => {
                item.classList.remove("tabheader__item_active");
            });
            tabsController.tabContent.forEach(item => {
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
        if (target.classList.contains('tabheader__item') && target) {
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
                hours = Math.floor((t / (1000 * 60 * 60) % 24));
                minutes = Math.floor((t / 1000 / 60) % 60);
                seconds = Math.floor((t / 1000) % 60);
            }

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
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
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
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
        }
    };

    timerController.setClock('.timer', deadline);
});