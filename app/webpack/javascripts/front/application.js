'use strict';

import 'myPolyfill';
import 'babel-polyfill';
import 'copywritingDate';
import '_stylesheets/front/application';
import './modules/textEditor';
import './modules/ellipsisPopUp';
import './modules/popUpQuestion';
import './modules/popUpComplaint';
import './modules/openTags';
import './modules/suggestSearch';
import '../../../../vendor/webpack/dataPublished';
import './modules/statisticsMetrika';
import './modules/bestAnswer';
import './modules/transmitEventGa';
import './modules/loadingNews';
import './modules/ramblerNews';
import './modules/footer';
import './modules/menuProjects';
import './modules/sameSourceNews';
import './modules/menuTransformer';
import './modules/adsCB';

import stickingBaner from './modules/stickingBaner';
import socialButton from './modules/socialButton';
import svg from 'svg';

svg();
stickingBaner();
socialButton();
