"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m = require("mithril");
const navbar_1 = require("../components/navbar");
const match_module_css_1 = require("../../assets/css/pages/match.module.css");
const matchlist_1 = require("../components/matchlist");
const api_1 = require("../helpers/api");
const { div, br, h1, input, form, button } = require("hyperscript-helpers")(m);
const page = () => {
    let logged_in = false;
    const Round = {
        data: [],
        load: async function (id) {
            return m
                .request({
                method: "GET",
                url: (await fetch('/env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                })) + "/api/round/" + id,
                withCredentials: true,
            })
                .then(function (result) {
                Round.data = result;
            });
        },
    };
    const Match = {
        data: [],
        loadlist: async function (id) {
            return m
                .request({
                method: "GET",
                url: (await fetch('/env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                })) + "/api/match/" + id,
                withCredentials: true,
            })
                .then(function (result) {
                Match.data = result;
            });
        },
    };
    const NextMatch = {
        data: [],
        loadlist: async function (id, index) {
            return m
                .request({
                method: "GET",
                url: (await fetch('/env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                })) + "/api/match/" + id,
                withCredentials: true,
            })
                .then(function (result) {
                NextMatch.data[index] = result.name;
            });
        },
    };
    const ParticipantName = {
        data: [],
        loadlist: async function (id) {
            ParticipantName.data = [];
            return m
                .request({
                method: "GET",
                url: (await fetch('/env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                })) + "/api/participant/" + id,
                withCredentials: true,
            })
                .then(function (result) {
                ParticipantName.data[id] = result["name"];
            });
        },
    };
    return {
        view() {
            return div("." + match_module_css_1.default.page, [
                m(navbar_1.default),
                [
                    div("." + match_module_css_1.default.overview, {
                        key: m.route.param("id"),
                        async oninit() {
                            logged_in = await (0, api_1.default)();
                            m.redraw();
                            Match.data = [];
                            await Match.loadlist(Number.parseInt(m.route.param("id")));
                            await Round.load(Match.data["round"]);
                        },
                    }, 0 == Match.data.length
                        ? ""
                        : [
                            div("." + match_module_css_1.default.matchList, m(matchlist_1.default, {
                                id: Match.data["room"],
                                objectType: "room",
                                matchSelect: Number.parseInt(m.route.param("id")),
                            }), m(matchlist_1.default, {
                                id: Match.data["round"],
                                objectType: "round",
                                matchSelect: Number.parseInt(m.route.param("id")),
                            })),
                            div("." + match_module_css_1.default.match, [
                                h1(Match.data["name"]),
                                "Startzeit: " +
                                    new Date(Match.data["time"]).toTimeString().slice(0, 5),
                                br(),
                                form({
                                    async onsubmit(e) {
                                        for (let i = 0; i < Match.data["competitorAmount"]; i++) {
                                            if (e.target[i].value == "") {
                                                continue;
                                            }
                                            await m.request({
                                                method: "PUT",
                                                url: window.location.origin.concat("/api/match/" +
                                                    Number.parseInt(m.route.param("id")) +
                                                    "/participant/" +
                                                    e.target[i].id, "/" +
                                                    e.target[i].value),
                                                withCredentials: true,
                                                config: (xhr_1) => {
                                                    xhr_1.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                                                },
                                            });
                                            m.redraw();
                                        }
                                    },
                                }, div("." + match_module_css_1.default.matchTable, [
                                    div("." + match_module_css_1.default.defRow, [
                                        div("." + match_module_css_1.default.def, "Teilnehmer"),
                                        div("." + match_module_css_1.default.def, "Rang"),
                                        div("." + match_module_css_1.default.def, "Nächstes Match"),
                                    ]),
                                    Object.keys(Match.data["participants"]).map((k) => [
                                        div("." + match_module_css_1.default.entryRow, {
                                            async oninit() {
                                                await ParticipantName.loadlist(Number.parseInt(k));
                                                let nextMatch = Match.data["nextMatches"][Match.data["participants"][k]];
                                                if (nextMatch != 0 && nextMatch != null) {
                                                    await NextMatch.loadlist(Number.parseInt(nextMatch), Number.parseInt(k));
                                                }
                                                else if (NextMatch.data.at(Number.parseInt(k)) != null) {
                                                    NextMatch.data[Number.parseInt(k)] = null;
                                                }
                                            },
                                        }, [
                                            div("." + match_module_css_1.default.entry, m(m.route.Link, { href: "/participant/" + k }, ParticipantName.data.at(Number.parseInt(k)))),
                                            div("." + match_module_css_1.default.entry, input({ placeholder: Match.data["participants"][k], id: k })),
                                            div("." + match_module_css_1.default.entry, NextMatch.data.at(Number.parseInt(k)) == null
                                                ? "keins"
                                                : m(m.route.Link, {
                                                    href: "/match/" +
                                                        Match.data["nextMatches"][Match.data["participants"][k]],
                                                }, NextMatch.data.at(Number.parseInt(k))))
                                        ]),
                                    ]),
                                ]), br(), !logged_in
                                    ? null
                                    : button("Submit")),
                            ]),
                        ]),
                ],
            ]);
        },
    };
};
exports.default = page;
