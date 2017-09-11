import {search} from './nodes';

export default () => {

  search[0].addEventListener('click', openSearch); // Клик на иконку поиска
  search[1].addEventListener('keyup', sendSearch); // Ентер в строка поиска
  // При в облость боди закрываем поиск
  document.body.addEventListener('click', (e) => {
    if(!e.target.closest('.js-menu-transformer-search')) for (let el of search) el.classList.remove('_active');
  });

  function openSearch() {
    // Автоматичейски ставим вокус в строку поиска
    search[1].focus();
    for (let el of search) el.classList.toggle('_active');
  }

  function sendSearch(e) {
    // При нажатии на поиск
    if (e.keyCode === 13){
      // Если в поисковой строке есть хоть один символ
      if (this.value.length > 0) window.location = `${window.location.origin}/resultat?query=${encodeURIComponent(this.value)}`
    }
  }

};
