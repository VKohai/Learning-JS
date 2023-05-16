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

export default modal;
export { showModal, closeModal };