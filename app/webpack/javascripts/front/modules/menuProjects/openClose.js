const SweetScroll = require('sweet-scroll');


module.exports = (nodes) => {
  nodes.openMenuProjects.addEventListener('click', open);
  nodes.closeMenuProjects.addEventListener('click', close);
  const sweetScroll = new SweetScroll();

  function open() {
    // Задаем body margin-right на ширину скрола
    document.body.style.marginRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.classList.add('_off-scroll'); // Отключаем скрол у body
    sweetScroll.to(`header`);

    nodes.menuProjects.classList.add('_active');
    setTimeout(()=>{
      nodes.pointsMenuProjects.classList.add('_active');
    }, 150);
  }

  function close() {
    document.body.removeAttribute('style');
    document.body.classList.remove('_off-scroll');
    nodes.pointsMenuProjects.classList.remove('_active');
    setTimeout(()=>{
      nodes.menuProjects.classList.remove('_active');
    }, 150);
  }

  document.body.addEventListener('click', (e)=> {
    if(e.target.closest('.js-points-menu-projects') || e.target.closest('.js-open-menu-projects')) return;
    close();
  })
};