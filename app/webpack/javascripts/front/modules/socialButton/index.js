import {qs, qsa} from 'utils';
import openShare from './openShare';
import autoScroll from './autoScroll';
import ramblerShare from './ramblerShare';

export default () => {
  if (qs('.js-open-share')) {
    let script = document.createElement('script');
    // Добавляем CDN шарилок с нашим скриптом
    script.onload = ramblerShare();
    script.async  = true;
    script.src    = 'https://developers.rambler.ru/likes/widget.js';
    document.head.appendChild(script);
    openShare();
    autoScroll();
  }
};
