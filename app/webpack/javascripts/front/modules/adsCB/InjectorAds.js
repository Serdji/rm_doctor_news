const { each, qs, qsa }  = require('utils');
const contextAds         = require('./contextAds');
const newsBlockAds       = require('./newsBlockAds');
const sponsoredAds       = require('./sponsoredAds');

module.exports = (nodes) => {

  let superFooter = '<div id="superFooter"></div>';
  let native1     = '<div id="native1"></div>';
  let native2     = '<div id="native2"></div>';
  let context     = '<div class="js-context-ads"></div>';
  let newsBlock   = '<div class="js-news-block-ads"></div>';


  // Главной странице новостей, между новосными блоками
  if(qs('.js-news-main-page')){
      each(qsa('.js-news-items-abs'), (el, i) => {
        let index = i + 1;
        let order = window.innerWidth <= 1279 ? 3 : 1;
        switch (index) {
          case order:
            el.insertAdjacentHTML('afterEnd', newsBlock); break;
        }
      });
      // Иньекчия новосной рекламой со своим индексом
      each(qsa('.js-news-block-ads'), (el, i) => {
        let index = i + 1;
        // Иньецируем кроме предпоследний, что бы не были на одном экране
        newsBlockAds(el, index);
      });
    }
  //==================================================================================================


  // Странице детальной новости
  if(qs('.js-news-card-page')){
    each(nodes.newsCardAds, (el, i) => {
      let index = i + 1;
      switch (index) {
        case 1 : el.insertAdjacentHTML('afterEnd', context); break;
        case 2 : el.insertAdjacentHTML('afterEnd', context); break;
      }
    });
    // Иньекчия контекстной рекламой со своим индексом
    each(qsa('.js-context-ads'), (el, i) => {
      let index = i + 1;
      contextAds(el, index);
    });

    // Иньекчия портнерской рекламой со своим индексом
    each(qsa('.js-sponsored-ads'), (el, i) => {
      let index = i + 1;
      sponsoredAds(el, index);
    });
  }
  //==================================================================================================


  // Вопросы и ответы
  if(qs('.js-page-root')) {
    // Последний вопрос
    let lastQues = nodes.questionsAds[nodes.questionsAds.length - 1];
    each(nodes.questionsAds, (el, i) => {
      let index = i + 1;
      switch (index) {
        case 2  : el.insertAdjacentHTML('afterEnd', superFooter); break;
        case 6  : el.insertAdjacentHTML('afterEnd', native2);     break;
        case 10 : el.insertAdjacentHTML('afterEnd', context);     break;
        case 14 : el.insertAdjacentHTML('afterEnd', context);     break;
        case 18 : el.insertAdjacentHTML('afterEnd', context);     break;
      }
    });
    // Если последней пришла реклама, удеяем ее
    // if(lastQues.nextElementSibling) lastQues.nextElementSibling.remove();

    let superFooterNode     = document.getElementById('superFooter');
    let native2Node         = document.getElementById('native2');
    let superFooterNodeNext = superFooterNode ? superFooterNode.nextElementSibling : true;
    let native2NodeNext     = native2Node ? native2Node.nextElementSibling : true;

    // Иньецируем рекламу под пагинацие, тольк если native2 и superFooter пришили не последними
    if (superFooterNodeNext && native2NodeNext) nodes.rootPagAds.insertAdjacentHTML('afterEnd', context);

    // Иньекчия контекстной рекламой со своим индексом
    each(qsa('.js-context-ads'), (el, i) => {
      let index = i + 1;
      // Иньецируем кроме предпоследний, что бы не были на одном экране
      if ((qsa('.js-context-ads').length - 1) !== index) contextAds(el, index);
    });
  }
  //==================================================================================================


  // Страница тем
  if(qs('.js-page-temys-ads')) {
    each(nodes.tagAds, (el, i) => {
      let index = i + 1;
      switch (index) {
        case 1  : el.insertAdjacentHTML('afterEnd', native1);     break;
        case 6  : el.insertAdjacentHTML('afterEnd', superFooter); break;
        case 12 : el.insertAdjacentHTML('afterEnd', native2);     break;
        case 16 : el.insertAdjacentHTML('afterEnd', context);     break;
      }
    });
    // Иньекчия контекстной рекламой со своим индексом
    each(qsa('.js-context-ads'), (el, i) => {
      let index = i + 1;
      contextAds(el, index);
    });
  }
  //==================================================================================================

  // Карточка темы
  if(qs('.js-page-temy-ads')) {
    // Последний вопрос
    let lastQues = nodes.questionsAds[nodes.questionsAds.length - 1];
    each(nodes.questionsAds, (el, i) => {
      let index = i + 1;
      switch (index) {
        case 2  : el.insertAdjacentHTML('afterEnd', superFooter); break;
        case 6  : el.insertAdjacentHTML('afterEnd', native2);     break;
        case 10 : el.insertAdjacentHTML('afterEnd', context);     break;
        case 14 : el.insertAdjacentHTML('afterEnd', context);     break;
        case 18 : el.insertAdjacentHTML('afterEnd', context);     break;
      }
    });
    // Если последней пришла реклама, удеяем ее
    // if(lastQues.nextElementSibling) lastQues.nextElementSibling.remove();

    let superFooterNode     = document.getElementById('superFooter');
    let native2Node         = document.getElementById('native2');
    let superFooterNodeNext = superFooterNode ? superFooterNode.nextElementSibling : true;
    let native2NodeNext     = native2Node ? native2Node.nextElementSibling : true;

    // Иньецируем рекламу под пагинацие, тольк если native2 и superFooter пришили не последними
    if (superFooterNodeNext && native2NodeNext) nodes.temyPagAds.insertAdjacentHTML('afterEnd', context);

    // Иньекчия контекстной рекламой со своим индексом
    each(qsa('.js-context-ads'), (el, i) => {
      let index = i + 1;
      // Иньецируем кроме предпоследний, что бы не были на одном экране
      if ((qsa('.js-context-ads').length - 1) !== index) contextAds(el, index);
    });
  }
  //==================================================================================================

  // Карточка вопроса
  if(qs('.js-page-question-ads')){
    each(nodes.questionsAds, (el, i) => {
      let index = i + 1;
      switch (index) {
        case nodes.questionsAds.length : el.insertAdjacentHTML('afterEnd', context); break;
      }
    });
    // Иньекчия контекстной рекламой со своим индексом
    each(qsa('.js-context-ads'), (el, i) => {
      let index = i + 1;
      contextAds(el, index);
    });
  }
  //==================================================================================================

  // Страница поисковой выдачи
  if(qs('.js-search-page')) {
    if(!qs('.js-search-null-result')) { // Страници результатов
      if(qs('.js-search-item-ads')) { // Таб на ответы
        // Последний вопрос в выдачи
        let lastItem = nodes.searchItemAds[nodes.searchItemAds.length - 1];
        each(nodes.searchItemAds, (el, i) => {
          let index = i + 1;
          switch (index) {
            case 5  : el.insertAdjacentHTML('afterEnd', superFooter); break;
            case 9  : el.insertAdjacentHTML('afterEnd', native2);     break;
            case 13 : el.insertAdjacentHTML('afterEnd', context);     break;
            case 17 : el.insertAdjacentHTML('afterEnd', context);     break;
          }
        });
        // Если последней пришла реклама, удеяем ее
        // if(lastItem.nextElementSibling) lastItem.nextElementSibling.remove();

        let superFooterNode     = document.getElementById('superFooter');
        let native2Node         = document.getElementById('native2');
        let superFooterNodeNext = superFooterNode ? superFooterNode.nextElementSibling : true;
        let native2NodeNext     = native2Node ? native2Node.nextElementSibling : true;

        // Иньецируем рекламу под пагинацие, тольк если native2 и superFooter пришили не последними
        if (superFooterNodeNext && native2NodeNext) nodes.searchPagAds.insertAdjacentHTML('afterEnd', context);

        // Иньекчия контекстной рекламой со своим индексом
        each(qsa('.js-context-ads'), (el, i) => {
          let index = i + 1;
          // Иньецируем кроме предпоследний, что бы не были на одном экране
          if ((qsa('.js-context-ads').length - 1) !== index) contextAds(el, index);
        });
      }
      if(qs('.js-tag-ads')) { // Таб на темы
        each(nodes.tagAds, (el, i) => {
          let index = i + 1;
          switch (index) {
            case 6  : el.insertAdjacentHTML('afterEnd', superFooter); break;
            case 12 : el.insertAdjacentHTML('afterEnd', native2);     break;
            case 15 : el.insertAdjacentHTML('afterEnd', context);     break;
          }
        });
        // Иньекчия контекстной рекламой со своим индексом
        each(qsa('.js-context-ads'), (el, i) => {
          let index = i + 1;
          contextAds(el, index);
        });
      }
    } else { // Страница нулевой выдочи
      if(qs('.js-questions-ads')) { // Таб ответов
        each(nodes.questionsAds, (el, i) => {
          let index = i + 1;
          switch (index) {
            case 2 : el.insertAdjacentHTML('afterEnd', superFooter); break;
            case 4 : el.insertAdjacentHTML('afterEnd', native2);     break;
            case 6 : el.insertAdjacentHTML('afterEnd', context);     break;
          }
        });
        // Иньекчия контекстной рекламой со своим индексом
        each(qsa('.js-context-ads'), (el, i) => {
          let index = i + 1;
          contextAds(el, index);
        });
      }
      if(qs('.js-tag-ads')) { // Таб на темы
        each(nodes.tagAds, (el, i) => {
          let index = i + 1;
          switch (index) {
            case 3  : el.insertAdjacentHTML('afterEnd', superFooter); break;
            case 6  : el.insertAdjacentHTML('afterEnd', native2);     break;
            case 9  : el.insertAdjacentHTML('afterEnd', context);     break;
            case 12 : el.insertAdjacentHTML('afterEnd', context);     break;
          }
        });
        // Иньекчия контекстной рекламой со своим индексом
        each(qsa('.js-context-ads'), (el, i) => {
          let index = i + 1;
          contextAds(el, index);
        });
      }
    }
  }
};
