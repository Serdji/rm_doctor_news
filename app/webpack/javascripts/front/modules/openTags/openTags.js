export default () => {
  // Дилегиуем событие на созданый таб
  document.body.addEventListener('click', openTags, true);
  function openTags(e) {
    let target = e.target;
    // Если всплываем не черз тег, останавливаем скрипт
    if (!target.closest('.js-open-tags')) return;
    // Проверяем, если скрипт работает на странице новостей, перекидывать по урлу
    console.log(target.closest('.mini-shared-questions__content'));
    if(target.closest('.mini-shared-questions__content')){
      let href = target.closest('.mini-shared-questions__content').querySelector('a').getAttribute('href');
      window.location = href;
      return;
    }
    // Открываем все теги и удаляем тег кнопку
    target.closest('.js-hash-tags').classList.remove('_hide');
    target.closest('.js-open-tags').remove();
  }
};
