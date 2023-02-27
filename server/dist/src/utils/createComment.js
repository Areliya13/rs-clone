"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = void 0;
var mongoose_1 = require("mongoose");
var createId_1 = require("./createId");
var createComment = function (_a) {
    var userId = _a.userId, description = _a.description;
    return {
        _id: (0, createId_1.createId)(),
        date: new Date(),
        description: description,
        userId: new mongoose_1.Types.ObjectId(userId)
    };
};
exports.createComment = createComment;
//# sourceMappingURL=createComment.js.map