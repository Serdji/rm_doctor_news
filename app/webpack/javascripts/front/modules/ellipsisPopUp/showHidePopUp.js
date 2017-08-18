import { ellipsis } from './nodes';

export default () => {
  for ( let el of ellipsis ) el.addEventListener('click', showHide);
  document.body.addEventListener('click', hidePopUp, true);
  function showHide() {
    let isClass = this.classList.contains('_activ');
    for ( let el of ellipsis ) el.classList.remove('_activ');
    this.classList[isClass ? 'remove' : 'add']('_activ');
  }
  function hidePopUp(e) {
    let isParent = e.target.closest('.js-ellipsis-pop-up');
    if (!isParent) for ( let el of ellipsis ) el.classList.remove('_activ');
  }
};
