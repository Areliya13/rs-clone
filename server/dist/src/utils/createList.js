"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createList = void 0;
var createId_1 = require("./createId");
var createList = function (title) {
    return {
        _id: (0, createId_1.createId)(),
        title: title,
        items: []
    };
};
exports.createList = createList;
//# sourceMappingURL=createList.js.map