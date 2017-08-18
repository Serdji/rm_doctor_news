import { qs } from 'utils';
import SuggestSearch from 'suggestSearch';
import redirectLink from './redirectLink';

let suggestComponent = qs('.search .search__select');

if (suggestComponent) {
  let suggestSearch = new SuggestSearch(suggestComponent);
  suggestSearch.run();
  redirectLink();
}
