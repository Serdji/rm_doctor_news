import { qs, qsa } from 'utils';
import openPopUp from './openPopUp'
import closePopUp from './closePopUp'
import selectState from './selectState'
import inputLengthCounter from './inputLengthCounter'

if (qs('.js-open-pop-up-ques')) {
  openPopUp();
  closePopUp();
  selectState();
  inputLengthCounter();
}
