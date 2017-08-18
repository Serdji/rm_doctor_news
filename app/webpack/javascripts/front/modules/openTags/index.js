import { qs, qsa } from 'utils';
import buttonOpenTags from './buttonOpenTags'
import openTags from './openTags'

if (qs('.js-hash-tags')) {
  buttonOpenTags();
  openTags();
}
