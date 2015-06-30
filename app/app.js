var app = require('app');  // Module to control application life.
var Menu = require('menu');
var Tray = require('tray');
var spawn = require('child_process').spawn;
var child = null;
var appIcon = null;

function toggle (e) {
  if (e.checked) {
    child = spawn('caffeinate');
    appIcon.setImage(__dirname+'/assets/onTemplate.png');
  }
  else {
    child.kill();
    appIcon.setImage(__dirname+'/assets/offTemplate.png');
  }
}

// Initialization.
app.on('ready', function() {
  appIcon = new Tray(__dirname+'/assets/onTemplate.png');
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Active', type: 'checkbox', checked: true, click: toggle },
    { label: 'Quit', click: app.quit },
  ]);
  appIcon.setToolTip('Manapot');
  appIcon.setContextMenu(contextMenu);
  
  child = spawn('caffeinate');
});