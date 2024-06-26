import * as m from "mithril";
import NaviBar from "../components/navbar";
import css from "../../assets/css/pages/room-view.module.css";
import Matchlist from "../components/matchlist";

const { div } = require("hyperscript-helpers")(m);

const page = () => {
  const Room = {
    list: [],
    load: async function () {
      return m
          .request({
            method: "GET",
            url: await fetch(window.location.origin+'/env.json').then(response => {
              return response.json()
            }).then((data) => {
              return data.api_url
            }) + "/api/rooms",
            withCredentials: true,
          })
          .then(
              function (result: any) {
                Room.list = result;
              },
              function (error) {
                console.log(error);
              },
          );
    },
  };
  return {
    async oninit() {
      await Room.load();
    },

    view() {
      return div("." + css.page, [
        m(NaviBar),
        div("." + css.overview, [
          Room.list.map(function (room: any) {
            return m(Matchlist, {
              id: room.id,
              objectType: "room"
            });
          }),
        ]),
      ]);
    },
  };
};
export default page;
