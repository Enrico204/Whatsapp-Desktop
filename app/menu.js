(function(scope) {
    "use strict";

    module.exports = [
        {
            label: 'WhatsApp Desktop',
            submenu: [
                {
                    label: 'About WhatsApp',
                    selector: 'orderFrontStandardAboutPanel:'
                },
                { type: 'separator' },
                {
                    label: 'Hide WhatsApp',
                    accelerator: 'CmdOrCtrl+H',
                    selector: 'hide:'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'CmdOrCtrl+Shift+H',
                    selector: 'hideOtherApplications:'
                },
                {
                    label: 'Show All',
                    selector: 'unhideAllApplications:'
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    selector: 'terminate:'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    selector: 'undo:'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    selector: 'redo:'
                },
                { type: 'separator' },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    selector: 'cut:'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    selector: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    selector: 'paste:'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    selector: 'selectAll:'
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
                    selector: 'performMiniaturize:'
                },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    selector: 'hide:'
                },
                { type: 'separator' },
                {
                    label: 'Bring All to Front',
                    selector: 'arrangeInFront:'
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
