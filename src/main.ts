import * as m from "mithril";
import HomeView from "./pages/home";
import RoomView from "./pages/room-view";
import RoundView from "./pages/round-view";
import LoginView from "./pages/login";
import AdminView from "./pages/admin";
import MatchView from "./pages/match"
import ParticipantView from "./pages/participant"
import NonSignView from "./pages/non-sign"
import ParticipantsView from "./pages/participants"
import "../assets/css/main.css";
import Environment from "../assets/env.json";

require("normalize.css");

const api_URL = Environment.api_url

const el = document.getElementById("content")
m.route(el, "/home", {
  "/home": HomeView,
  "/raeume": RoomView,
  "/runden": RoundView,
  "/participant/:id": ParticipantView,
  "/non-sign": NonSignView,
  "/participants": ParticipantsView,
  "/login": LoginView,
  "/admin": AdminView,
  "/match/:id" : MatchView,
})