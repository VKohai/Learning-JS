import { showModal, closeModal } from "./modal";
import { postDataAsync } from "../services/services";

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
        showModal(".modal", modalTimerId);

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
            closeModal(".modal");
        }, 4 * 1000);
    }
}

export default forms;