import { qs, qsa } from 'utils';
import buttonOpenTags from './buttonOpenTags'
import openTags from './openTags'

let isLaptop = window.innerWidth <= 1024; // Проверка на планшет

if (qs('.js-hash-tags')) {
  if(isLaptop){
    setTimeout(()=>{
      buttonOpenTags();
      openTags();
    }, 1000);
  } else {
    buttonOpenTags();
    openTags();
  }
}
