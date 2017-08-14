const { qs }            = require('utils');
const statisticsMetrika = require('./statisticsMetrika');

setTimeout(() => {
  if (window.yaCounter44184924) {
    let nodes = {
      search: qs('.js-search'),
      newsMainPage: qs('.js-news-main-page'),
      newsCardPage: qs('.js-news-card-page'),
      questionAskQuestion: qs('.js-question-ask-question'),
      questionAskTag: qs('.js-question-ask-tag')
    };

    statisticsMetrika(nodes);
  }
}, 1000);
