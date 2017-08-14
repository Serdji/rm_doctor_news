const { each }   = require('utils');
const fillFields = require('./fillFields');
const validation = require('./validation');

module.exports = nodes => {
  each(nodes.buttonOpen, el => {
    el.addEventListener('click', open);
    function open() {
      if(el.closest('.js-present-question')){
        let questionInput = el.closest('.js-present-question').querySelector('.js-present-question-input');
        if(questionInput.value.length > 0 ){
          nodes.input.value = questionInput.value;
          validation(nodes);
        }
      }
      // Вписываем сохраненные данные пользователя, после его возврата полсе регистрации
      fillFields(nodes);
      nodes.popUpQuestion.classList.add('_activ');
      // Задаем body margin-right на ширину скрола
      document.body.style.marginRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      document.body.classList.add('_off-scroll'); // Отключаем скрол у body
    }
  });
};
