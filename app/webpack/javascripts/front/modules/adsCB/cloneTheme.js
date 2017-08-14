module.exports = (nodes) => {
  let native = document.getElementById('native1');
  if (native) {
    let theme = native.nextElementSibling;
    if(!theme) return;
    if(!theme.classList.contains('tag__theme')) return;

    let intId = setInterval(() => {
      if ( native.firstElementChild && native.firstElementChild.offsetHeight >= 5) {
        let cloneTheme = theme.innerHTML;
        theme.remove();

        // Останавливеме итервал, что бы не удалть все блоки
        clearInterval(intId);

        // Кланируем маленький блок при нечетном колличестве
        if (nodes.miniTheme.length % 2 !== 0) {
          nodes.miniTheme[nodes.miniTheme.length - 1].insertAdjacentHTML('afterEnd',
            `<div class="tag__theme js-tag-share js-tag-ads js-mini-theme"> ${cloneTheme}</div>`
          );
        } else {
          nodes.lastBigTheme.classList.remove('_hidden');
        }
      }
    }, 500);

    setTimeout(() => {
      clearInterval(intId);
    }, 10000);
  }
};
