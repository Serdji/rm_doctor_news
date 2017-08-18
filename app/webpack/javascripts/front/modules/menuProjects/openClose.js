import {menuProjects, openMenuProjects, closeMenuProjects, pointsMenuProjects} from './nodes';
import SweetScroll from 'sweet-scroll';


export default () => {
  openMenuProjects.addEventListener('click', open);
  closeMenuProjects.addEventListener('click', close);
  const sweetScroll = new SweetScroll();

  function open() {
    // Задаем body margin-right на ширину скрола
    document.body.style.marginRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.classList.add('_off-scroll'); // Отключаем скрол у body
    sweetScroll.to(`header`);

    menuProjects.classList.add('_active');
    setTimeout(()=>{
      pointsMenuProjects.classList.add('_active');
    }, 150);
  }

  function close() {
    document.body.removeAttribute('style');
    document.body.classList.remove('_off-scroll');
    pointsMenuProjects.classList.remove('_active');
    setTimeout(()=>{
      menuProjects.classList.remove('_active');
    }, 150);
  }

  document.body.addEventListener('click', (e)=> {
    if(e.target.closest('.js-points-menu-projects') || e.target.closest('.js-open-menu-projects')) return;
    close();
  })
};