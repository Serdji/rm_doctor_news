import {openShare} from './nodes';
import { each } from 'utils';

export default  ()=> {
  for ( let el of openShare) el.addEventListener('click', openShareF);

  function openShareF() {
    this.closest('.js-common-social').classList.add('_activ');
    this.remove();
  }
};
