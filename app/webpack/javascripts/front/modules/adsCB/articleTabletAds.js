
module.exports = {
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
      siblingId: 'content1',
      bannerOptions: {
        p1: 'bxszq',
        p2: 'emil',
        pc: 'a'
      },
      looped: false,
      begunOptions: {
        'begun-auto-pad': 459111976,
        'begun-block-id': 459112020
      }
    },
    {
      offset: 1800,
      haveToBeAtLeast: 500,
      method: 'sspScroll',
      className: 'banner',
      siblingId: 'in_read',
      bannerOptions: {
        p1: 'bxszu',
        p2: 'fexd',
        pct: 'a',
      },
      looped: false,
      begunOptions: {
        'begun-auto-pad': 459111976,
        'begun-block-id': 459112220
      }
    },
    {
      offset: 1800,
      haveToBeAtLeast: 500,
      method: 'sspScroll',
      className: 'banner',
      siblingId: 'Content_spec',
      bannerOptions: {
        p1: 'bxtaa',
        p2: 'fqbd',
        pct: 'a'
      },
      looped: false,
      begunOptions: {
        'begun-auto-pad': 459111976,
        'begun-block-id': 459113982
      }
    }
  ]
};