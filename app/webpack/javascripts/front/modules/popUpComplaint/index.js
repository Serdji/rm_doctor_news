import { qs, qsa } from 'utils';
import setupCallbacks from './setupCallbacks';
import openPopUp from './openPopUp';
import closePopUp from './closePopUp';
import sendComplaint from './sendComplaint';

if (qs('.js-open-pop-up-complaint')) {
  setupCallbacks();
  openPopUp();
  closePopUp();
  sendComplaint();
}
