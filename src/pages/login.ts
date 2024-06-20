import * as m from "mithril";
import NaviBar from "../components/navbar";
import { processLogin } from "../helpers/api";
import css from "../../assets/css/pages/login.module.css";

const { div, button, form, label, input, h1, br } =
  require("hyperscript-helpers")(m);

const page = {
  view: function () {
    return div({class:css.page}, [
      m(NaviBar),
      div({class:css.loginForm}, [
        h1("Login"),
        form(
          {
            onsubmit: processLogin,
          },
          [
            div([
              label("Benutzername: "),
              br(),
              input({ type: "text" }),
            ]),
            br(),
            div([
              label("Password:"),
              br(),
              input({ type: "password" }),
            ]),
            br(),
            button("Submit"),
          ],
        ),
      ]),
    ]);
  },
};
export default page;
