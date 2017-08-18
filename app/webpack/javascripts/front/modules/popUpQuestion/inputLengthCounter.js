import {
  maxLengthInput,
  maxLengthCounter,
  titleError
} from './nodes';
import { hasAtLeastChars, declOfNum } from 'utils'; // Склонятор
const count         = declOfNum()(['cимвол', 'cимвола', 'cимволов']);

export default () => {
  let maxlength = 147;
  maxLengthInput.setAttribute('maxlength', maxlength);
  maxLengthCounter.innerText = `Можно ввести ${maxlength} ${count(maxlength)}`;
  maxLengthInput.addEventListener('keyup', (e) => {
    if (e.target.classList.contains('_editor-error')) {
      e.target.classList.remove('_editor-error');
      e.target.classList.add('_editor-ok');
    }

    let lengthSymbols   = e.target.value.length;
    let remainedSymbols = maxlength - lengthSymbols;

    maxLengthCounter.innerText = `Осталось ${remainedSymbols} ${count(remainedSymbols)}`;

    if (lengthSymbols === 0 || !hasAtLeastChars(e.target.value, 4)) {
      e.target.classList.add('_editor-error');
      e.target.classList.remove('_editor-ok');

      titleError.classList.remove('_hidden');
      maxLengthCounter.classList.add('_hidden');

      maxLengthCounter.innerText = `Можно ввести ${maxlength} ${count(maxlength)}`;
    } else {
      maxLengthCounter.classList.remove('_hidden');
      titleError.classList.add('_hidden');
    }
  });
};
