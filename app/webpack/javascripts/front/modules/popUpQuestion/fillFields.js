import {input} from './nodes';
import { qs } from 'utils';

export default () => {
  let selectTag = qs('.js-select-tag');

  // Проверяем стор на наличие данных, если они есть, выводим их в форму
  if(localStorage.formQuestion) {
    setTimeout(()=> {
      let formQuestion = JSON.parse(localStorage.getItem('formQuestion'));
      let { body, title, tags } = formQuestion;
      tinymce.get('ditor-quantity').setContent(body);
      selectTag.selectize.setValue((tags || '').split(','));
      input.value = title;
    }, 0);
  }
};
