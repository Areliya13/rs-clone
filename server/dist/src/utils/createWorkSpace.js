"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkSpace = void 0;
var createId_1 = require("./createId");
var createWorkSpace = function (title) {
    return {
        _id: (0, createId_1.createId)(),
        title: title,
        boards: []
    };
};
exports.createWorkSpace = createWorkSpace;
//# sourceMappingURL=createWorkSpace.js.map