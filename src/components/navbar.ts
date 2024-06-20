import * as m from "mithril";
import css from "../../assets/css/components/navbar.module.css";

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
    return div("." + css.navbar, [
      a({ href: "#!/" }, img("." + css.logo, { src: require("/assets/img/icon.png") })),
      img("." + css.fslogo, { src: require("/assets/img/FS_logo.jpg") }),
    ]);
  },
};

export default navbar;
