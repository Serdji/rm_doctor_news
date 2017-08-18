import {menuProject}   from './nodes';
import footerLine      from './footerLine';
import showButton      from './showButton';
import openClosePoints from './openClosePoints';
import template        from './template';

export default () => {
  if (!menuProject) return;
  // Бежим по обеъкту с пунктами меню
  for (let points of footerLine) {
    // Добавляем шаблок в футер
    menuProject.insertAdjacentHTML('beforeEnd', template(points));
  }
  // Показываем кнопку ещё
  showButton();
  // Показать польностью меню или скрыть
  openClosePoints();
};