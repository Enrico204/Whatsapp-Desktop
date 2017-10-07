var whatsApp = require('electron').remote.getGlobal("whatsApp");
var pjson = require('electron').remote.getGlobal('pjson');

$(document).ready(() => {
    $("#appversion").html(pjson["version"]);
    if (whatsApp.newVersion == null) {
        $("#appupdates").html("Unable to verify latest version from GitHub - please close and reopen this window");
    } else if (whatsApp.newVersion != "v"+pjson.version) {
        $("#appupdates").html("A new version is available: " + whatsApp.newVersion + "!");
    } else if (whatsApp.newVersion == "v"+pjson.version) {
        $("#appupdates").html("You're using latest version");
    }
});
