import { qs, qsa, each }  from 'utils';
import InjectorAds    from './InjectorAds';
import callAds        from './callAds';
import sidebarIsAds   from './sidebarIsAds';
import cloneTheme     from './cloneTheme';
import removeQues     from './removeQues';
import sponsoredAds   from './sponsoredAds';
import contentBanners from 'rds-content-banners';
import CONFARTDESK    from './articleDesktopAds';
import CONFARTTABLET  from './articleTabletAds';
import CONFDESK       from './configDesktopAds';
import CONFTABLET     from './configTabletAds';
import switch240x200  from './switch240x200';





if (window.innerWidth > 1024 || qs('.js-page-ques-answers')) { // рекламма на декстопе
  // Если включин AddBlock
  sidebarIsAds();
  //Рекламма 240х200
  switch240x200();

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


