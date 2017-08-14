const { fetchAutToken, qs } = require('utils');
const validationForm = require('./validationForm');

module.exports = (nodes, ed) => {
// Забераем контент из текстового редактора
  let objValue = {
    title: nodes.inputQuestion.value,
    body: tinymce.activeEditor.getContent(),
    tags: nodes.selectQuestion.getAttribute('value'),
    url: nodes.questionForm.getAttribute('action')
  };

  let { title, body, tags, url} = objValue;
  let imageIds = tinymce.activeEditor.uploadedImageIds;

  // Проверка на содержимое формы, все поля должны быть заполнены
  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: {
        title,
        body,
        tag_ids: (tags || '').split(','),
        image_ids: imageIds
      }
    })
  };

  nodes.sendQuestion.setAttribute('disabled', 'disabled');

  fetchAutToken(params)
    .then( params => fetch(url, params))
    .then(response => {
      let { status } = response;
      let json = response.json();

      if (status >= 200 && status < 300) {
        return json;
      } else {
        return json.then(responseErrors => {
          let error = new Error(status);
          error.errors = responseErrors;
          throw error;
        });
      }
    })
    .then(json => {
      if (!json) return;

      if (window.ga && window.yaCounter44184904 && window.yaCounter44184924) {
        ga('set', 'page', '/forma_zadat_vopros');
        yaCounter44184904.hit('/forma_zadat_vopros');
        yaCounter44184924.hit('/forma_zadat_vopros');
        yaCounter44184924.reachGoal('click_send_issue_pop-up_auth');
      }
      // Перебрасываем пользователя на созданую страницу с вопросом
      delete tinymce.activeEditor.uploadedImageIds;
      delete localStorage['formQuestion']; // Удаляем из стора сохраненые данные из формы
      window.location = json.url;
    })
    .catch(error => {

      switch (error.message) {

        case '422' || '500':
          validationForm(nodes);
          nodes.sendQuestion.removeAttribute('disabled');
          break;

        case '401':
          if (window.yaCounter44184924) yaCounter44184924.reachGoal('click_send_issue_pop-up_no_auth');
          qs('.rambler-topline__user-signin').click();
          nodes.sendQuestion.removeAttribute('disabled');
          validationForm(nodes);
          ramblerIdHelper.registerOnPossibleLoginCallback(() => validationForm(nodes));

          // Сохраняем форму в локальный стор, если усер не зарегестрирован, для сохранени если он уйдет на регистрацию
          let objQuestion = JSON.stringify(objValue);
          localStorage.setItem('formQuestion', objQuestion);
          break;
      }
    });
};
