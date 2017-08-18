import { banerSideba } from './nodes';
import { each }  from 'utils';

export default () => {
  for ( let el of banerSideba ) {
    let adsBlock     = el.querySelector('div[id^="begun_block"]');
    let isClassNativ = el.classList.contains('_native');
    if (isClassNativ) el.classList[!adsBlock ? 'add' : 'remove']('_hidden'); // Если у нейтива нет рекламмы не показывать его
    if (adsBlock) { // Проверяем естьли вообще рекламма в блоке
      let adsBlockHeight = adsBlock.offsetHeight;
      // Если высота рекламмы 0, скрываем весь блок
      adsBlock.closest('.js-baner-sidebar').classList[adsBlockHeight === 0 ? 'add' : 'remove']('_hidden');
    } else {
      el.closest('.js-baner-sidebar').classList.add('_hidden');
    }
  };
};
