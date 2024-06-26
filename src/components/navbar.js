"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m = require("mithril");
const navbar_module_css_1 = require("../../assets/css/components/navbar.module.css");
const { div, a, img } = require("hyperscript-helpers")(m);
/*
 * @param newtab
 * @param href
 * @param color
 * @param icon
 * @param name
 */
const navbar = {
    view() {
        return div("." + navbar_module_css_1.default.navbar, [
            a({ href: "#!/" }, img("." + navbar_module_css_1.default.logo, { src: require("/assets/img/icon.png") })),
            img("." + navbar_module_css_1.default.fslogo, { src: require("/assets/img/FS_logo.jpg") }),
        ]);
    },
};
exports.default = navbar;
