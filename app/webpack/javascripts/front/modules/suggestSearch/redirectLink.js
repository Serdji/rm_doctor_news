import { qs } from 'utils';

export default () => {
  // qs('.js-search-linck')
  document.body.addEventListener('click', redirect, true);

  function redirect(e) {
    let searchLinck = e.target.closest('.js-search-linck');

    if (searchLinck) {
      window.location = `${searchLinck.dataset.href}${qs('.js-search-input').value}`;
    }
  }
};
