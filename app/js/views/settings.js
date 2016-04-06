var whatsApp = require('remote').getGlobal("whatsApp");
var settings = require('remote').getGlobal('settings');
var config = require('remote').getGlobal('config');

var SettingsView = {
    bindEvents() {
        $this = this;
        $("#save-button").on("click", (e) => {
            e.preventDefault();
            if ($(".invalid").length > 0 ) {
                return;
            }
            $this.saveSettings();
            settings.window.close();
        });

        $("#close-button").on("click", () => {
            settings.window.close();
        });

        $("#useProxy").on("change", () => {
            $("#httpProxy").prop("disabled", !($("#useProxy").is(":checked")));
            $("#httpsProxy").prop("disabled", !($("#useProxy").is(":checked")));
        });
    },

    init() {
        $("#avatars").attr("checked", config.get("hideAvatars"));
        $("#previews").attr("checked", config.get("hidePreviews"));
        if (config.get("thumbSize")) {
            $("#thumb-size").val(config.get("thumbSize"));
        }
        $("#useProxy").attr("checked", config.get("useProxy"));
        $("#httpProxy").val(config.get("httpProxy"));
        $("#httpsProxy").val(config.get("httpsProxy"));
        $("#httpProxy").prop("disabled", !($("#useProxy").is(":checked")));
        $("#httpsProxy").prop("disabled", !($("#useProxy").is(":checked")));

        this.bindEvents();
    },

    saveSettings() {
        config.set("hideAvatars", $("#avatars").is(":checked"));
        config.set("hidePreviews", $("#previews").is(":checked"));
        config.set("thumbSize", parseInt($("#thumb-size").val(), 10));
        if ($("#useProxy").is(":checked")) {
            config.set("useProxy", $("#useProxy").is(":checked"));
            config.set("httpProxy", $("#httpProxy").val());
            config.set("httpsProxy", $("#httpsProxy").val());
        } else {
            config.unSet("useProxy");
            config.unSet("httpProxy");
            config.unSet("httpsProxy");
        }
        config.saveConfiguration();
        config.applyConfiguration();
        whatsApp.window.reload();
    }
};

$(document).ready(() => {
    SettingsView.init();
});
