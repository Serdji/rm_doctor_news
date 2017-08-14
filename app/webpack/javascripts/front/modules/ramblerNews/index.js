(function (i, s, o, g, r, a, m) {
  i['RamblerExchangeObject'] = r;
  i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    };
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://api.rnet.plus//Scripts/embed.min.js', 're');

re('https://api.rnet.plus/',
  [
    {'blockId': 96, 'elementId': 'news-partners__item-top'},
    {'blockId': 95, 'elementId': 'news-partners__item-bottom'}
  ]
);
