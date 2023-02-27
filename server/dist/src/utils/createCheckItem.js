"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckItem = void 0;
var createId_1 = require("./createId");
var createCheckItem = function (title) {
    return {
        _id: (0, createId_1.createId)(),
        title: title,
        done: false,
    };
};
exports.createCheckItem = createCheckItem;
//# sourceMappingURL=createCheckItem.js.map