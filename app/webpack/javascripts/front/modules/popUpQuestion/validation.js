const { hasAtLeastChars } = require('utils');
module.exports = (nodes) => {
  let isValid = true;

  let titleElement = nodes.questionForm['question[title]'];
  let titleLength = titleElement.value.length;

  if (titleLength === 0 || !hasAtLeastChars(titleElement.value, 4)) {
    titleElement.classList.add('_editor-error');
    titleElement.classList.remove('_editor-ok');

    nodes.titleLength.classList.add('_hidden');
    nodes.titleError.classList.remove('_hidden');
    isValid = false
  } else {
    nodes.titleLength.classList.remove('_hidden');
    nodes.titleError.classList.add('_hidden');
  }
};