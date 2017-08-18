import * as nodesAnswer from './nodesAnswer';
import * as nodesQuestion from './nodesQuestion';
import { qs, qsa }   from 'utils';
import tinymce       from 'tinymce';
import dataPublished from 'dataPublished';
import quantityAnswers from './quantityAnswers';
import config from './config';
import loginCallback from './loginCallback';
import fetchCurrentUser from './fetchCurrentUser';

fetchCurrentUser();

// ============== Плагины для TinyMCE =============== //

  // Русифицируем TinyMCE
  import 'tinymceExtensions/langs/ru';
  // Добавляем плагин математике
  // import 'tinymceExtensions/plugins/asciimath4';
  // Подключаем плагин плейсхолдера
  import 'tinymceExtensions/plugins/placeholder';

  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/image';
  import 'tinymce/plugins/autoresize';
  import 'tinymce/themes/modern/theme';

// ================================================= //

dataPublished(qsa('.js-data-published'));

if (qs('.js-editor-your-answer')) {
  // Подсчет ответов
  Object.assign(nodesAnswer, {'answerTemplate':  _.template(qs('.js-answer-template').innerHTML)});
  quantityAnswers(nodesAnswer);
  // Вызов TinyMCE
  tinymce.init(config('.js-editor-your-answer', nodesAnswer));
}

if (qs('.js-editor-quantity')) {
  // Вызов TinyMCE
  tinymce.init(config('.js-editor-quantity', nodesQuestion));

  setTimeout(()=> loginCallback(), 3000);
}
