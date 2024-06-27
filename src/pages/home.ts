import * as m from "mithril";
import NavBar from "../components/navbar";
import checkLogin from "../helpers/api";
import css from "../../assets/css/pages/home.module.css";

const { div } = require("hyperscript-helpers")(m);

const page = {
  logged_in: false,
  async oninit() {
    page.logged_in = await checkLogin();
  },
  view() {
    return div('.'+css.page,[
          m(NavBar),
          div("." + css.views, [
            div(
              "." + css.view,
              {
                onclick () {
                  m.route.set("/runden");
                },
              },
              "Rundenansicht",
            ),
            div(
              "." + css.view,
              {
                onclick: function () {
                  m.route.set("/raeume");
                },
              },
              "Räumeansicht",
            ),
              !page.logged_in
                  ? null
                  : div(
                  "." + css.view,
                  {
                      onclick: function () {
                          m.route.set("/non-sign");
                      },
                  },
                  "Anmeldung",
              ),
              div(
                  "." + css.view,
                  {
                      onclick: function () {
                          m.route.set("/participants");
                      },
                  },
                  "Teilnehmende",
              ),
          ]),
        ]);
  },
};
export default page;
