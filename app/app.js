var app = require('app');  // Module to control application life.
var Menu = require('menu');
var Tray = require('tray');
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var mainWindow = null;
var appIcon = null;

win = null; // make it global so app_menu.js can see it

// workaround
var fs = require('fs');
var cacheFile = app.getDataPath()+"/Application Cache/Index";
try{
  fs.unlinkSync(cacheFile);
}catch(e){}

// template
var template = require('./app_menu');

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

// Initialization.
app.on('ready', function() {
  // Configuration
  appIcon = new Tray(__dirname+'/assets/trayTemplate.png');
  appIcon.on("clicked", function(){
    win.show();
  });
  appIcon.setToolTip('WhatsApp');

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Create the browser window.
  win = new BrowserWindow({
    "width": 1000,
    "height": 720,
    "type": "toolbar",
    "title": "WhatsApp",
    "node-integration": false,
  });

  // Load the app page
  win.loadUrl('https://web.whatsapp.com', {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.52 Safari/537.36'
  });

  // Open links externally
  win.webContents.on("new-window", function(event, url, frameName, disposition){
    require('shell').openExternal(url)
    event.preventDefault();
  });
  
  // update OSX badge
  win.on('page-title-updated', function(event, title) {
    var unreadCount = getUnreadCount(title);
    app.dock.setBadge(unreadCount);
    if (unreadCount > 0)
      app.dock.bounce('informational');
  })

  // Open the devtools.
  // win.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', function() {
    win = null;
  });

  // app.dock.hide();
  win.show();
});

/**
 * Returns unread count from window title
 */
function getUnreadCount(title) {
  return title.substring(0, title.indexOf(')')).split('(').join('');
}