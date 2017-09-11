import {newsPartners} from './nodes';

export default () => {
  if (newsPartners) {
    let utm = '?utm_medium=more&utm_source=rdoctor';
    let intId = setInterval(() => {
      let mainAnchor = newsPartners.querySelectorAll('.teaser-container');
      if (mainAnchor.length > 0) {
        for (let el of mainAnchor) {
          let imageAnchor = el.querySelector('.teaser-image-anchor');
          let mainAnchor = el.querySelector('.main-anchor');
          imageAnchor.setAttribute('href', imageAnchor.getAttribute('href') + utm);
          mainAnchor.setAttribute('href', mainAnchor.getAttribute('href') + utm);
        }
        clearInterval(intId);
      }
    }, 1000);
  }
}
