import {newsPage, newsCard, wrapper, leftSidebar, rightSidebar, firstColumnChild, lastColumnChild} from './nodes';
import { qs }      from 'utils';
import stickyBlock from 'stickyBlock';
import StickyBaner from 'stickyBaner';

export default () => {

  if ( qs('.js-float-wrapper')){


    // Прилипание на странице новостей
    if (newsPage){
      stickyBlock('.js-float-first-column-child', '.js-float-wrapper', false, 80);

      //Прилипание правых банеров
      // new StickyBaner({
      //   floatStartStop: qs('.js-float-start-stop'),
      //   floatAds: qs('.js-float-ad'),
      //   floatSidebar: qs('.js-float-sidebar'),
      //   floatWrapper: qs('.js-float-wrapper'),
      //   floatContent: qs('.js-float-content'),
      //   footer: qs('.js-float-footer'),
      //   spaceBannerbottom: 120
      // });
    }

    // На странице вопроса и карточки новости
    if (newsCard){
      stickyBlock('.js-float-first-column-child', '.js-float-wrapper', false, 80);

      //Прилипание правых банеров
      new StickyBaner( {
        floatStartStop: qs('.js-float-start-stop'),
        floatAds: qs('.js-float-ad'),
        floatSidebar: qs('.js-float-sidebar'),
        floatWrapper: qs('.js-float-wrapper'),
        floatContent: qs('.js-float-content'),
        footer: qs('footer'),
        spaceBannerbottom: 150
      });
    }

    // Прилипание на страницах вопросов и тем
    if (leftSidebar && rightSidebar) {
      let wrapperH      = wrapper.offsetHeight;
      let leftSidebarH  = leftSidebar.offsetHeight + parseInt(getComputedStyle(leftSidebar).marginBottom, 10);
      if ( wrapperH > leftSidebarH ) stickyBlock('.js-float-left-sidebar', '.js-float-wrapper', false, 60);

      //Прилипание правых банеров
      new StickyBaner( {
        floatStartStop: qs('.js-float-start-stop'),
        floatAds: qs('.js-float-ad'),
        floatSidebar: qs('.js-float-sidebar'),
        floatWrapper: qs('.js-float-wrapper'),
        floatContent: qs('.js-float-content'),
        footer: qs('footer'),
        spaceBannerbottom: 100
      });
    }

  }
};
