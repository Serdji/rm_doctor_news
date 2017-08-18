export default () => {
  let nativeContext = document.getElementById('native2');
  if (nativeContext) {
    let ques = nativeContext.nextElementSibling;
    let intId = setInterval(() => {
      if ( nativeContext.firstElementChild && nativeContext.firstElementChild.offsetHeight >= 5) {
        ques.remove();
        clearInterval(intId);
      }
    }, 500);

    setTimeout(() => {
      clearInterval(intId);
    }, 10000);
  }
};