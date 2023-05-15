function modal() {
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
}

module.exports = modal;