import {wrapper, leftSidebar, rightSidebar, firstColumnChild, lastColumnChild} from './nodes';
import { qs }      from 'utils';
import stickyBlock from 'stickyBlock';

export default () => {

  if ( qs('.js-float-wrapper')){

    // Прилипание на странице новостей
    if (firstColumnChild && lastColumnChild){

      stickyBlock('.js-float-first-column-child', '.js-float-wrapper', true, 15);
      stickyBlock('.js-float-last-column-child', '.js-float-wrapper', true);
    }

    // Прилипание на страницах вопросов и тем
    if (leftSidebar && rightSidebar) {
      let wrapperH      = wrapper.offsetHeight;
      let leftSidebarH  = leftSidebar.offsetHeight + parseInt(getComputedStyle(leftSidebar).marginBottom, 10);

      let rightSidebarH = rightSidebar.offsetHeight + parseInt(getComputedStyle(rightSidebar).marginBottom, 10);
      if ( wrapperH > leftSidebarH ) stickyBlock('.js-float-left-sidebar', '.js-float-wrapper');
      if ( wrapperH > rightSidebarH ) stickyBlock('.js-float-right-sidebar', '.js-float-wrapper', true);
    }

  }
};
