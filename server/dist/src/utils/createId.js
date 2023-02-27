"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = void 0;
var mongoose_1 = require("mongoose");
var createId = function () {
    var id = new mongoose_1.Types.ObjectId();
    return id._id;
};
exports.createId = createId;
//# sourceMappingURL=createId.js.map