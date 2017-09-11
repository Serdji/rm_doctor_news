import {menuTransformer} from './nodes';
import openMenu from './openMenu'
import openSearch from './openSearch';


if (menuTransformer)  {
  window.addEventListener('scroll', openMenu);
  openSearch();
}
