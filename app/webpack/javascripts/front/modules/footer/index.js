const { qs }     = require('utils');
const footerMenu = require('./footerMenu');

let nodes = {
  menuProject: qs('.js-menu-project')
};

footerMenu(nodes);