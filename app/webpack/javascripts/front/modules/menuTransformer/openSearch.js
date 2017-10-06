import {search} from './nodes';

export default () => {
  let isLaptop = window.innerWidth <= 1024; // Проверка на планшет

  search[0].addEventListener( isLaptop ? 'touchend' : 'click', openSearch); // Клик на иконку поиска
  search[ !isLaptop ? 1 : 3 ].addEventListener('keyup', sendSearch); // Ентер в строка поиска

  // При в облость боди закрываем поиск
  document.body.addEventListener( isLaptop ? 'touchend' : 'click', (e) => {
    if(!e.target.closest('.js-menu-transformer-search')) {
      // Дизейблим элемент при его закрынии через 300мс
      if ( isLaptop && !search[2].classList.contains('_active') ) setTimeout(()=>{search[2].classList.add('_hidden')}, 300);
      for (let el of search) el.classList.remove('_active');
    }
  });

  function openSearch() {
    if ( isLaptop ) search[2].classList.remove('_hidden');

    // Откладываем выполнение пока элемент не раздизейблится
    setTimeout(()=>{
      if ( !isLaptop ) search[0].classList.toggle('_active');
      search[ !isLaptop ? 1 : 2].classList.toggle('_active');
      // Автоматичейски ставим вокус в строку поиска
      search[ !isLaptop ? 1 : 2].focus();
      // Дизейблим элемент при его закрынии через 300мс
      if ( isLaptop && !search[2].classList.contains('_active') ) setTimeout(()=>{search[2].classList.add('_hidden')}, 300);

    }, 0);
  }

  function sendSearch(e) {
    // При нажатии на поиск
    if (e.keyCode === 13){
      // Если в поисковой строке есть хоть один символ
      if (this.value.length > 0) window.location = `${window.location.origin}/resultat?query=${encodeURIComponent(this.value)}`
    }
  }

};
