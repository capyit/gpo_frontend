import * as m from "mithril";
import NaviBar from "../components/navbar";
import css from "../../assets/css/pages/round-view.module.css";
import Matchlist from "../components/matchlist";

const { div } = require("hyperscript-helpers")(m);

const page = () => {
    const Round = {
        list: [],
        load: function () {
            return m
                .request({
                    method: "GET",
                    url: window.location.origin + "/api/rounds",
                    withCredentials: true,
                })
                .then(
                    function (result: any) {
                        Round.list = result;
                    },
                    function (error) {
                        console.log(error);
                    },
                );
        },
    };
    return {
        async oninit() {
            await Round.load();
        },

        view() {
            return div("." + css.page, [
                m(NaviBar),
                div("." + css.overview, [
                    Round.list.map(function (round: any) {
                        return m(Matchlist, {
                            id: round.id,
                            objectType: "round",
                        });
                    }),
                ]),
            ]);
        },
    };
};
export default page;
