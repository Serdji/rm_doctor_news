import { qsa, qs, each } from 'utils';
import InjectorAds       from './InjectorAds';
import callAds           from './callAds';
import sidebarIsAds      from './sidebarIsAds';
import autoScroll        from '../socialButton/autoScroll';
import cloneTheme        from './cloneTheme';
import removeQues        from './removeQues';
import sponsoredAds      from './sponsoredAds';
import contentBanners    from 'rds-content-banners';
import CONFARTDESK       from './articleDesktopAds';
import CONFARTTABLET     from './articleTabletAds';
import CONFDESK          from './configDesktopAds';
import CONFTABLET        from './configTabletAds';

let height240x400        = false;



if (window.innerWidth > 1024 || qs('.js-page-ques-answers')) { // рекламма на декстопе
  // Если включин AddBlock
  sidebarIsAds();
  let test = 1;
  // Колбек отрабатывает после загрузке всей рекламмы
  Begun.Autocontext.Callbacks.register({
    block: {
      draw() {
        // каждые 500ms проверяем банеры
        let intId = setInterval(() => {
          sidebarIsAds();
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


  InjectorAds();
  contentBanners(CONFARTDESK);
  callAds(CONFDESK.billboard);
  callAds(CONFDESK.ban_240x400);
  callAds(CONFDESK.ban_240x400_2nd);
  callAds(CONFDESK.superFooter);
  callAds(CONFDESK.native1).then(() => { cloneTheme(); });
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


