(function(scope) {
    "use strict";

    var template = [
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Settings',
                    accelerator: 'CmdOrCtrl+,',
                    click: function () {
                        global.settings.init();
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                },
                {
                    label: 'Toggle Full Screen',
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
                    label: 'Toggle Developer Tools',
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
                {
                    label: 'Phone info',
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
            label: 'Window',
            role: 'window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                }
            ]
        },
        {
            label: 'Audio',
            submenu: [
                {
                    label: 'Increase Audio Rate by 20%',
                    accelerator: 'CmdOrCtrl+=',
                    click: function(item, focusedWindow) {
                        focusedWindow && focusedWindow.webContents.executeJavaScript(
                            "window.audioRate = (window.audioRate || 1) + 0.2"
                        )
                    }
                },
                {
                    label: 'Decrease Audio Rate by 20%',
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
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Alt+H',
                    role: 'hideothers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
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
                label: 'Bring All to Front',
                role: 'front'
            }
        );
    } else if (process.platform == 'linux') {
        template.unshift({
            label: 'File',
            submenu: [
                {
                    label: 'About WhatsApp Desktop',
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Ctrl+Q',
                    click: () => { require('electron').app.quit() }
                },
            ]
        });
    }

    module.exports = template;

})(this);
