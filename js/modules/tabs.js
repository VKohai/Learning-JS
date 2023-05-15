function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabsController = {
        tabContent: document.querySelectorAll(tabsContentSelector),
        tabNav: document.querySelector(tabsParentSelector),
        tabItems: document.querySelectorAll(tabsSelector),

        hideTabContent: () => {
            tabsController.tabItems.forEach((item) => {
                item.classList.remove(activeClass);
            });
            tabsController.tabContent.forEach((item) => {
                item.classList.add("tabcontent_hide");
            });
        },

        showTabContent: (index = 0) => {
            tabsController.tabItems[index].classList.add(activeClass);
            tabsController.tabContent[index].classList.remove("tabcontent_hide");
        },
    };

    tabsController.hideTabContent();
    tabsController.showTabContent();
    tabsController.tabNav.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains(tabsSelector) && target) {
            tabsController.tabItems.forEach((item, index) => {
                if (target == item) {
                    tabsController.hideTabContent();
                    tabsController.showTabContent(index);
                }
            });
        }
    });
}

export default tabs;