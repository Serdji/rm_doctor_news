import {
  titleError,
  questionForm,
  titleCounter
} from './nodes';
import { hasAtLeastChars } from 'utils';
export default () => {

  let titleElement = questionForm['question[title]'];
  let titleLength = titleElement.value.length;

  if (titleLength === 0 || !hasAtLeastChars(titleElement.value, 4)) {
    titleElement.classList.add('_editor-error');
    titleElement.classList.remove('_editor-ok');

    titleCounter.classList.add('_hidden');
    titleError.classList.remove('_hidden');
  } else {
    titleCounter.classList.remove('_hidden');
    titleError.classList.add('_hidden');
  }
};