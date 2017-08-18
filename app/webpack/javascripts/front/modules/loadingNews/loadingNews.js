import {loadingNewsButton, loadingNewsColumn, loadingNewsWrapperColumn } from './nodes';
import dataPublished from 'dataPublished';
import { qs, qsa }   from 'utils';

export default () => {

  let limit     = 14;
  let firstLoad = true;

  loadingNewsButton.addEventListener('click', loading );

  dataPublished(qsa('.js-data-published-news'));

  function loading() {
    // Забераем у последний новости дату публикации
    let publishedDates = qsa('.js-data-published-news');
    let date           = publishedDates[publishedDates.length - 1].dataset.publishedDate;

    //если есть реклама то загружаем 17 новостей, иначе 18
    if (firstLoad && document.body.offsetWidth > 1024) {
        if (qs('#newsBlock_1').offsetHeight > 20) limit += 1;
        if (qs('#native1').offsetHeight > 20) limit += 2;
        firstLoad = false;
    }
    else limit = 18;

    // Вешаем троиточия загрузки
    this.classList.add('_loading-active');
    // Забераем у кнопми url
    let url = `/news/load_more.json?from=${date}&limit=${limit}`;
    // Шлем запрос на сервер
    fetch(url, { method: 'GET' })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          return response.json.then(responseErrors => {
            let error = new Error(response.status);
            error.errors = responseErrors;
            throw error;
          });
        }
      })
      .then((json) => {
        let { data, more } = json;
        // Если новй url не пришел, дезейблим кнопку
        if (!more) this.setAttribute('disabled', 'disabled');
        // Добавляем в конец левого и правого столбца отфильтрованые массивы с новостями
        loadingNewsColumn.insertAdjacentHTML('beforeEnd', data.join(' '));
        // Открыть колонку на высоту обертки
        let wrapperHeight = loadingNewsColumn.offsetHeight;
        loadingNewsWrapperColumn.style.cssText = `height: ${wrapperHeight}px`;
        // Убираем троиточие
        this.classList.remove('_loading-active');
        dataPublished(qsa('.js-data-published-news'));
      })
      .catch(error => {
        // При ошибки, дезейблем кнопку и убераем троеточие
        this.classList.remove('_loading-active');
        this.setAttribute('disabled', 'disabled');
      });
  }
};