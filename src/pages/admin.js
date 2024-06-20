"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var navbar_1 = require("../components/navbar");
var div = require("hyperscript-helpers")(m).div;
var page = {
    view: function () {
        return div(".page.admin", [m(navbar_1.default)]);
    },
};
exports.default = page;
