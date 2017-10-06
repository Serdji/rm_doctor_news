import {menu, topLine, cardPage, shareNews, cardTitle, aticleNews, transform} from './nodes';

export default () => {

  let menuCoord          = menu.getBoundingClientRect(); // Координаты меню с поисковой стракой
  let maxLengthArticle   = 1200; // Признак большой статьи, колличество символов
  let spaceMenuTransform = 65; // Общая высота меню-трансформер

  // Если доходим до низа меню, открываем меню-трансформер
  if (menuCoord.bottom <= 0) {
    topLine.classList.add('_active');
    document.body.classList.add('_space-top-line'); // Паддинг у боди на высоту топлайна

    // Если страница карточки новости
    if(cardPage){
      let shareTopCoord    = shareNews[0].getBoundingClientRect(); // Первые шарелки
      let shareBottomCoord = shareNews[1].getBoundingClientRect(); // Вторые шарелки
      let transformTitle   = transform[0]; // Первая плашка в меню-трансформер с заголовком

      // Елси статья большая по признаку
      if(aticleNews.innerText.length >= maxLengthArticle ){
        transformTitle.querySelector('.js-transform-title').innerText = cardTitle.innerText; // Вставляем текст с заголовка статьи и первую плашку в меню-трансформер
        // В промежутки между шарилками показываем первую плашку в меню-трансформер
        transformTitle.classList[shareTopCoord.bottom - spaceMenuTransform <= 0 && shareBottomCoord.top - window.innerHeight >= 0 ? 'add' : 'remove']('_active')
      }
    }
  // Иначи закрываем меню
  } else {
    topLine.classList.remove('_active');
    document.body.classList.remove('_space-top-line');
  }
}
