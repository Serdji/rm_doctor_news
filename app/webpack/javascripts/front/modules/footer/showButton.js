const { qsa } = require('utils');
module.exports = () => {
  // Бежим по всем боксам где лежат ссылки на меню
  for ( let box of qsa('.js-box-points') ) {
    let pointsWrapper       = box.querySelector('.js-footer-points');
    let pointsUl            = pointsWrapper.querySelector('.js-footer-ul');
    let button              = box.querySelector('.js-button-open-points');
    let pointsWrapperHeidth = pointsWrapper.offsetHeight;
    let pointsUlHeidth      = pointsUl.offsetHeight;
    // Если UL больше чем обертка, показывает кнопку ещё
    if ( pointsUlHeidth > pointsWrapperHeidth ) button.classList.remove('_hidden');
  }
};