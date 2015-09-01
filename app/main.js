(function(scope) {
    "use strict";

    var app = require('app');
    var appMenu = require('menu');
    var fileSystem = require('fs');
    var BrowserWindow = require('browser-window');

    module.exports =
        global.whatsApp = {
            init: function() {
                this.createMenu();

                this.clearCache();
                this.openWindow();

                app.on('window-all-closed', onlyWin(function() {
                    app.quit()
                }));
            },
            createMenu: function() {
                this.menu =
                    appMenu.buildFromTemplate(require('./menu'));
                    appMenu.setApplicationMenu(this.menu);
            },
            clearCache: function() {
                try{
                    fileSystem.unlinkSync(app.getPath('appData') + '/Application Cache/Index');
                }catch(e){}
            },
            openWindow: function() {
                this.window = new BrowserWindow(
                    {
                        'width': 1280,
                        'height': 720,
                        'title': '',
                        'node-integration': false
                    }
                );

                this.window.loadUrl('https://web.whatsapp.com', {
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.52 Safari/537.36'
                });

                this.window.on('activate-with-no-open-windows', function() {
                    this.window && this.window.show();
                }.bind(this));

                app.on('page-title-updated', onlyOSX(function(event, title) {
                    var count = title.match(/\((\d+)\)/);

                    if (count !== null) {
                        app.dock.setBadge(count);

                        if (count > 0) {
                            app.dock.bounce('informational');
                        }
                    }
                }));

                app.on('before-quit', function() {
                    this.window && (this.window.forceClose = true);
                }.bind(this));
            }
        };
})(this);