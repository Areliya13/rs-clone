"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdArray = void 0;
var mongoose_1 = require("mongoose");
var createIdArray = function (idArray) {
    var newArray = idArray.map(function (id) {
        var newId = new mongoose_1.Types.ObjectId(id);
        if (!newId)
            throw new Error('Bad id in array');
        return newId;
    });
    return newArray;
};
exports.createIdArray = createIdArray;
//# sourceMappingURL=createIdArray.js.map