import {
  buttonOpen,
  popUpQuestion,
  input
} from './nodes';
import fillFields from './fillFields';
import validation from './validation';

export default () => {
  for ( let el of buttonOpen ) {
    el.addEventListener('click', open);
    function open() {
      if(el.closest('.js-present-question')){
        let questionInput = el.closest('.js-present-question').querySelector('.js-present-question-input');
        if(questionInput.value.length > 0 ){
          input.value = questionInput.value;
          validation();
        }
      }
      // Вписываем сохраненные данные пользователя, после его возврата полсе регистрации
      fillFields();
      popUpQuestion.classList.add('_activ');
      // Задаем body margin-right на ширину скрола
      document.body.style.marginRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      document.body.classList.add('_off-scroll'); // Отключаем скрол у body
    }
  };
};
