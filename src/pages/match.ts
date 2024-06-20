import * as m from "mithril";
import NaviBar from "../components/navbar";
import css from "../../assets/css/pages/match.module.css";
import Matchlist from "../components/matchlist";

const { div, br, h1, input, form, button } = require("hyperscript-helpers")(m);

const page = () => {
  const Round = {
    data: [],
    load: function (id: number) {
      return m
        .request({
          method: "GET",
          url: window.location.origin + "/api/round/" + id,
          withCredentials: true,
        })
        .then(function (result: any) {
          Round.data = result;
        });
    },
  };
  const Match = {
    data: [],
    loadlist: function (id: number) {
      return m
        .request({
          method: "GET",
          url: window.location.origin + "/api/match/" + id,
          withCredentials: true,
        })
        .then(function (result: any) {
          Match.data = result;
        });
    },
  };
  const NextMatch = {
    data: [],
    loadlist: function (id: number, index: number) {
      return m
        .request({
          method: "GET",
          url: window.location.origin + "/api/match/" + id,
          withCredentials: true,
        })
        .then(function (result: any) {
          NextMatch.data[index] = result.name;
        });
    },
  };
  const ParticipantName = {
    data: [],
    loadlist: function (id: number) {
      ParticipantName.data = [];
      return m
        .request({
          method: "GET",
          url: window.location.origin + "/api/participant/" + id,
          withCredentials: true,
        })
        .then(function (result: any) {
          ParticipantName.data[id] = result["name"];
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
                              if(e.target[i].value == "" ){continue}
                              await m.request({
                                  method: "PUT",
                                  url: window.location.origin.concat(
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
                                m(
                                  m.route.Link,
                                  { href: "/participant/" + k },
                                  ParticipantName.data.at(Number.parseInt(k)),
                                ),
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
                      button("Submit"),
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
