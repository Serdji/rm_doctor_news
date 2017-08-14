const configDesktopAds = require('./configDesktopAds');
const configTabletAds  = require('./configTabletAds');

module.exports = (el, index) => {
  let html = `<div id="sponsored_${index}"></div>`;
  el.insertAdjacentHTML('afterEnd', html);
  if (window.innerWidth > 1024) Adf.banner.ssp(`sponsored_${index}`, configDesktopAds.sponsored.p, configDesktopAds.sponsored.id);
  else Adf.banner.ssp(`sponsored_${index}`, configTabletAds.sponsored.p, configTabletAds.sponsored.id);

};
