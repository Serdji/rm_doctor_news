import fetchCurrentUser from './fetchCurrentUser';

export default () => {
  // Колбек срабатывате после входа через рамблер id
  ramblerIdHelper.registerOnPossibleLoginCallback(fetchCurrentUser);
};
