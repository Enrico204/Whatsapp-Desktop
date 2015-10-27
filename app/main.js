(function(scope) {
    "use strict";

    var app = require('app');
    var appMenu = require('menu');
    var AppTray = require('tray');
    var fileSystem = require('fs');
    var BrowserWindow = require('browser-window');

    global.onlyOSX = function(callback) {
        if (process.platform === 'darwin') {
            return Function.bind.apply(callback, this, [].slice.call(arguments, 0));
        }
        return function() {};
    };

    global.onlyWin = function(callback) {
        if (process.platform === 'win') {
            return Function.bind.apply(callback, this, [].slice.call(arguments, 0));
        }
        return function() {};
    };

    global.whatsApp = {
        init: function() {

            whatsApp.createMenu();
            whatsApp.createTray();

            whatsApp.clearCache();
            whatsApp.openWindow();

        },
        createMenu: function() {
            whatsApp.menu =
                appMenu.buildFromTemplate(require('./menu'));
                appMenu.setApplicationMenu(whatsApp.menu);
        },
        createTray: function() {
            whatsApp.tray = new AppTray(__dirname + '/assets/img/trayTemplate.png');

            whatsApp.tray.on('clicked', function() {
                whatsApp.window.show();
            });

            whatsApp.tray.setToolTip('WhatsApp Desktop');
        },
        clearCache: function() {
            try{
                fileSystem.unlinkSync(app.getPath('appData') + '/Application Cache/Index');
            }catch(e){}
        },
        openWindow: function() {
            whatsApp.window = new BrowserWindow(
                {
                    'width': 1000,
                    'height': 720,
                    'title': '',
                    'node-integration': false
                }
            );
            whatsApp.window.loadUrl('https://web.whatsapp.com', {
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.52 Safari/537.36'
            });
            whatsApp.window.show();

            whatsApp.window.on('page-title-updated', onlyOSX(function(event, title) {
                var count = title.match(/\((\d+)\)/);
                    count = count ? count[1] : '';

                app.dock.setBadge(count);
                if (parseInt(count) > 0) {
                    app.dock.bounce('informational');
                }
            }));

            whatsApp.window.webContents.on("new-window", function(e, url){
                require('shell').openExternal(url);
                e.preventDefault();
            });


            whatsApp.window.on('close', onlyOSX(function(e) {
                if (whatsApp.window.forceClose !== true) {
                    e.preventDefault();
                    whatsApp.window.hide();
                }
            }));

            app.on('before-quit', onlyOSX(function() {
                whatsApp.window.forceClose = true
            }));

            app.on('activate-with-no-open-windows', onlyOSX(function() {
                whatsApp.window.show();
            }));

            app.on('window-all-closed', onlyWin(function() {
                app.quit();
            }));
        }
    };

    app.on('ready', function() {
        whatsApp.init();
    });
})(this);