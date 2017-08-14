const configDesktopAds = require('./configDesktopAds');

module.exports = (el, index) => {
  let html = `<div id="newsBlock_${index}"></div>`;
  el.insertAdjacentHTML('afterEnd', html);
  Adf.banner.ssp(`newsBlock_${index}`, configDesktopAds.news_block.p, configDesktopAds.news_block.id);
};