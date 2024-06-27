import * as m from "mithril";
import NaviBar from "../components/navbar";
import css from "../../assets/css/pages/participants.module.css";

const { div, input, h1, button, form } = require("hyperscript-helpers")(m);

const page = () => {
  const Participants = {
    checked_in: [],
    checked_out: [],
    load: async function () {
      return m
          .request({
            method: "GET",
            url: await fetch(window.location.origin+'/env.json').then(response => {
              return response.json()
            }).then((data) => {
              return data.api_url
            }) + "/api/participants",
            withCredentials: true,
          })
          .then(
              function (result: any) {
                Participants.checked_in = result.filter(item => item.checkedIn == true);
                Participants.checked_out = result.filter(item => item.checkedIn == false);
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
          h1("Teilnehmende"),
          div("." + css.participantsTable, [
            div("." + css.defRow, [
              div("." + css.def, "Startnummer"),
              div("." + css.def, "Teilnehmende"),
            ]),
            Participants.checked_in.map((k) => {
              return div("." + css.entryRow, [
                div("." + css.entry, k["id"]),
                m(
                    m.route.Link,
                    { href: "/participant/" + k["id"], class: css.entry },
                    k["name"],
                )
              ]);
            }),
            Participants.checked_out.map((k) => {
              return div("." + css.entryRow, [
                div("." + css.entry, k["id"]),
                div("." + css.entry,k["name"])
              ]);
            }),
          ]),
        ]),
      ]);
    },
  };
};
export default page;
