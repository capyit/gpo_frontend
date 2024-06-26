"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m = require("mithril");
const navbar_1 = require("../components/navbar");
const participant_module_css_1 = require("../../assets/css/pages/participant.module.css");
const { div, br, h1, h2 } = require("hyperscript-helpers")(m);
const page = () => {
    const Participant = {
        data: [],
        loadlist: async function (id) {
            return m
                .request({
                method: "GET",
                url: await fetch('env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                }) + "/api/participant/" + id,
                withCredentials: true,
            })
                .then(function (result) {
                Participant.data = result;
            });
        },
    };
    const Match = {
        time: [],
        rank: [],
        name: [],
        load: async function (id) {
            return m
                .request({
                method: "GET",
                url: await fetch('env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                }) + "/api/match/" + id,
                withCredentials: true,
            })
                .then(function (result) {
                Match.time[id] = result["time"];
                Match.name[id] = result["name"];
                Match.rank[id] = result["participants"][m.route.param("id")];
            });
        },
    };
    return {
        view() {
            return div("." + participant_module_css_1.default.page, [
                m(navbar_1.default),
                [
                    div("." + participant_module_css_1.default.overview, {
                        key: m.route.param("id"),
                        async oninit() {
                            m.redraw();
                            Participant.data = [];
                            await Participant.loadlist(Number.parseInt(m.route.param("id")));
                        },
                    }, 0 == Participant.data.length
                        ? ""
                        : [
                            div("." + participant_module_css_1.default.participant, [
                                h1(Participant.data["name"]),
                                br(),
                                div("Startnummer: " + m.route.param("id")),
                                div("." + participant_module_css_1.default.matchTable, [
                                    div("." + participant_module_css_1.default.defRow, [
                                        div("." + participant_module_css_1.default.def, "Match"),
                                        div("." + participant_module_css_1.default.def, "Startzeit"),
                                        div("." + participant_module_css_1.default.def, "Rang"),
                                    ]),
                                    Participant.data["assignedMatches"].map((k) => [
                                        div("." + participant_module_css_1.default.entryRow, {
                                            async oninit() {
                                                await Match.load(k);
                                            },
                                        }, [
                                            div("." + participant_module_css_1.default.entry, m(m.route.Link, { href: "/match/" + k }, Match.name.at(k))),
                                            div("." + participant_module_css_1.default.entry, new Date(Match.time.at(k)).toTimeString().slice(0, 5)),
                                            div("." + participant_module_css_1.default.entry, Match.rank.at(k)),
                                        ]),
                                    ]),
                                ]),
                            ]),
                        ]),
                ],
            ]);
        },
    };
};
exports.default = page;
