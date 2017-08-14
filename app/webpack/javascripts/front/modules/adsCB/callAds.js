const { qs } = require('utils');
module.exports = (config) => {
  // Ищим рекламные слоты для иньекции по id или class атрибутам

  let nodesAds = qs(`#${config.p.node}`) || qs(`.${config.p.node}`);
  // Проверяем, есть ли слоты для иньекции рекламы
  if(nodesAds) return  Adf.banner[config.p.ssp](config.p.node, config.p, config.id);
  // Иначе возвращаем новый пустой промис
  else return new Promise(resolve => resolve());
};
