const { qsa } = require('utils');
module.exports = () => {
  for ( let button of qsa('.js-button-open-points') ) button.addEventListener('click', openClose);
  function openClose() {
    // Бежим по всем боксам где лежат ссылки на меню
    for ( let box of qsa('.js-box-points') ) {
      let pointsWrapper       = box.querySelector('.js-footer-points');
      let pointsUl            = pointsWrapper.querySelector('ul');
      let button              = box.querySelector('.js-button-open-points');
      let pointsWrapperHeidth = pointsWrapper.offsetHeight;
      let pointsUlHeidth      = pointsUl.offsetHeight;
      // Если на кнопки висит уже класс акнивации, стераем его и стирае атрибут стиля
      if (button.classList.contains('_active')) {
        pointsWrapper.removeAttribute('style');
        setTimeout(()=>{ // после первой анимации запустить вторую
          button.classList.remove('_active');
          button.querySelector('span').innerText = 'Ещё';
        }, 150);
      // Иначе вешаем клас на кнопку
      } else {
        // елси контейнер UL больше обертки вешает на обертку атрибут стайл с размерами
        if ( pointsUlHeidth > pointsWrapperHeidth ) pointsWrapper.style.height = `${pointsUlHeidth}px`;
        setTimeout(()=>{ // после первой анимации запустить вторую
          button.classList.add('_active');
          button.querySelector('span').innerText = 'Свернуть';
        }, 150);
      }
    }
  }
};