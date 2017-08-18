import {
  maxLengthCounterSelect,
  tagIdsError,
} from './nodes';
import selectLengthCounter from './selectLengthCounter';
import { declOfNum, fetchAutToken } from 'utils'; // Склонятор
const count = declOfNum()(['тема', 'темы', 'тем']);

// Выбираем нужные плагены из jquery UI
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/sortable';

import 'selectize';

export default () => {
  // Максимальное колличество тегов
  let maxTag     = 10;
  let $selectTag = $('.js-select-tag');
  // Конфиг для selectize
  let options = {
    plugins: ['remove_button', 'drag_drop'],
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    create: false,
    maxItems: maxTag,
    // Событие при добавление тега
    onChange(arrVal) {
      selectLengthCounter(arrVal, maxTag);
      $selectTag.attr('value', arrVal);

      let element = $selectTag.next().children('.selectize-input');

      if (arrVal.length > 0) {
        if (element.hasClass('_editor-error')) {
          element.removeClass('_editor-error');
          element.addClass('_editor-ok');
          tagIdsError.classList.add('_hidden');
          maxLengthCounterSelect.classList.remove('_hidden');
        }
      } else {
        element.removeClass('_editor-ok');
        element.addClass('_editor-error');
        tagIdsError.classList.remove('_hidden');
        maxLengthCounterSelect.classList.add('_hidden');
      }
    },
    render: {
      option(tags) {
        let { id, name } = tags;
        return `<div id="${id}" class="option" data-selectable="" data-value="">${name}</div>`;
      }
    },
    load(query, callback) {
      if (!query.length) return callback();
      $.ajax({
        url: '/tags/search/' + encodeURIComponent(query),
        type: 'GET',
        error() {
          callback();
        },
        success(data) {
          callback(data);
        }
      });
    }
  };
  // Текст по умолчанию при входе
  $('.js-max-length-counter-select').text(`Можно добавить ${maxTag} ${count(maxTag)}`);

  // Создаем selectize
  let $selectState = $selectTag.selectize(options);
  let selectState = $selectState[0].selectize;

  selectState.clear();
  selectState.clearOptions();

  selectState.load((callback) => {
    fetchAutToken({})
      .then( (params) => fetch('/tags/options', params))
      .then( (response) => response.json() )
      .then( (options) => { callback(options) } )
  })

  // При закрытии формы, отчищаем теги
  $('.js-close-pop-up-ques').on('click', () => selectState.clear());
};
