export default arg => {
  document.body.classList[ !(arg % 2 === 0) ? 'add' : 'remove' ]('_offscroll');
  document.body[ !(arg % 2 === 0) ? 'removeEventListener' : 'addEventListener' ]('touchmove', offScroll); // Снимаем блок скролла на IOS
};

const offScroll = e => {
  e.preventDefault();
};
