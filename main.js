(function(scope) {
    "use strict";

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

    var app = require('app');
    var fileSystem = require('fs');
    var whatsApp = require('./app/main');

    app.on('ready', function() {
        whatsApp.init();
    });

})(this);