"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var navbar_1 = require("../components/navbar");
var api_1 = require("../helpers/api");
var login_module_css_1 = require("../../assets/css/pages/login.module.css");
var _a = require("hyperscript-helpers")(m), div = _a.div, button = _a.button, form = _a.form, label = _a.label, input = _a.input, h1 = _a.h1, br = _a.br;
var page = {
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
