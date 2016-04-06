(function(scope) {
    "use strict";

    var app = require('app');
    var AppMenu = require('menu');
    var MenuItem = require('menu-item');
    var AppTray = require('tray');
    var fileSystem = require('fs');
    var NativeImage = require('native-image');
    var BrowserWindow = require('browser-window');

    var join = require('path').join;

    global.onlyOSX = function(callback) {
        if (process.platform === 'darwin') {
            return Function.bind.apply(callback, this, [].slice.call(arguments, 0));
        }
        return function() {};
    };

    global.onlyLinux = function(callback) {
        if (process.platform === 'linux') {
            return Function.bind.apply(callback, this, [].slice.call(arguments, 0));
        }
        return function() {};
    };

    global.onlyWin = function(callback) {
        if (process.platform === 'win32' || process.platform === 'win64') {
            return Function.bind.apply(callback, this, [].slice.call(arguments, 0));
        }
        return function() {};
    };


    global.config = {
        defaultSettings: {
            width: 1000,
            height: 720,
            thumbSize: 0
        },

        currentSettings: {},

        init() {
            config.loadConfiguration();
        },

        loadConfiguration() {
            var settingsFile = app.getPath('userData') +"/settings.json";
            try {
                var data = fileSystem.readFileSync(settingsFile);
                config.currentSettings = JSON.parse(data);
            } catch (e) {
                config.currentSettings = config.defaultSettings;
            }
        },

        applyConfiguration() {
            whatsApp.window.webContents.on('dom-ready', function (event, two) {
                var noAvatar = '.chat-avatar{display: none}';
                var noPreview = '.chat-secondary .chat-status{z-index: -999;}';

                var thumbSize = '.image-thumb { width: '+ config.currentSettings.thumbSize + 'px  !important;' +
                'height: '+ config.currentSettings.thumbSize + 'px !important;}' +
                '.image-thumb img.image-thumb-body { width: auto !important;' +
                'height: '+ config.currentSettings.thumbSize + 'px !important;}';

                if (config.currentSettings.hideAvatars) {
                    this.insertCSS(noAvatar);
                }
                if (config.currentSettings.hidePreviews){
                    this.insertCSS(noPreview);
                }

                if (config.currentSettings.thumbSize) {
                    this.insertCSS(thumbSize);
                }
            });

            if (config.get("useProxy")) {
                var session = whatsApp.window.webContents.session;
                var httpProxy = config.get("httpProxy");
                var httpsProxy = config.get("httpsProxy") || httpProxy;
                if(httpProxy) {
                  session.setProxy("http="+ httpProxy +";https=" + httpsProxy, function(){});
                }
            }
        },

        saveConfiguration() {
            fileSystem.writeFileSync(app.getPath('userData') + "/settings.json", JSON.stringify(config.currentSettings) , 'utf-8');
        },

        get (key) {
            return config.currentSettings[key];
        },

        set (key, value) {
            config.currentSettings[key] = value;
        },

        unSet (key) {
            if (config.currentSettings.hasOwnProperty(key)) {
                delete config.currentSettings[key];
            }
        }
    };

    global.whatsApp = {
        init() {
            whatsApp.createMenu();
            whatsApp.createTray();

            whatsApp.clearCache();
            config.init();
            whatsApp.openWindow();
            config.applyConfiguration();
        },

        createMenu() {
            whatsApp.menu =
                AppMenu.buildFromTemplate(require('./menu'));
                AppMenu.setApplicationMenu(whatsApp.menu);
        },

        createTray() {
            whatsApp.tray = new AppTray(__dirname + '/assets/img/trayTemplate.png');

            whatsApp.tray.on('clicked', () => {
                whatsApp.window.show();
            });

            whatsApp.tray.setToolTip('WhatsApp Desktop');
        },

        clearCache() {
            try {
                fileSystem.unlinkSync(app.getPath('appData') + '/Application Cache/Index');
            } catch(e) {}
        },

        openWindow() {
            whatsApp.window = new BrowserWindow({
                "y": config.get("posY"),
                "x": config.get("posX"),
                "width": config.get("width"),
                "height": config.get("height"),
                "minWdth": 600,
                "minHeight": 600,
                "icon": __dirname + 'assets/icon/icon.png',
                //"type": "toolbar",
                "title": "WhatsApp",
                "webPreferences": {
                  "nodeIntegration": false,
                  "preload": join(__dirname, 'js', 'injected.js')
                }
            });

            whatsApp.window.loadURL('https://web.whatsapp.com', {
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.52 Safari/537.36'
            });

            if (config.get("useProxy")) {
                var session = whatsApp.window.webContents.session;
                var httpProxy = config.get("httpProxy");
                var httpsProxy = config.get("httpsProxy") || httpProxy;
                if (httpProxy) {
                    session.setProxy("http="+ httpProxy +";https=" + httpsProxy, () => {});
                }
            }

            whatsApp.window.show();

            whatsApp.window.on('page-title-updated', onlyOSX((event, title) => {
                var count = title.match(/\((\d+)\)/);
                    count = count ? count[1] : '';

                app.dock.setBadge(count);
                // if (parseInt(count) > 0)
                //     app.dock.bounce('informational');
            }));

            whatsApp.window.on('page-title-updated', onlyLinux((event, title) => {
                var count = title.match(/\((\d+)\)/);
                    count = count ? count[1] : '';

            }));

            whatsApp.window.on('page-title-updated', onlyWin((event, title) => {
                var count = title.match(/\((\d+)\)/);
                    count = count ? count[1] : '';

                if (parseInt(count) > 0) {
                    if (!whatsApp.window.isFocused()) {
                      whatsApp.window.flashFrame(true);
                    }
                    var badge = NativeImage.createFromPath(app.getAppPath() + "/assets/badges/badge-" + (count > 9 ? 0 : count) +".png");
                    whatsApp.window.setOverlayIcon(badge, "new messages");
                } else {
                    whatsApp.window.setOverlayIcon(null, "no new messages");
                }
            }));

            whatsApp.window.webContents.on("new-window", (e, url) => {
                require('shell').openExternal(url);
                e.preventDefault();
            });

            whatsApp.window.on('close', onlyOSX((e) => {
                if (whatsApp.window.forceClose !== true) {
                    e.preventDefault();
                    whatsApp.window.hide();
                }
            }));

            whatsApp.window.on("close", function(){
                if (settings.window) {
                    settings.window.close();
                    settings.window = null;
                }

                // save the window position
                config.set("posX", this.getBounds().x);
                config.set("posY", this.getBounds().y);
                config.set("width", this.getBounds().width);
                config.set("height", this.getBounds().height);
                config.saveConfiguration();
            });

            app.on('before-quit', onlyOSX(() => {
                whatsApp.window.forceClose = true;
            }));

            app.on('before-quit', onlyLinux(() => {
                whatsApp.window.forceClose = true;
            }));

            app.on('activate-with-no-open-windows', onlyOSX(() => {
                whatsApp.window.show();
            }));

            app.on('window-all-closed', onlyWin(() => {
                app.quit();
            }));
        }
    };

    global.settings = {
        init() {
            // if there is already one instance of the window created show that one
            if (settings.window){
                settings.window.show();
            } else {
                settings.openWindow();
                settings.createMenu();
            }
        },

        createMenu() {
            settings.menu = new AppMenu();
            settings.menu.append(new MenuItem(
                {
                    label: "close",
                    visible: false,
                    accelerator: "esc",
                    click() {settings.window.close();}
                })
            );
            settings.menu.append(new MenuItem(
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Alt+CmdOrCtrl+O',
                    visible: false,
                    click() {  settings.window.toggleDevTools(); }
                })
            );
            settings.menu.append(new MenuItem(
                {
                    label: 'Reload settings view',
                    accelerator: 'CmdOrCtrl+r',
                    visible: false,
                    click() { settings.window.reload();}
                })
            );
            settings.window.setMenu(settings.menu);
            settings.window.setMenuBarVisibility(false);
        },

        openWindow() {
            settings.window = new BrowserWindow(
                {
                    "width": 500,
                    "height": 500,
                    "resizable": true,
                    "center": true,
                    "frame": true,
                    "webPreferences": {
                      "nodeIntegration": true,
                    }
                }
            );

            settings.window.loadURL("file://" + __dirname + "/html/settings.html");
            settings.window.show();

            settings.window.on("close", () => {
                settings.window = null;
            });
        }
    };

    app.on('ready', () => {
        whatsApp.init();
    });
})(this);
