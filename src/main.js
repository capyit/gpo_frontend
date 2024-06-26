"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var home_1 = require("./pages/home");
var room_view_1 = require("./pages/room-view");
var round_view_1 = require("./pages/round-view");
var login_1 = require("./pages/login");
var admin_1 = require("./pages/admin");
var match_1 = require("./pages/match");
var participant_1 = require("./pages/participant");
var non_sign_1 = require("./pages/non-sign");
var participants_1 = require("./pages/participants");
require("../assets/css/main.css");
require("normalize.css");
var el = document.getElementById("content");
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
