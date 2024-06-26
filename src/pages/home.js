"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m = require("mithril");
const navbar_1 = require("../components/navbar");
const api_1 = require("../helpers/api");
const home_module_css_1 = require("../../assets/css/pages/home.module.css");
const { div } = require("hyperscript-helpers")(m);
const page = {
    logged_in: false,
    async oninit() {
        page.logged_in = await (0, api_1.default)();
    },
    view() {
        return div('.' + home_module_css_1.default.page, [
            m(navbar_1.default),
            div("." + home_module_css_1.default.views, [
                div("." + home_module_css_1.default.view, {
                    onclick() {
                        m.route.set("/runden");
                    },
                }, "Rundenansicht"),
                div("." + home_module_css_1.default.view, {
                    onclick: function () {
                        m.route.set("/raeume");
                    },
                }, "Räumeansicht"),
                !page.logged_in
                    ? null
                    : div("." + home_module_css_1.default.view, {
                        onclick: function () {
                            m.route.set("/non-sign");
                        },
                    }, "Anmeldung"),
                div("." + home_module_css_1.default.view, {
                    onclick: function () {
                        m.route.set("/participants");
                    },
                }, "Teilnehmer"),
            ]),
        ]);
    },
};
exports.default = page;
