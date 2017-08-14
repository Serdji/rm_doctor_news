'use strict';

require('myPolyfill');
require('babel-polyfill');
require('copywritingDate');
require('_stylesheets/front/application');
require('./modules/stickingBaner')();
require('./modules/textEditor');
require('./modules/ellipsisPopUp');
require('./modules/popUpQuestion');
require('./modules/popUpComplaint');
require('./modules/openTags');
require('./modules/socialButton')();
require('./modules/suggestSearch');
require('../../../../vendor/webpack/dataPublished');
require('./modules/statisticsMetrika');
require('./modules/bestAnswer');
require('./modules/transmitEventGa');
require('./modules/loadingNews');
require('./modules/ramblerNews');
require('./modules/footer');
require('./modules/menuProjects');
require('./modules/sameSourceNews');

// Callbacks advertisement
require('./modules/adsCB');
require('svg');
