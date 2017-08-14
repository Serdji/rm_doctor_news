const { qsa, qs, each }    = require('utils');
const InjectorAds          = require('./InjectorAds');
const callAds              = require('./callAds');
const sidebarIsAds         = require('./sidebarIsAds');
const autoScroll           = require('../socialButton/autoScroll');
const cloneTheme           = require('./cloneTheme');
const removeQues           = require('./removeQues');
const sponsoredAds         = require('./sponsoredAds');
const contentBanners       = require('rds-content-banners');
const CONFARTDESK          = require('./articleDesktopAds');
const CONFARTTABLET        = require('./articleTabletAds');
const CONFDESK             = require('./configDesktopAds');
const CONFTABLET           = require('./configTabletAds');
let height240x400          = false;



let nodes = {
  banerSideba: qsa('.js-baner-sidebar'),
  questionsAds: qsa('.js-questions-ads'),
  searchItemAds: qsa('.js-search-item-ads'),
  tagAds: qsa('.js-tag-ads'),
  searchPagAds: qs('.js-search-pag-ads'),
  temyPagAds: qs('.js-temy-pag-ads'),
  rootPagAds: qs('.js-root-pag-ads'),
  similarThemesAds: qs('.js-similar-themes-ads'),
  rightSidebar: qs('.js-right-sidebar'),
  lastBigTheme: qs('.js-last-big-theme'),
  miniTheme: qsa('.js-mini-theme'),
  collection: qs('.js-tags'),
  newsItems: qsa('.js-news-items-abs'),
  newsCardAds: qsa('.js-news-card-ads')
};


if (window.innerWidth > 1024 || qs('.js-page-ques-answers')) { // рекламма на декстопе
  // Если включин AddBlock
  sidebarIsAds(nodes);
  let test = 1;
  // Колбек отрабатывает после загрузке всей рекламмы
  Begun.Autocontext.Callbacks.register({
    block: {
      draw() {
        // каждые 500ms проверяем банеры
        let intId = setInterval(() => {
          sidebarIsAds(nodes);
          let ban240x400 = qs('#ban_240x400 div[id^="begun_block"]');
          if (!height240x400 && ban240x400) {
            height240x400 = ban240x400.clientHeight;
            if (height240x400 !== 0 && height240x400 <= 400) {
              callAds(CONFDESK.context_240x200);
            }
          }
        }, 500);
        // через 10 секунд перестаем проверять
        setTimeout(() => {
          clearInterval(intId);
        }, 10000);
        setTimeout(() => {
          autoScroll();
        }, 500);
      }
    },
  });


  InjectorAds(nodes);
  contentBanners(CONFARTDESK);
  callAds(CONFDESK.billboard);
  callAds(CONFDESK.ban_240x400);
  callAds(CONFDESK.ban_240x400_2nd);
  callAds(CONFDESK.superFooter);
  callAds(CONFDESK.native1).then(() => { cloneTheme(nodes); });
  callAds(CONFDESK.native2).then(() => { removeQues(); });
  callAds(CONFDESK.nativeFooter);
  callAds(CONFDESK.center);
  callAds(CONFDESK.parallax);
  callAds(CONFDESK.fullscreen);
  callAds(CONFDESK.context);
  callAds(CONFDESK.nativeContext);

} else { // Реклама для планшетов
  // Иньекчия портнерской рекламой со своим индексом
  each(qsa('.js-sponsored-ads'), (el, i) => {
    let index = i + 1;
    sponsoredAds(el, index);
  });
  contentBanners(CONFARTTABLET);
  callAds(CONFTABLET.top_banner);
  callAds(CONFTABLET.listing1);
  callAds(CONFTABLET.listing2);
  callAds(CONFTABLET.content2);
  callAds(CONFTABLET.content3);
  callAds(CONFTABLET.listing_spec);
  callAds(CONFTABLET.banFooter);
  callAds(CONFTABLET.rich);

}


