import {
  complaintForm,
  textarea,
  textareaCounter
} from './nodes';
import { declOfNum } from 'utils'; // Склонятор
const count = declOfNum()(['cимвол', 'cимвола', 'cимволов']);

export default () => {
  let lengthChecker = function() {
    let maxlength = 4000;
    let textareaLenght = textarea.value.length;
    let remainedTag = maxlength - textareaLenght;

    textarea.setAttribute('maxlength', maxlength);
    textareaCounter.innerText = `Осталось ${remainedTag} ${count(remainedTag)}`;
    if (this.value.length === 0) textareaCounter.innerText = `Можно ввести ${maxlength} ${count(maxlength)}`;

    if (this.value.length > 0) {
      this.classList.remove('_editor-error');
    } else {
      this.classList.add('_editor-error');
    }
  }
  
  let emailValidate = function() {
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(this.value)) {
      this.classList.remove('_editor-error');
    } else {
      this.classList.add('_editor-error');
    }
  }

  let body = complaintForm['complaint[body]'];
  let email = complaintForm['complaint[email]'];

  body.addEventListener('keyup', lengthChecker);
  email.addEventListener('keyup', emailValidate);
}
