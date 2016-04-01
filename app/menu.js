(function(scope) {
    "use strict";

    module.exports = [
        {
            label: 'WhatsApp Desktop',
            submenu: [
                {
                    label: 'About WhatsApp',
                    role: 'orderFrontStandardAboutPanel:'
                },
                { type: 'separator' },
                {
                    label: 'Hide WhatsApp',
                    accelerator: 'CmdOrCtrl+H',
                    role: 'hide:'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'CmdOrCtrl+Shift+H',
                    role: 'hideOtherApplications:'
                },
                {
                    label: 'Show All',
                    role: 'unhideAllApplications:'
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    role: 'terminate'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo:'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo:'
                },
                { type: 'separator' },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut:'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste:'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectAll:'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function() { global.whatsApp.window.reload(); }
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Alt+CmdOrCtrl+I',
                    click: function() { global.whatsApp.window.toggleDevTools(); }
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'performMiniaturize:'
                },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'hide:'
                },
                { type: 'separator' },
                {
                    label: 'Bring All to Front',
                    role: 'arrangeInFront:'
                },
                {
                  label: 'Settings',
                  accelerator: 'CmdOrCtrl+,',
                  click: function () {
                    global.settings.init();
                  }
                }
            ]
        }
    ];
})(this);
