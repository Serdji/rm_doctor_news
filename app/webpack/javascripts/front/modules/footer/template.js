module.exports = (points) => {
  // Диструктуризируем полученый объект
  let { title, url, items } = points;
  // Мапим массив с пунктами меню
  let templateItem = items.map((item) => `<li><a class="_hover-reference-gray" href="${item.url}">${item.name}</a></li>`);
  // Создаем основной шаблон с заколовками проектов
  let templatePoint = `<div class="footer__menu-project-box js-box-points">
                            <a class="footer__menu-project-title _hover-reference-gray" href="${url}">${title}</a>
                            <div class="footer__menu-project-points js-footer-points">
                              <ul class="js-footer-ul">${templateItem.join(' ')}</ul>
                            </div>
                            <div class="footer__menu-project-all js-button-open-points _hidden">
                              <svg class="footer__menu-project-all-svg">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-combined-shape-copy-9"></use>
                              </svg>
                              <span>Ещё</span>
                            </div>
                         </div>`;
  // Возвращаем готовый шаблон
  return templatePoint;
};