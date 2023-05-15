function tabs() {
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
}

module.exports = tabs;