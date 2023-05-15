function forms() {
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
}

module.exports = forms;