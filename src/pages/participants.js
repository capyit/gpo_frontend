"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m = require("mithril");
const navbar_1 = require("../components/navbar");
const participants_module_css_1 = require("../../assets/css/pages/participants.module.css");
const { div, input, h1, button, form } = require("hyperscript-helpers")(m);
const page = () => {
    const Participants = {
        checked_in: [],
        checked_out: [],
        load: async function () {
            return m
                .request({
                method: "GET",
                url: await fetch('env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                }) + "/api/participants",
                withCredentials: true,
            })
                .then(function (result) {
                Participants.checked_in = result.filter(item => item.checkedIn == true);
                Participants.checked_out = result.filter(item => item.checkedIn == false);
            }, function (error) {
                console.log(error);
            });
        },
    };
    return {
        async oninit() {
            await Participants.load();
        },
        view() {
            return div("." + participants_module_css_1.default.page, [
                m(navbar_1.default),
                div("." + participants_module_css_1.default.overview, [
                    h1("Teilnehmer"),
                    div("." + participants_module_css_1.default.participantsTable, [
                        div("." + participants_module_css_1.default.defRow, [
                            div("." + participants_module_css_1.default.def, "Startnummer"),
                            div("." + participants_module_css_1.default.def, "Teilnehmer"),
                        ]),
                        Participants.checked_in.map((k) => {
                            return div("." + participants_module_css_1.default.entryRow, [
                                div("." + participants_module_css_1.default.entry, k["id"]),
                                m(m.route.Link, { href: "/participant/" + k["id"], class: participants_module_css_1.default.entry }, k["name"])
                            ]);
                        }),
                        Participants.checked_out.map((k) => {
                            return div("." + participants_module_css_1.default.entryRow, [
                                div("." + participants_module_css_1.default.entry, k["id"]),
                                div("." + participants_module_css_1.default.entry, k["name"])
                            ]);
                        }),
                    ]),
                ]),
            ]);
        },
    };
};
exports.default = page;
