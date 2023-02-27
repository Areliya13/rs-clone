"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMark = void 0;
var mongoose_1 = require("mongoose");
var createMark = function (color, title) {
    return {
        _id: new mongoose_1.Types.ObjectId(),
        color: color,
        title: title
    };
};
exports.createMark = createMark;
//# sourceMappingURL=createMark.js.map