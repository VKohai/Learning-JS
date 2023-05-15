function card() {
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
        ));
}

module.exports = card;