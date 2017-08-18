import {
  buttonClose,
  popUpQuestion,
  maxLengthCounter,
  maxLengthCounterSelect,
  titleError,
  tagIdsError
} from './nodes';
import { fetchAutToken } from 'utils';

export default () => {
  buttonClose.addEventListener('click', close);

  function close() {
    delete localStorage['formQuestion']; // Удаляем из стора сохраненые данные из формы
    popUpQuestion.classList.remove('_activ');
    setTimeout(()=>  hideErrors(), 100);
    document.body.removeAttribute('style'); // удаляем атрибут style у body
    document.body.classList.remove('_off-scroll'); // Включаем скрол у body

    let params = { method: 'POST'};
    // Проверяем пользователь авторизован или нет
    fetchAutToken(params)
      .then( params => fetch('/profile', params))
      .then(response => {
        let { status } = response;
        // Проверям статус если пользователь не авторихован
        switch (status) {
          case 401: yaCounter44184924.reachGoal('click_cross_pop-up_no_auth'); break;
          default: yaCounter44184924.reachGoal('click_cross_pop-up_auth');
        }
      });
  }

  function hideErrors() {
    titleError.classList.add('_hidden');
    maxLengthCounter.classList.remove('_hidden');

    tagIdsError.classList.add('_hidden');
    maxLengthCounterSelect.classList.remove('_hidden');
  }
};
