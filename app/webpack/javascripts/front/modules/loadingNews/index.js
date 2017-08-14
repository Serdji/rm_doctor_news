const { qs, qsa }       = require('utils');
const loadingNews       = require('./loadingNews');

if (qs('.js-loading-news-button')){
  let nodes = {
      loadingNewsButton: qs('.js-loading-news-button'),
      loadingNewsItems: qsa('.js-loading-news-items'),
      loadingNewsColumn: qs('.js-loading-news-column'),
      loadingNewsWrapperColumn: qs('.js-loading-wrapper-column')
  };
  loadingNews(nodes);
}