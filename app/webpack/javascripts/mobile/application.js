'use strict';

require('myPolyfill');
require('babel-polyfill');
require('svg');
require('copywritingDate');

require('_stylesheets/mobile/application');

require('./modules/menu');
require('./modules/openTags');
require('./modules/suggestSearch');
require('./modules/dataPublished');
require('./modules/socialButton');
require('./modules/transmitEventGa');

// Callbacks advertisement
require('./modules/adsCB');
