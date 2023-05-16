import { showModal } from './modules/modal';
import timer from './modules/timer';
import tabs from './modules/tabs';
import carousel from './modules/carousel';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calculator from './modules/calculator';

document.addEventListener("DOMContentLoaded", () => {
  // Show modal in 60 sec.
  const modalTimerId = setInterval(() => showModal(".modal", modalTimerId), 60000);
  timer(".timer", "2023-05-20");
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  carousel({
    slidesSelector: '.offer__slide',
    sliderSelector: '.offer__slider',
    currentCounterSelector: '#current',
    totalCounterSelector: '#total',
    nextBtnSelector: '.offer__slider-next',
    prevBtnSelector: '.offer__slider-prev',
    fieldSelector: '.offer__slider-inner',
    wrapper: '.offer__slider-wrapper'
  });
  modal("[data-modal]", ".modal", modalTimerId);
  forms("form", modalTimerId);
  cards();
  calculator();
});