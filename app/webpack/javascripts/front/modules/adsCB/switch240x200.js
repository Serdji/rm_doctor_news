import { qs }       from 'utils';
import CONFDESK     from './configDesktopAds';
import callAds      from './callAds';
import autoScroll   from '../socialButton/autoScroll';
import sidebarIsAds from './sidebarIsAds';


let height240x400 = false;

export default () => {
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
};
