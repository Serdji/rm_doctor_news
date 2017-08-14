const { qs, qsa } = require('utils');

if (qs('.js-open-pop-up-ques')) {
  let nodes = {
    buttonOpen: qsa('.js-open-pop-up-ques'),
    buttonClose: qs('.js-close-pop-up-ques'),
    popUpQuestion: qs('.js-pop-up-question'),
    maxLengthInput: qs('.js-max-length-input'),
    maxLengthCounter: qs('.js-max-length-counter'),
    maxLengthCounterSelect: qs('.js-max-length-counter-select'),
    input: qs('.js-max-length-input'),
    select: qs('.js-select-tag'),
    titleError: qs('.pop-up-question__title-error'),
    tagIdsError: qs('.pop-up-question__tag-ids-error'),
    questionForm: qs('.js-question-form'),
    selectQuestion: qs('#question_tag_ids'),
    titleLength: qs('.js-max-length-counter')
  };
  require('./openPopUp')(nodes);
  require('./closePopUp')(nodes);
  require('./selectState')(nodes);
  require('./inputLengthCounter')(nodes);
}
