"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m = require("mithril");
const navbar_1 = require("../components/navbar");
const api_1 = require("../helpers/api");
const login_module_css_1 = require("../../assets/css/pages/login.module.css");
const { div, button, form, label, input, h1, br } = require("hyperscript-helpers")(m);
const page = {
    view: function () {
        return div({ class: login_module_css_1.default.page }, [
            m(navbar_1.default),
            div({ class: login_module_css_1.default.loginForm }, [
                h1("Login"),
                form({
                    onsubmit: api_1.processLogin,
                }, [
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
                ]),
            ]),
        ]);
    },
};
exports.default = page;
