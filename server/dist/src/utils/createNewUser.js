"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = void 0;
var createId_1 = require("./createId");
var createNewUser = function (_a) {
    var name = _a.name, image = _a.image;
    return {
        name: name,
        _id: (0, createId_1.createId)(),
        image: image ? image : undefined,
        workSpace: [],
        favoriteBoards: [],
    };
};
exports.createNewUser = createNewUser;
//# sourceMappingURL=createNewUser.js.map