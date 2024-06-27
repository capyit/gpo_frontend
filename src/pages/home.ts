import * as m from "mithril";
import NavBar from "../components/navbar";
import checkLogin from "../helpers/api";
import css from "../../assets/css/pages/home.module.css";

const {div, table, tbody, thead, tr, td, th} = require("hyperscript-helpers")(m);

const page = {
    logged_in: false,
    async oninit() {
        page.logged_in = await checkLogin();
    },
    view() {
        return div('.' + css.page, [
            m(NavBar),
            div("." + css.content, [
                div("." + css.views, [
                    div(
                        "." + css.view,
                        {
                            onclick() {
                                m.route.set("/runden");
                            },
                        },
                        "Rundenansicht",
                    ),
                    div(
                        "." + css.view,
                        {
                            onclick: function () {
                                m.route.set("/raeume");
                            },
                        },
                        "Räumeansicht",
                    ),
                    !page.logged_in
                        ? null
                        : div(
                            "." + css.view,
                            {
                                onclick: function () {
                                    m.route.set("/non-sign");
                                },
                            },
                            "Anmeldung",
                        ),
                    div(
                        "." + css.view,
                        {
                            onclick: function () {
                                m.route.set("/participants");
                            },
                        },
                        "Teilnehmende",
                    ),
                ]),
                table(
                    thead(
                        tr([
                            th("Slot"),
                            th("Zeit")])
                    ),
                    tbody(
                        tr([
                            td("Anmeldung"),
                            td("18:00 - 18:30 Uhr")
                        ]),
                        tr([
                            td("1. Vorrunde, Match 1"),
                            td("18:30 - 18:50 Uhr")
                        ]),
                        tr([
                            td("1. Vorrunde, Match 2"),
                            td("18:50 - 19:10 Uhr")
                        ]),
                        tr([
                            td("1. Vorrunde, Match 3"),
                            td("19:10 - 19:30 Uhr")
                        ]),
                        tr([
                            td("1. Vorrunde, Match 4"),
                            td("19:30 - 19:50 Uhr")
                        ]),
                        tr([
                            td("Pause"),
                            td("19:50 - 20:00 Uhr")
                        ]),
                        tr([
                            td("2. Vorrunde, Match 1"),
                            td("20:00 - 20:20 Uhr")
                        ]),
                        tr([
                            td("2. Vorrunde, Match 2"),
                            td("20:20 - 20:40 Uhr")
                        ]),
                        tr([
                            td("Pause"),
                            td("20:40 - 20:50 Uhr")
                        ]),
                        tr([
                            td("Viertelfinale"),
                            td("20:50 - 21:10 Uhr")
                        ]),
                        tr([
                            td("Pause"),
                            td("21:10 - 21:25 Uhr")
                        ]),
                        tr([
                            td("Halbfinale"),
                            td("21:25 - 21:45 Uhr")
                        ]),
                        tr([
                            td("Pause"),
                            td("21:45 - 22:00 Uhr")
                        ]),
                        tr([
                            td("Finale"),
                            td("ab 22:00 Uhr")
                        ])
                    ))
            ])

        ]);
    },
};
export default page;
