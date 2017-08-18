import {
  buttonOpen,
  complaintForm,
  popUpComplaint,
  popUpQuestion
} from './nodes';
import { qs, fetchAutToken} from 'utils';

export default () => {
  for( let el of buttonOpen) el.addEventListener('click', open);

  //  Функция открытия самого попапа
  function openPopUp(self) {
    // Ищим родителя по css силектору
    let complainable = self.closest('[data-complainable="true"]');
    // Собираем данные с формы
    let complainableId = complainable.dataset.complainableId;
    let complainableType = complainable.dataset.complainableType;
    // Добавляем данные
    complaintForm.elements['complaint[complainable_id]'].value = complainableId;
    complaintForm.elements['complaint[complainable_type]'].value = complainableType;

    popUpComplaint.classList.add('_activ');
    // Задаем body margin-right на ширину скрола
    document.body.style.marginRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.classList.add('_off-scroll'); // Отключаем скрол у body
  }

  // Отрыть попап только при уловии
  function open(e) {
    e.preventDefault();

    let params = { method: 'POST'};
    // Отправляем запрос на сервер с целью узнать, пользователь зарегестрирован или нет
    fetchAutToken(params)
      .then( params => fetch('/profile', params))
      .then( response => {
        // Если ОК, открываем попап
        let { status } = response;
        if (status >= 200 && status < 300) {
          openPopUp(this);
        } else {
          throw new Error(status);
        }
      })
      .catch(error => {
        // Если нет, то открываем форму аунтификации и регистрации
        if (error.message === '401') {
          qs('.rambler-topline__user-signin').click();
          // Колбек, после аунтификации открываем форму пожалолваться
          ramblerIdHelper.registerOnPossibleLoginCallback(() => {
            // Проверка на то, открыт ли поп-оп задать вопрос
            if (!popUpQuestion.classList.contains('_activ')) openPopUp(this);
          });
        }
      });
  }
};
