(function(scope) {
    "use strict";

    var template = [
        {
            label: "&" + _('Edit'),
            submenu: [
                {
                    label: _('Undo'),
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: _('Redo'),
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: _('Cut'),
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: _('Copy'),
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: _('Paste'),
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: _('Select All'),
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                },
                {
                    type: 'separator'
                },
                {
                    label: _('Settings'),
                    accelerator: 'CmdOrCtrl+,',
                    click: function () {
                        global.settings.init();
                    }
                }
            ]
        },
        {
            label: "&" + _('View'),
            submenu: [
                {
                    label: _('Reload'),
                    accelerator: 'CmdOrCtrl+R',
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                },
                {type: 'separator'},
                {
                    label: _('Toggle Full Screen'),
                    accelerator: (function() {
                        if (process.platform == 'darwin')
                            return 'Ctrl+Command+F';
                        else
                            return 'F11';
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                },
                {
                    label: _('Dark mode'),
                    accelerator: 'CmdOrCtrl+Shift+Alt+D',
                    type: 'checkbox',
                    checked: (function() {
                        return global.config.get("darkMode");
                    })(),
                    click: function(item, focusedWindow) {
                        global.config.set("darkMode", global.config.get("darkMode") != true);
                        item.checked = global.config.get("darkMode");
                        global.config.saveConfiguration();
                        global.config.applyConfiguration();
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                },
                {
                    label: _('Quiet mode'),
                    accelerator: 'CmdOrCtrl+Shift+Alt+Q',
                    type: 'checkbox',
                    checked: (function() {
                        return global.config.get("quietMode");
                    })(),
                    click: function(item, focusedWindow) {
                        global.config.set("quietMode", global.config.get("quietMode") != true);
                        item.checked = global.config.get("quietMode");
                        global.config.saveConfiguration();
                    }
                },
                {type: 'separator'},
                {
                    label: _('Toggle Developer Tools'),
                    accelerator: (function() {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+I';
                        else
                            return 'Ctrl+Shift+I';
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                },
                {type: 'separator'},
                {
                    label: _('Phone info'),
                    accelerator: (function() {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+N';
                        else
                            return 'Ctrl+Shift+N';
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            global.phoneinfo.init();
                    }
                }
            ]
        },
        {
            label: "&" + _('Window'),
            role: 'window',
            submenu: [
                {
                    label: _('Minimize'),
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: _('Close'),
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                },
                {
                    label: 'close2',
                    visible: false,
                    accelerator: "esc",
                    role: 'close'
                }
            ]
        },
        {
            label: "&" + _('Audio'),
            submenu: [
                {
                    label: _('Increase Audio Rate by 20%'),
                    accelerator: 'CmdOrCtrl+=',
                    click: function(item, focusedWindow) {
                        focusedWindow && focusedWindow.webContents.executeJavaScript(
                            "window.audioRate = (window.audioRate || 1) + 0.2"
                        )
                    }
                },
                {
                    label: _('Decrease Audio Rate by 20%'),
                    accelerator: 'CmdOrCtrl+-',
                    click: function(item, focusedWindow) {
                        focusedWindow && focusedWindow.webContents.executeJavaScript(
                            "window.audioRate = (window.audioRate || 1) - 0.2"
                        )
                    }
                }
            ]
        }
    ];

    if (process.platform == 'darwin') {
        var name = 'WhatsApp Desktop';
        template.unshift({
            label: "&" + name,
            submenu: [
                {
                    label: _('About') + " " + name,
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: _('Hide') + " " + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: _('Hide Others'),
                    accelerator: 'Command+Alt+H',
                    role: 'hideothers'
                },
                {
                    label: _('Show All'),
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: _('Quit'),
                    accelerator: 'Command+Q',
                    click: () => { require('electron').app.quit() }
                },
            ]
        });
        // Window menu.
        template[3].submenu.push(
            {
                type: 'separator'
            },
            {
                label: _('Bring All to Front'),
                role: 'front'
            }
        );
    } else if (process.platform == 'linux' || process.platform == 'win64' || process.platform == 'win32') {
        template.unshift({
            label: '&File',
            submenu: [
                {
                    label: _('About'),
                    click: () => { global.about.init(); }
                },
                {
                    label: _('Quit'),
                    accelerator: 'Ctrl+Q',
                    click: () => { require('electron').app.quit() }
                },
            ]
        });
    }

    module.exports = template;

})(this);
