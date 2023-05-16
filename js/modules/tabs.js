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

export default tabs;