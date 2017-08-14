const { qs } = require('utils');

module.exports = () => {
  // qs('.js-search-linck')
  document.body.addEventListener('touchend', redirect, true);

  function redirect(e) {
    let searchLinck = e.target.closest('.js-search-linck');

    if (searchLinck) {
      window.location = `${searchLinck.dataset.href}${qs('.js-search-input').value}`;
    }
  }
};
