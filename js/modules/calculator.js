function calculator() {
    const calories = document.querySelector('.calculating__result span');
    let sex, ratio, height, weight, age;

    if (localStorage.getItem('sex'))
        sex = localStorage.getItem('sex');
    else
        sex = document.querySelector('#gender .calculating__choose-item_active').getAttribute('id');

    if (localStorage.getItem('ratio'))
        ratio = localStorage.getItem('ratio');
    else
        ratio = +document.querySelector('.calculating__choose_big .calculating__choose-item_active').getAttribute('data-ratio');

    if (localStorage.getItem('height')) {
        height = +localStorage.getItem('height');
        document.querySelector('#height').value = height;
    }

    if (localStorage.getItem('weight')) {
        weight = +localStorage.getItem('weight');
        document.querySelector('#weight').value = weight;
    }

    if (localStorage.getItem('age')) {
        age = +localStorage.getItem('age');
        document.querySelector('#age').value = age;
    }


    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(`${selector} div`);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');
    initLocalSettings('#gender', 'calculating__choose-item_active');

    function calcTotal() {
        let result = 0;
        if (!sex || !height || !weight || !age || !ratio) {
            calories.textContent = result;
            return;
        }
        if (sex == 'male') {
            result = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        } else {
            result = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        }
        calories.textContent = Math.round(result * 100) / 100;
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        elements.forEach(elem => elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }
            elements.forEach(el => {
                el.classList.remove(activeClass);
            })
            e.target.classList.add(activeClass);
            calcTotal();
        }));
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.trim().match(/\D/g)) {
                input.classList.add('calculating__choose-item_error');
                return;
            } else {
                input.classList.remove('calculating__choose-item_error');
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    localStorage.setItem('height', height);
                    break;
                case 'weight':
                    weight = +input.value;
                    localStorage.setItem('weight', weight);
                    break;
                case 'age':
                    age = +input.value;
                    localStorage.setItem('age', age);
                    break;
            }
            calcTotal();
        });
    }

    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}