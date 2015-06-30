var app = require('app');  // Module to control application life.
var Menu = require('menu');
var Tray = require('tray');
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var mainWindow = null;
var appIcon = null;
var win = null;

var template = [
  {
    label: 'Whatsapp',
    submenu: [
      {
        label: 'About Whatsapp',
        selector: 'orderFrontStandardAboutPanel:'
      },
      { type: 'separator' },
      {
        label: 'Hide Whatsapp',
        accelerator: 'Command+H',
        selector: 'hide:'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      },
      {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:'
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      },
      { type: 'separator' },
      {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: function() { win.reload(); }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function() { win.toggleDevTools(); }
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      },
      {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'hide:'
      },
      { type: 'separator' },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }
    ]
  }
];

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
  appIcon.setToolTip('Whatsapp');

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Create the browser window.
  win = new BrowserWindow({
    "width": 1000,
    "height": 720,
    "type": "toolbar",
    "title": "Whatsapp",
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

  // Open the devtools.
  // win.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', function() {
    win = null;
  });

  // app.dock.hide();
  win.show();
});