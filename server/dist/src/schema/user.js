"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markSchema = exports.checkItemSchema = exports.checkListSchema = exports.commentSchema = exports.itemSchema = exports.listSchema = exports.boardSchema = exports.workSchema = exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
var user_types_1 = require("./user.types");
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: String,
    _id: mongoose_1.Types.ObjectId,
    workSpace: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.workSpace,
        }],
    favoriteBoards: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.board,
        }]
});
exports.userSchema = userSchema;
var workSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    title: { type: String, required: true },
    boards: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.board,
        }],
});
exports.workSchema = workSchema;
var boardSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    title: { type: String, required: true },
    lists: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.list,
        }],
    marks: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.mark,
        }],
    color: String,
    image: String,
    workSpaceId: mongoose_1.Types.ObjectId,
});
exports.boardSchema = boardSchema;
var listSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    title: { type: String, required: true },
    items: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.item,
        }],
});
exports.listSchema = listSchema;
var itemSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    title: { type: String, required: true },
    userId: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.user,
        }],
    deadline: Date,
    description: String,
    comments: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.comment,
        }],
    marks: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.mark,
        }],
    checkLists: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.checkList,
        }],
    image: String,
});
exports.itemSchema = itemSchema;
var commentSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    userId: mongoose_1.Types.ObjectId,
    description: String,
    date: Date
});
exports.commentSchema = commentSchema;
var checkListSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    items: [{
            type: mongoose_1.Types.ObjectId,
            ref: user_types_1.IRef.checkItem,
        }],
    title: String
});
exports.checkListSchema = checkListSchema;
var checkItemSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    done: Boolean,
    title: String,
});
exports.checkItemSchema = checkItemSchema;
var markSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    color: String,
    title: String,
});
exports.markSchema = markSchema;
//# sourceMappingURL=user.js.map