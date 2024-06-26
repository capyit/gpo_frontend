import * as m from "mithril";
import NaviBar from "../components/navbar";
import css from "../../assets/css/pages/participants.module.css";

const { div, input, h1, button, form } = require("hyperscript-helpers")(m);

const page = () => {
  const Participants = {
    list: [],
    load: async function () {
      return m
          .request({
            method: "GET",
            url: await fetch('env.json').then(response => {
              return response.json()
            }).then((data) => {
              return data.api_url
            }) + "/api/participants/check",
            withCredentials: true,
          })
          .then(
              function (result: any) {
                Participants.list = result;
              },
              function (error) {
                console.log(error);
              },
          );
    },
  };
  return {
    async oninit() {
      await Participants.load();
    },

    view() {
      return div("." + css.page, [
        m(NaviBar),
        div("." + css.overview, [
          h1("Noch nicht angemeldet"),
          div("." + css.participantsTable, [
            div("." + css.defRow, [
              div("." + css.def, "Startnummer"),
              div("." + css.def, "Teilnehmer"),
              div("." + css.def, "Anmeldung"),
            ]),
            Participants.list.map((k) => {
              return div("." + css.entryRow, [
                div("." + css.entry, k["id"]),
                div("." + css.entry, k["name"]),
                div(
                  "." + css.entry,
                  button(
                    {
                      async onclick() {
                        await m.request({
                          method: "PUT",
                          url:
                            window.location.origin +
                            "/api/participant/" +
                            Number.parseInt(k["id"]),
                          withCredentials: true,
                          config: (xhr_1) => {
                            xhr_1.setRequestHeader(
                              "X-Requested-With",
                              "XMLHttpRequest",
                            );
                          },
                        });
                        window.location.reload();
                      },
                    },
                    "Anmelden",
                  ),
                ),
              ]);
            }),
          ]),
        ]),
      ]);
    },
  };
};
export default page;
