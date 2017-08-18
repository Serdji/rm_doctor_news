import { qsa, qs, each } from 'utils';
import redirectLinck from './redirectLinck'

if (qs('.js-biog')) {
  each(qsa('.js-biog'), el => {
    let nodes = {
      biography: el,
      biogDesc: el.querySelector('.js-biog-desc'),
      descShow: el.querySelector('.js-desc-show')
    };

    // require('./cutText')(nodes);
    redirectLinck(nodes);
  });
}
