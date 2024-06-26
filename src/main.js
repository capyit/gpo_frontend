"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m = require("mithril");
const home_1 = require("./pages/home");
const room_view_1 = require("./pages/room-view");
const round_view_1 = require("./pages/round-view");
const login_1 = require("./pages/login");
const admin_1 = require("./pages/admin");
const match_1 = require("./pages/match");
const participant_1 = require("./pages/participant");
const non_sign_1 = require("./pages/non-sign");
const participants_1 = require("./pages/participants");
require("../assets/css/main.css");
require("../assets/env.json");
require("normalize.css");
const el = document.getElementById("content");
m.route(el, "/home", {
    "/home": home_1.default,
    "/raeume": room_view_1.default,
    "/runden": round_view_1.default,
    "/participant/:id": participant_1.default,
    "/non-sign": non_sign_1.default,
    "/participants": participants_1.default,
    "/login": login_1.default,
    "/admin": admin_1.default,
    "/match/:id": match_1.default,
});
