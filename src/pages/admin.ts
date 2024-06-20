import * as m from "mithril";
import NaviBar from "../components/navbar";

const { div } = require("hyperscript-helpers")(m);

const page = {
  view: function () {
    return div(".page.admin", [m(NaviBar)]);
  },
};
export default page;
