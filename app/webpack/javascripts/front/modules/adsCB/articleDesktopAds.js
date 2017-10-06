
export default {
  root: '.js-news-article',
  nodes: ['p', 'h2'],
  floats: ['.b-box_floated'],
  looped: true,
  places: [
    {
      offset: 500,
      haveToBeAtLeast: 500,
      method: 'sspScroll',
      className: 'banner',
      siblingId: 'ad_center',
      bannerOptions: {
        puid15 : 'card',
        p1: 'bxdra',
        p2: 'fomw',
        pc: 'a'
      },
      looped: false,
      begunOptions: {
        'begun-auto-pad': 455225850,
        'begun-block-id': 455226265
      }
    },
    {
      offset: 1800,
      haveToBeAtLeast: 500,
      method: 'sspScroll',
      className: 'banner',
      siblingId: 'in_read',
      bannerOptions: {
        puid15 : 'card',
        p1: 'bxdqv',
        p2: 'fcvb',
        pct: 'a'
      },
      looped: false,
      begunOptions: {
        'begun-auto-pad': 455225850,
        'begun-block-id': 455226255
      }
    },
    {
      offset: 500,
      haveToBeAtLeast: 500,
      method: 'sspScroll',
      className: 'news-card__article-native',
      siblingId: 'native3',
      bannerOptions: {
        puid15 : 'card',
        p1: 'bxdqp',
        p2: 'fjgk',
        pct: 'a'
      },
      looped: true,
      begunOptions: {
        'begun-auto-pad': 455225850,
        'begun-block-id': 455226261
      }
    },
    {
      offset: 1800,
      haveToBeAtLeast: 500,
      method: 'sspScroll',
      className: 'banner',
      siblingId: 'ad_center',
      bannerOptions: {
        puid15 : 'card',
        p1: 'bxdra',
        p2: 'fomw',
        pc: 'a'
      },
      looped: true,
      begunOptions: {
        'begun-auto-pad': 455225850,
        'begun-block-id': 455226265
      }
    }
  ]
};
