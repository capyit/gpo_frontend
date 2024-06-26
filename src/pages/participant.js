"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var navbar_1 = require("../components/navbar");
var participant_module_css_1 = require("../../assets/css/pages/participant.module.css");
var _a = require("hyperscript-helpers")(m), div = _a.div, br = _a.br, h1 = _a.h1, h2 = _a.h2;
var page = function () {
    var Participant = {
        data: [],
        loadlist: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = m)
                                .request;
                            _c = {
                                method: "GET"
                            };
                            return [4 /*yield*/, fetch('env.json').then(function (response) {
                                    return response.json();
                                }).then(function (data) {
                                    return data.api_url;
                                })];
                        case 1: return [2 /*return*/, _b.apply(_a, [(_c.url = (_d.sent()) + "/api/participant/" + id,
                                    _c.withCredentials = true,
                                    _c)])
                                .then(function (result) {
                                Participant.data = result;
                            })];
                    }
                });
            });
        },
    };
    var Match = {
        time: [],
        rank: [],
        name: [],
        load: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = m)
                                .request;
                            _c = {
                                method: "GET"
                            };
                            return [4 /*yield*/, fetch('env.json').then(function (response) {
                                    return response.json();
                                }).then(function (data) {
                                    return data.api_url;
                                })];
                        case 1: return [2 /*return*/, _b.apply(_a, [(_c.url = (_d.sent()) + "/api/match/" + id,
                                    _c.withCredentials = true,
                                    _c)])
                                .then(function (result) {
                                Match.time[id] = result["time"];
                                Match.name[id] = result["name"];
                                Match.rank[id] = result["participants"][m.route.param("id")];
                            })];
                    }
                });
            });
        },
    };
    return {
        view: function () {
            return div("." + participant_module_css_1.default.page, [
                m(navbar_1.default),
                [
                    div("." + participant_module_css_1.default.overview, {
                        key: m.route.param("id"),
                        oninit: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            m.redraw();
                                            Participant.data = [];
                                            return [4 /*yield*/, Participant.loadlist(Number.parseInt(m.route.param("id")))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                    }, 0 == Participant.data.length
                        ? ""
                        : [
                            div("." + participant_module_css_1.default.participant, [
                                h1(Participant.data["name"]),
                                br(),
                                div("Startnummer: " + m.route.param("id")),
                                div("." + participant_module_css_1.default.matchTable, [
                                    div("." + participant_module_css_1.default.defRow, [
                                        div("." + participant_module_css_1.default.def, "Match"),
                                        div("." + participant_module_css_1.default.def, "Startzeit"),
                                        div("." + participant_module_css_1.default.def, "Rang"),
                                    ]),
                                    Participant.data["assignedMatches"].map(function (k) { return [
                                        div("." + participant_module_css_1.default.entryRow, {
                                            oninit: function () {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, Match.load(k)];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                });
                                            },
                                        }, [
                                            div("." + participant_module_css_1.default.entry, m(m.route.Link, { href: "/match/" + k }, Match.name.at(k))),
                                            div("." + participant_module_css_1.default.entry, new Date(Match.time.at(k)).toTimeString().slice(0, 5)),
                                            div("." + participant_module_css_1.default.entry, Match.rank.at(k)),
                                        ]),
                                    ]; }),
                                ]),
                            ]),
                        ]),
                ],
            ]);
        },
    };
};
exports.default = page;
