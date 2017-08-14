const { qs }      = require('utils');
const openClose   = require('./openClose');

if (qs('.js-open-menu-projects')) {
  let nodes = {
    menuProjects: qs('.js-menu-projects'),
    openMenuProjects: qs('.js-open-menu-projects'),
    closeMenuProjects: qs('.js-close-menu-projects'),
    pointsMenuProjects: qs('.js-points-menu-projects')
  };
  openClose(nodes);

};