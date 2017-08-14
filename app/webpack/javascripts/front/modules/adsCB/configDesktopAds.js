const { qs } = require('utils');

let config = {
  billboard: {
    p: {
      'p1': 'bxdqq',
      'p2': 'y',
      'pct': 'a',
      'node': 'billboard',
      'ssp': 'ssp'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226249'
    }
  },
  ban_240x400: {
    p: {
      'p1': 'bxdqs',
      'p2': 'emhk',
      'pct': 'a',
      'node': 'ban_240x400',
      'ssp': 'ssp'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226245'
    }
  },
  context_240x200: {
    p: {
      'p1': 'bxdqy',
      'p2': 'ewwf',
      'pct': 'a',
      'node': 'context_240x200',
      'ssp': 'ssp'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226271'
    }
  },
  ban_240x400_2nd: {
    p: {
      'p1': 'bxdqt',
      'p2': 'ewqs',
      'pct': 'a',
      'node': 'ban_240x400_2nd',
      'ssp': 'sspScroll'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226247'
    }
  },
  center: {
    p: {
      'p1': 'bxdra',
      'p2': 'fomw',
      'pct': 'a',
      'node': 'center',
      'ssp': 'sspScroll'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226265'
    }
  },
  native1: {
    p: {
      'p1': 'bxdqn',
      'p2': 'fhzr',
      'pct': 'a',
      'node': 'native1',
      'ssp': 'ssp'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226257'
    }
  },
  native2: {
    p: {
      'p1': 'bxdql',
      'p2': 'fhzs',
      'pct': 'a',
      'node': 'native2',
      'ssp': 'sspScroll'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226259'
    }
  },
  native3: {
    p: {
      'p1': 'bxdqp',
      'p2': 'fjgk',
      'pct': 'a',
      'node': 'native3',
      'ssp': 'sspScroll'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226261'
    }
  },
  nativeContext: {
    p: {
      'p1': 'bxdqw',
      'p2': 'fpih',
      'pct': 'a',
      'node': 'nativeContext',
      'ssp': 'sspScroll'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226273'
    }
  },
  nativeFooter: {
    p: {
      'p1': 'bxdqu',
      'p2': 'fhzt',
      'pct': 'a',
      'node': 'nativeFooter',
      'ssp': 'sspScroll'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226263'
    }
  },
  superFooter: {
    p: {
      'p1': 'bxdqz',
      'p2': 'fcuz',
      'pct': 'a',
      'node': 'superFooter',
      'ssp': 'sspScroll'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226243'
    }
  },
  sponsored: {
    p: {
      'p1': 'bxdqo',
      'p2': 'fomx',
      'pct': 'a',
      'ssp': 'ssp'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226269'
    }
  },
  context: {
    p: {
      'p1': 'bxdqx',
      'p2': 'ewzc',
      'pct': 'a',
      'node': 'context',
      'ssp': 'sspScroll',
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226251'
    }
  },
  contextDC1: {
    p: {
      'p1': 'bxdqx',
      'p2': 'ewzc',
      'pct': 'a',
      'node': 'context',
      'ssp': 'sspScroll',
      'puid44' : 'DC1'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226251'
    }
  },
  contextDC2: {
    p: {
      'p1': 'bxdqx',
      'p2': 'ewzc',
      'pct': 'a',
      'node': 'context',
      'ssp': 'sspScroll',
      'puid44' : 'DC2'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226251'
    }
  },
  fullscreen: {
    p: {
      'p1': 'bxdqm',
      'p2': 'emiu',
      'pct': 'a',
      'node': 'fullscreen',
      'ssp': 'ssp'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226253'
    }
  },
  parallax: {
    p: {
      'p1': 'bxdqk',
      'p2': 'fhoe',
      'pct': 'a',
      'ssp': 'sspScroll',
      'node': 'parallax'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226267'
    }
  },
  recommendation: {
    p: {
      'p1': 'bxlfz',
      'p2': 'exog',
      'pct': 'a',
      'ssp': 'ssp',
      'node': 'recommendation'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '456714604'
    }
  },
  news_block: {
    p: {
      'p1': 'bxlfw',
      'p2': 'fpzm',
      'pct': 'a',
      'ssp': 'ssp',
      'node': 'newsBlock'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '456714600'
    }
  },
  inRead: {
    p: {
      'p1': 'bxdqv',
      'p2': 'fcvb',
      'pct': 'a',
      'ssp': 'sspScroll',
      'node': 'inRead'
    },
    id: {
      'begun-auto-pad': '455225850',
      'begun-block-id': '455226255'
    }
  }
};

// Модифицируем кофиг в зависимости от страници
for ( let key in config ) {
  // Главна
  if (qs('.js-news-main-page')) Object.assign( config[key].p, { puid15 : 'news', puid6: 'DOCTOR_MAIN', puid18: 'DOCTOR_MAIN_0' });
  // Карточка новости
  if (qs('.js-news-card-page')) Object.assign( config[key].p, { puid15 : 'card', puid6: 'DOCTOR_NEWS', puid18: 'DOCTOR_NEWS_CARD' });
  // Вопросы
  if(qs('.js-page-root')) Object.assign( config[key].p, { puid6: 'DOCTOR_VOPROSY', puid18: 'DOCTOR_VOPROSY_MAIN' });
  // Карточка вопроса
  if(qs('.js-page-question-ads')) Object.assign( config[key].p, { puid6: 'DOCTOR_VOPROSY', puid18: 'DOCTOR_VOPROSY_CARD' });
  // Темы и карточка темы
  if(qs('.js-page-temys-ads') ||  qs('.js-page-temy-ads')) Object.assign( config[key].p, { puid6: 'DOCTOR_VOPROSY', puid18: 'DOCTOR_VOPROSY_THEME' });
  // Поиск
  if(qs('.js-search-page')) Object.assign( config[key].p, { puid6: 'DOCTOR_SEARCH', puid18: 'DOCTOR_SEARCH_MAIN' });
}
//==============================================

module.exports = config;