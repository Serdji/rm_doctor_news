import {loadingNewsButton, loadingNewsColumn, loadingNewsWrapperColumn } from './nodes';
import dataPublished from 'dataPublished';
import { qs, qsa }   from 'utils';

export default () => {

  let limit     = 14;
  let firstLoad = true;

  loadingNewsButton.addEventListener('click', loading );

  dataPublished(qsa('.js-data-published-news[data-published-date]'));

  function loading() {
    let from, url;

    let freshNews = qsa('.js-data-published-news[data-fresh]')
    let restNews = qsa('.js-data-published-news[data-published-date]');

    if (restNews.length > 0) {
      from = restNews[restNews.length - 1].dataset.publishedDate;
    } else {
      from = freshNews.length;
    }

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
    if (restNews.length > 0) {
      url = `/news/load_more.json?from=${from}&limit=${limit}`;
    } else {
      url = `/news/load_more_fresh.json?from=${from}&limit=${limit}`;
    }
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
        let spaceBottomNewsCard = 14;
        loadingNewsWrapperColumn.style.cssText = `height: ${wrapperHeight - spaceBottomNewsCard}px`;
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
