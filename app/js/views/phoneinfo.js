var whatsApp = require('electron').remote.getGlobal("whatsApp");
var phoneinfo = require('electron').remote.getGlobal('phoneinfo');

var PhoneInfoView = {
    bindEvents() {
        $this = this;
        $("#close-button").on("click", () => {
            phoneinfo.window.close();
        });
    },

    init() {
        console.log(phoneinfo);
        if (phoneinfo.infos != null) {
            $("#me").html(phoneinfo.infos.me);
            $("#battery").html(phoneinfo.infos.battery + "% (" + (phoneinfo.infos.plugged ? "charging" : "discharging") + ")");
            $("#platform").html(phoneinfo.infos.platform);
            $("#manufacturer").html(phoneinfo.infos.phone.manufacturer);
            $("#model").html(phoneinfo.infos.phone.model);
            $("#os_version").html(phoneinfo.infos.phone.os_version);
            $("#wa_version").html(phoneinfo.infos.phone.wa_version);
            $("#os_build_number").html(phoneinfo.infos.phone.os_build_number);
        } else {
            $("#me").html("Not available, try to refresh this page");
        }
        this.bindEvents();
    }
};

$(document).ready(() => {
    PhoneInfoView.init();
});
