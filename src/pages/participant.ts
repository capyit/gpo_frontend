import * as m from "mithril";
import NaviBar from "../components/navbar";
import css from "../../assets/css/pages/participant.module.css";
import Matchlist from "../components/matchlist";

const { div, br, h1, h2 } = require("hyperscript-helpers")(m);

const page = () => {
  const Participant = {
    data: [],
    loadlist: async function (id: number) {
        return m
            .request({
                method: "GET",
                url: await fetch('env.json').then(response => {
                    return response.json()
                }).then((data) => {
                    return data.api_url
                }) + "/api/participant/" + id,
                withCredentials: true,
            })
            .then(function (result: any) {
                Participant.data = result;
            });
    },
  };
    const RoomName = {
        data: [],
        load: async function (id: number) {
            RoomName.data = [];
            return m
                .request({
                    method: "GET",
                    url: (await fetch('/env.json').then(response => {
                        return response.json()
                    }).then((data) => {
                        return data.api_url
                    })) + "/api/room/" + id,
                    withCredentials: true,
                })
                .then(function (result: any) {
                    RoomName.data[id] = result["name"];
                });
        },
    };
  const Match = {
    time: [],
    rank: [],
    name: [],
    room: [],
    load: async function (id: number) {
        return m
            .request({
                method: "GET",
                url: await fetch('env.json').then(response => {
                    return response.json()
                }).then((data) => {
                    return data.api_url
                }) + "/api/match/" + id,
                withCredentials: true,
            })
            .then(function (result: any) {
                Match.time[id] = result["time"];
                Match.name[id] = result["name"];
                Match.rank[id] = result["participants"][m.route.param("id")];
                Match.room[id] = result["room"];
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
                Participant.data = [];
                await Participant.loadlist(
                  Number.parseInt(m.route.param("id")),
                );
              },
            },
            0 == Participant.data.length
              ? ""
              : [
                  div("." + css.participant, [
                    h1(Participant.data["name"]),
                    br(),
                    div("Startnummer: "+m.route.param("id")),
                    div("." + css.matchTable, [
                      div("." + css.defRow, [
                        div("." + css.def, "Match"),
                          div("." + css.def, "Raum"),
                        div("." + css.def, "Startzeit"),
                        div("." + css.def, "Rang"),
                      ]),
                      Participant.data["assignedMatches"].map((k: number) => [
                        div(
                            "." + css.entryRow,
                            {
                              async oninit() {
                                await Match.load(k);
                                await RoomName.load(Match.room.at(k))
                              },
                            },
                            [
                              div("." + css.entry,
                                  m(
                                      m.route.Link,
                                      {href: "/match/"+k},
                                      Match.name.at(k))
                              ),
                              div("." + css.entry, RoomName.data[Match.room.at(k)]),
                              div("." + css.entry, new Date(Match.time.at(k)).toTimeString().slice(0, 5)),
                              div("." + css.entry, Match.rank.at(k)),
                            ],
                        ),
                      ]),
                    ]),
                  ]),
                ],
          ),
        ],
      ]);
    },
  };
};
export default page;
