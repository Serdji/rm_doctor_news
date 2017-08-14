const { qs, fetchAutToken } = require('utils');

const fileName = 'image-file-upload';

module.exports = (cb, value, meta) => {
  let input = document.getElementsByName(fileName)[0];

  if (!input) {
    input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('name', 'image-file-upload');

    // document.body.appendChild(input);
  }

  input.onclick = function() {
    this.value = null;
  };

  let onchange = function() {
    let file = this.files[0];

    let formData = new FormData();
    formData.append('image', file);

    // Передаем параметры
    let params = {
      method: 'POST',
      body: formData
    };

    fetchAutToken(params)
      .then( params => fetch('/upload_image', params))
      .then( response => {
        let { status, statusText } = response;
        if (status >= 200 && status < 300) {
          return response.json();
        } else {
          throw new Error(statusText);
        }
      })
      .then(json => {
        let editor = tinymce.activeEditor;

        // Выводим рядом с кнопкой название картинки
        if(qs('.js-img-file-name')) qs('.js-img-file-name').remove();
        qs('.mce-combobox .mce-btn').insertAdjacentHTML('afterEnd', `<span class="_ok js-img-file-name">${file.name}</span>`);

        editor.uploadedImageIds || (editor.uploadedImageIds = []);
        editor.uploadedImageIds.push(json.id);
        cb(json.url, { title: file.name });
      })
      .catch(error => {
        console.log(error);

        // Выводим сообщение в случаи ошибки
        if(qs('.js-img-file-name')) qs('.js-img-file-name').remove();
        qs('.mce-combobox .mce-btn').insertAdjacentHTML('afterEnd', '<span class="_error js-img-file-name">Произошла ошибка, попробуйте еще раз</span>');

      });
  };

  input.addEventListener('change', onchange);

  input.click();
};
