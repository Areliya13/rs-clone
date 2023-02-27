"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChecklist = void 0;
var createId_1 = require("./createId");
var createChecklist = function (title) {
    return {
        _id: (0, createId_1.createId)(),
        title: title,
        items: []
    };
};
exports.createChecklist = createChecklist;
//# sourceMappingURL=createChecklist.js.map