import {
  buttonClose,
  buttonSend,
  complaintForm,
  complaintSuccess,
  popUpComplaint,
} from './nodes';
import { qsa } from 'utils';

export default () => {
  buttonClose.addEventListener('click', close);
  function close() {
    // Снимаем выдиление с форм
    for ( let el of qsa('.js-textarea-complaint')) el.classList.remove('_editor-error');
    for ( let el of qsa('.js-email-complaint')) el.classList.remove('_editor-error');

    popUpComplaint.classList.remove('_activ');

    // Удаляем инлайновые стили
    complaintForm.style.display = '';
    complaintSuccess.style.display = '';

    document.body.removeAttribute('style'); // удаляем атрибут style у body
    document.body.classList.remove('_off-scroll'); // Включаем скрол у body

    complaintForm.reset();
    buttonSend.removeAttribute('disabled');
  }
};
