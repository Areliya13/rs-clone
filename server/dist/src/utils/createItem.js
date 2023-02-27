"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = void 0;
var createId_1 = require("./createId");
var createItem = function (title) {
    return {
        _id: (0, createId_1.createId)(),
        title: title,
        checkLists: [],
        comments: [],
        marks: [],
        userId: [],
    };
};
exports.createItem = createItem;
//# sourceMappingURL=createItem.js.map