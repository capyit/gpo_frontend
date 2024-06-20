"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var navbar_module_css_1 = require("../../assets/css/components/navbar.module.css");
var _a = require("hyperscript-helpers")(m), div = _a.div, a = _a.a, img = _a.img;
/*
 * @param newtab
 * @param href
 * @param color
 * @param icon
 * @param name
 */
var navbar = {
    view: function () {
        return div("." + navbar_module_css_1.default.navbar, [
            a({ href: "#!/" }, img("." + navbar_module_css_1.default.logo, { src: require("/assets/img/icon.png") })),
            img("." + navbar_module_css_1.default.fslogo, { src: require("/assets/img/FS_logo.jpg") }),
        ]);
    },
};
exports.default = navbar;
