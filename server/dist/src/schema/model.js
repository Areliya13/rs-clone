"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckItem = exports.CheckList = exports.Mark = exports.Comment = exports.Item = exports.List = exports.Board = exports.WorkSpace = exports.User = void 0;
var mongoose_1 = require("mongoose");
var user_1 = require("./user");
var user_types_1 = require("./user.types");
exports.User = (0, mongoose_1.model)(user_types_1.IRef.user, user_1.userSchema);
exports.WorkSpace = (0, mongoose_1.model)(user_types_1.IRef.workSpace, user_1.workSchema);
exports.Board = (0, mongoose_1.model)(user_types_1.IRef.board, user_1.boardSchema);
exports.List = (0, mongoose_1.model)(user_types_1.IRef.list, user_1.listSchema);
exports.Item = (0, mongoose_1.model)(user_types_1.IRef.item, user_1.itemSchema);
exports.Comment = (0, mongoose_1.model)(user_types_1.IRef.comment, user_1.commentSchema);
exports.Mark = (0, mongoose_1.model)(user_types_1.IRef.mark, user_1.markSchema);
exports.CheckList = (0, mongoose_1.model)(user_types_1.IRef.checkList, user_1.checkListSchema);
exports.CheckItem = (0, mongoose_1.model)(user_types_1.IRef.checkItem, user_1.checkItemSchema);
//# sourceMappingURL=model.js.map