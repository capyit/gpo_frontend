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
var match_module_css_1 = require("../../assets/css/pages/match.module.css");
var matchlist_1 = require("../components/matchlist");
var _a = require("hyperscript-helpers")(m), div = _a.div, br = _a.br, h1 = _a.h1, input = _a.input, form = _a.form, button = _a.button;
var api_url = await fetch('env.json').then(function (response) {
    return response.json();
}).then(function (data) {
    return data.api_url;
});
var page = function () {
    var Round = {
        data: [],
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
                        case 1: return [2 /*return*/, _b.apply(_a, [(_c.url = (_d.sent()) + "/api/round/" + id,
                                    _c.withCredentials = true,
                                    _c)])
                                .then(function (result) {
                                Round.data = result;
                            })];
                    }
                });
            });
        },
    };
    var Match = {
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
                        case 1: return [2 /*return*/, _b.apply(_a, [(_c.url = (_d.sent()) + "/api/match/" + id,
                                    _c.withCredentials = true,
                                    _c)])
                                .then(function (result) {
                                Match.data = result;
                            })];
                    }
                });
            });
        },
    };
    var NextMatch = {
        data: [],
        loadlist: function (id, index) {
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
                                NextMatch.data[index] = result.name;
                            })];
                    }
                });
            });
        },
    };
    var ParticipantName = {
        data: [],
        loadlist: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            ParticipantName.data = [];
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
                                ParticipantName.data[id] = result["name"];
                            })];
                    }
                });
            });
        },
    };
    return {
        view: function () {
            return div("." + match_module_css_1.default.page, [
                m(navbar_1.default),
                [
                    div("." + match_module_css_1.default.overview, {
                        key: m.route.param("id"),
                        oninit: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            m.redraw();
                                            Match.data = [];
                                            return [4 /*yield*/, Match.loadlist(Number.parseInt(m.route.param("id")))];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, Round.load(Match.data["round"])];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                    }, 0 == Match.data.length
                        ? ""
                        : [
                            div("." + match_module_css_1.default.matchList, m(matchlist_1.default, {
                                id: Match.data["room"],
                                objectType: "room",
                                matchSelect: Number.parseInt(m.route.param("id")),
                            }), m(matchlist_1.default, {
                                id: Match.data["round"],
                                objectType: "round",
                                matchSelect: Number.parseInt(m.route.param("id")),
                            })),
                            div("." + match_module_css_1.default.match, [
                                h1(Match.data["name"]),
                                "Startzeit: " +
                                    new Date(Match.data["time"]).toTimeString().slice(0, 5),
                                br(),
                                form({
                                    onsubmit: function (e) {
                                        return __awaiter(this, void 0, void 0, function () {
                                            var i;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        i = 0;
                                                        _a.label = 1;
                                                    case 1:
                                                        if (!(i < Match.data["competitorAmount"])) return [3 /*break*/, 4];
                                                        if (e.target[i].value == "") {
                                                            return [3 /*break*/, 3];
                                                        }
                                                        return [4 /*yield*/, m.request({
                                                                method: "PUT",
                                                                url: window.location.origin.concat("/api/match/" +
                                                                    Number.parseInt(m.route.param("id")) +
                                                                    "/participant/" +
                                                                    e.target[i].id, "/" +
                                                                    e.target[i].value),
                                                                withCredentials: true,
                                                                config: function (xhr_1) {
                                                                    xhr_1.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                                                                },
                                                            })];
                                                    case 2:
                                                        _a.sent();
                                                        m.redraw();
                                                        _a.label = 3;
                                                    case 3:
                                                        i++;
                                                        return [3 /*break*/, 1];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        });
                                    },
                                }, div("." + match_module_css_1.default.matchTable, [
                                    div("." + match_module_css_1.default.defRow, [
                                        div("." + match_module_css_1.default.def, "Teilnehmer"),
                                        div("." + match_module_css_1.default.def, "Rang"),
                                        div("." + match_module_css_1.default.def, "Nächstes Match"),
                                    ]),
                                    Object.keys(Match.data["participants"]).map(function (k) { return [
                                        div("." + match_module_css_1.default.entryRow, {
                                            oninit: function () {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var nextMatch;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, ParticipantName.loadlist(Number.parseInt(k))];
                                                            case 1:
                                                                _a.sent();
                                                                nextMatch = Match.data["nextMatches"][Match.data["participants"][k]];
                                                                if (!(nextMatch != 0 && nextMatch != null)) return [3 /*break*/, 3];
                                                                return [4 /*yield*/, NextMatch.loadlist(Number.parseInt(nextMatch), Number.parseInt(k))];
                                                            case 2:
                                                                _a.sent();
                                                                return [3 /*break*/, 4];
                                                            case 3:
                                                                if (NextMatch.data.at(Number.parseInt(k)) != null) {
                                                                    NextMatch.data[Number.parseInt(k)] = null;
                                                                }
                                                                _a.label = 4;
                                                            case 4: return [2 /*return*/];
                                                        }
                                                    });
                                                });
                                            },
                                        }, [
                                            div("." + match_module_css_1.default.entry, m(m.route.Link, { href: "/participant/" + k }, ParticipantName.data.at(Number.parseInt(k)))),
                                            div("." + match_module_css_1.default.entry, input({ placeholder: Match.data["participants"][k], id: k })),
                                            div("." + match_module_css_1.default.entry, NextMatch.data.at(Number.parseInt(k)) == null
                                                ? "keins"
                                                : m(m.route.Link, {
                                                    href: "/match/" +
                                                        Match.data["nextMatches"][Match.data["participants"][k]],
                                                }, NextMatch.data.at(Number.parseInt(k))))
                                        ]),
                                    ]; }),
                                ]), br(), button("Submit")),
                            ]),
                        ]),
                ],
            ]);
        },
    };
};
exports.default = page;
