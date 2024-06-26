"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m = require("mithril");
const matchlist_module_css_1 = require("../../assets/css/components/matchlist.module.css");
const { div } = require("hyperscript-helpers")(m);
const component = () => {
    let Matches = {
        data: [],
        load: async function (id, objectType) {
            Matches.data = await m.request({
                method: "GET",
                url: (await fetch('/env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                })) + "/api/" + objectType + "/" + id + "/matches",
                withCredentials: true,
            });
        }
    };
    let Object = {
        data: [],
        load: async function (id, objectType) {
            Object.data = await m.request({
                method: "GET",
                url: (await fetch('/env.json').then(response => {
                    return response.json();
                }).then((data) => {
                    return data.api_url;
                })) + "/api/" + objectType + "/" + id,
                withCredentials: true,
            });
        }
    };
    return {
        async oninit(vnode) {
            await Matches.load(vnode.attrs.id, vnode.attrs.objectType);
            await Object.load(vnode.attrs.id, vnode.attrs.objectType);
        },
        view(vnode) {
            return div("." + matchlist_module_css_1.default.matchList, { key: Object.data['id'] + vnode.attrs.objectType }, [
                div("." + matchlist_module_css_1.default.name, Object.data['name']),
                Matches.data.map(function (match) {
                    return div("." + matchlist_module_css_1.default.match + (match.id == vnode.attrs.matchSelect ? '.' + matchlist_module_css_1.default.select : ''), {
                        onclick() {
                            m.route.set(`/match/${match.id}`);
                        },
                    }, match.name);
                }),
            ]);
        }
    };
};
exports.default = component;
