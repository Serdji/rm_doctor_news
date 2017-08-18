import configDesktopAds from './configDesktopAds';
import {qs} from 'utils';

export default  (el, index) => {
  let html = `<div id="context_${index}"></div>`;
  el.insertAdjacentHTML('afterEnd', html);
  if (qs('.js-news-card-page')) Adf.banner.sspScroll(`context_${index}`, configDesktopAds[`contextDC${index}`].p, configDesktopAds[`contextDC${index}`].id);
  else Adf.banner.sspScroll(`context_${index}`, configDesktopAds.context.p, configDesktopAds.context.id);
};
