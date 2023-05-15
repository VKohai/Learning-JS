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
  timer();
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  carousel();
  modal("[data-modal]", ".modal", modalTimerId);
  forms("form", modalTimerId);
  cards();
  calculator();
});