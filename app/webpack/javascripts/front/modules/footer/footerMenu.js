const footerLine      = require('./footerLine');
const showButton      = require('./showButton');
const openClosePoints = require('./openClosePoints');
const template        = require('./template');
module.exports = (nodes) => {
  if (!nodes.menuProject) return;
  // Бежим по обеъкту с пунктами меню
  for (let points of footerLine) {
    // Добавляем шаблок в футер
    nodes.menuProject.insertAdjacentHTML('beforeEnd', template(points));
  }
  // Показываем кнопку ещё
  showButton();
  // Показать польностью меню или скрыть
  openClosePoints();
};