"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoard = void 0;
var mongoose_1 = require("mongoose");
var createId_1 = require("./createId");
var createBoard = function (_a) {
    var title = _a.title, image = _a.image, color = _a.color, workSpaceId = _a.workSpaceId;
    return {
        _id: (0, createId_1.createId)(),
        title: title,
        image: image,
        color: color,
        lists: [],
        marks: [],
        workSpaceId: new mongoose_1.Types.ObjectId(workSpaceId)
    };
};
exports.createBoard = createBoard;
//# sourceMappingURL=createBoard.js.map