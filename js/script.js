document.addEventListener("DOMContentLoaded", () => {
  const timer = require('./modules/timer'),
    tabs = require('./modules/tabs'),
    carousel = require('./modules/carousel'),
    modal = require('./modules/modal'),
    forms = require('./modules/forms'),
    cards = require('./modules/cards'),
    calculator = require('./modules/calculator');
  timer();
  tabs();
  carousel();
  modal();
  forms();
  cards();
  calculator();
});