import './style.css';
import { getCoords } from 'utils';

'use strict';

export default class StickyBaner {
  constructor(options) {
    this.floatStartStop    = options.floatStartStop;
    this.floatAds          = options.floatAds;
    this.floatSidebar      = options.floatSidebar;
    this.floatWrapper      = options.floatWrapper;
    this.floatContent      = options.floatContent;
    this.footer            = options.footer;
    this.spaceBannerbottom = options.spaceBannerbottom || 120;
    this.setEvents();
  }

  setEvents() {
    window.addEventListener('scroll', this.run.bind(this), false);
    window.addEventListener('resize', this.run.bind(this), false);
  }

  run() {
    let spaceBannerTop    = 80;
    let spaceBannerbottom = this.spaceBannerbottom;
    let floatBlockCoor    = getCoords(this.floatStartStop).top - spaceBannerTop;
    let boundContRect     = getCoords(this.floatSidebar);
    let boundBlockH       = this.floatAds.offsetHeight;
    let floatSidebarMB    = parseInt(getComputedStyle(this.floatSidebar).marginBottom, 10);
    let contentPadBot     = parseInt(getComputedStyle(this.floatWrapper).paddingBottom, 10);
    let footerCoor        = this.footer.getBoundingClientRect().top - spaceBannerbottom - floatSidebarMB - contentPadBot - boundBlockH;
    let warmingUpReading  = (window.pageYOffset || document.documentElement.scrollTop);
    if (this.floatSidebar.offsetHeight > this.floatContent.offsetHeight) return;
    if (floatBlockCoor > warmingUpReading) {
      this.floatAds.classList.remove('_sticky');
      this.floatAds.style.cssText = '';
    } else {
      this.floatAds.style.cssText = footerCoor < 0 ? `bottom: ${contentPadBot}px` : `left: ${boundContRect.left}px;`;
      this.floatAds.classList[footerCoor < 0 ? 'remove' : 'add']('_sticky');
      this.floatAds.classList[footerCoor < 0 ? 'add' : 'remove']('_sticky-footer');
    }
  }
}


