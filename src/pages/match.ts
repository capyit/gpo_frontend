import * as m from "mithril";
import NaviBar from "../components/navbar";
import css from "../../assets/css/pages/match.module.css";
import Matchlist from "../components/matchlist";
import checkLogin from "../helpers/api";

const {div, br, h1, input, form, button} = require("hyperscript-helpers")(m);


const page = () => {
    let logged_in = false;
    const Round = {
        data: [],
        load: async function (id: number) {
            return m
                .request({
                    method: "GET",
                    url: (await fetch('/env.json').then(response => {
                        return response.json()
                    }).then((data) => {
                        return data.api_url
                    })) + "/api/round/" + id,
                    withCredentials: true,
                })
                .then(function (result: any) {
                    Round.data = result;
                });
        },
    };
    const Match = {
        data: [],
        loadlist: async function (id: number) {
            return m
                .request({
                    method: "GET",
                    url: (await fetch('/env.json').then(response => {
                        return response.json()
                    }).then((data) => {
                        return data.api_url
                    })) + "/api/match/" + id,
                    withCredentials: true,
                })
                .then(function (result: any) {
                    Match.data = result;
                });
        },
    };
    const NextMatch = {
        data: [],
        loadlist: async function (id: number, index: number) {
            return m
                .request({
                    method: "GET",
                    url: (await fetch('/env.json').then(response => {
                        return response.json()
                    }).then((data) => {
                        return data.api_url
                    })) + "/api/match/" + id,
                    withCredentials: true,
                })
                .then(function (result: any) {
                    NextMatch.data[index] = result.name;
                });
        },
    };
    const ParticipantName = {
        data: [],
        loadlist: async function (id: number) {
            ParticipantName.data = [];
            return m
                .request({
                    method: "GET",
                    url: (await fetch('/env.json').then(response => {
                        return response.json()
                    }).then((data) => {
                        return data.api_url
                    })) + "/api/participant/" + id,
                    withCredentials: true,
                })
                .then(function (result: any) {
                    ParticipantName.data[id] = result["name"];
                });
        },
    };
    const ParticipantCheckedIn = {
        data: [],
        loadlist: async function (id: number) {
            ParticipantCheckedIn.data = [];
            return m
                .request({
                    method: "GET",
                    url: (await fetch('/env.json').then(response => {
                        return response.json()
                    }).then((data) => {
                        return data.api_url
                    })) + "/api/participant/" + id,
                    withCredentials: true,
                })
                .then(function (result: any) {
                    ParticipantCheckedIn.data[id] = result["checkedIn"];
                });
        },
    };
    return {
        view() {
            return div("." + css.page, [
                m(NaviBar),
                [
                    div(
                        "." + css.overview,
                        {
                            key: m.route.param("id"),
                            async oninit() {
                                logged_in = await checkLogin();
                                m.redraw();
                                Match.data = [];
                                await Match.loadlist(Number.parseInt(m.route.param("id")));
                                await Round.load(Match.data["round"]);
                            },
                        },
                        0 == Match.data.length
                            ? ""
                            : [
                                div(
                                    "." + css.matchList,
                                    m(Matchlist, {
                                        id: Match.data["room"],
                                        objectType: "room",
                                        matchSelect: Number.parseInt(m.route.param("id")),
                                    }),
                                    m(Matchlist, {
                                        id: Match.data["round"],
                                        objectType: "round",
                                        matchSelect: Number.parseInt(m.route.param("id")),
                                    }),
                                ),
                                div("." + css.match, [
                                    h1(Match.data["name"]),
                                    "Startzeit: " +
                                    new Date(Match.data["time"]).toTimeString().slice(0, 5),
                                    br(),
                                    form(
                                        {
                                            async onsubmit(e: Event) {
                                                for (let i = 0; i < Match.data["competitorAmount"]; i++) {
                                                    if (e.target[i].value == "") {
                                                        continue
                                                    }
                                                    await m.request({
                                                        method: "PUT",
                                                        url: (await fetch('/env.json').then(response => {
                                                            return response.json()
                                                        }).then((data) => {
                                                            return data.api_url
                                                        })).concat(
                                                            "/api/match/" +
                                                            Number.parseInt(m.route.param("id")) +
                                                            "/participant/" +
                                                            e.target[i].id,
                                                            "/" +
                                                            e.target[i].value,
                                                        ),
                                                        withCredentials: true,
                                                        config: (xhr_1) => {
                                                            xhr_1.setRequestHeader(
                                                                "X-Requested-With",
                                                                "XMLHttpRequest",
                                                            );
                                                        },
                                                    });
                                                    m.redraw()
                                                }
                                            },
                                        },
                                        div("." + css.matchTable, [
                                            div("." + css.defRow, [
                                                div("." + css.def, "Teilnehmer"),
                                                div("." + css.def, "Rang"),
                                                div("." + css.def, "Nächstes Match"),
                                            ]),
                                            Object.keys(Match.data["participants"]).map((k) => [
                                                div(
                                                    "." + css.entryRow,
                                                    {
                                                        async oninit() {
                                                            await ParticipantName.loadlist(
                                                                Number.parseInt(k),
                                                            );
                                                            await ParticipantCheckedIn.loadlist(
                                                                Number.parseInt(k),
                                                            );
                                                            let nextMatch =
                                                                Match.data["nextMatches"][
                                                                    Match.data["participants"][k]
                                                                    ];
                                                            if (nextMatch != 0 && nextMatch != null) {
                                                                await NextMatch.loadlist(
                                                                    Number.parseInt(nextMatch),
                                                                    Number.parseInt(k),
                                                                );
                                                            } else if (
                                                                NextMatch.data.at(Number.parseInt(k)) != null
                                                            ) {
                                                                NextMatch.data[Number.parseInt(k)] = null;
                                                            }
                                                        },
                                                    },
                                                    [
                                                        div(
                                                            "." + css.entry,
                                                            ParticipantCheckedIn.data.at(Number.parseInt(k)) ?
                                                                m(
                                                                m.route.Link,
                                                                {href: "/participant/" + k},
                                                                ParticipantName.data.at(Number.parseInt(k)),
                                                            ):ParticipantName.data.at(Number.parseInt(k)),
                                                        ),
                                                        div(
                                                            "." + css.entry,
                                                            input({placeholder: Match.data["participants"][k], id: k}),
                                                        ),
                                                        div(
                                                            "." + css.entry,
                                                            NextMatch.data.at(Number.parseInt(k)) == null
                                                                ? "keins"
                                                                : m(
                                                                    m.route.Link,
                                                                    {
                                                                        href:
                                                                            "/match/" +
                                                                            Match.data["nextMatches"][
                                                                                Match.data["participants"][k]
                                                                                ],
                                                                    },
                                                                    NextMatch.data.at(Number.parseInt(k)),
                                                                ),
                                                        )
                                                    ],
                                                ),
                                            ]),
                                        ]),
                                        br(),
                                        !logged_in
                                            ? null
                                            : button("Submit"),
                                    ),
                                ]),
                            ],
                    ),
                ],
            ]);
        },
    };
};
export default page;
