"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var config_1 = require("./src/config");
var path_1 = require("./src/types/path");
var index_1 = require("./src/controllers/workSpace/index");
var index_2 = require("./src/controllers/user/index");
var index_3 = require("./src/controllers/board/index");
var index_4 = require("./src/controllers/list/index");
var index_5 = require("./src/controllers/item/index");
var index_6 = require("./src/controllers/comment/index");
var index_7 = require("./src/controllers/checklist/index");
var index_8 = require("./src/controllers/checkitem/index");
var errorHandler_1 = require("./src/middleware/errorHandler");
var index_9 = require("./src/controllers/mark/index");
var app = (0, express_1.default)();
var port = config_1.port || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//User section
app.get(path_1.Path.user, index_2.getAllUsersController);
app.put(path_1.Path.userWithId, index_2.updateUserController);
//WorkSpace section
app.post(path_1.Path.workSpace, index_1.createWorkSpaceController);
app.get(path_1.Path.workSpaceWithId, index_1.getAllWorkSpacesController);
app.delete(path_1.Path.workSpaceWithId, index_1.deleteWorkSpaceController);
app.put(path_1.Path.workSpaceWithId, index_1.updateWorkSpaceController);
//Board section
app.post(path_1.Path.board, index_3.createBoardController);
app.get(path_1.Path.boardWithId, index_3.getAllBoardsController);
app.delete(path_1.Path.boardWithId, index_3.deleteBoardController);
app.put(path_1.Path.boardWithId, index_3.updateBoardController);
//List section
app.post(path_1.Path.list, index_4.createListController);
app.get(path_1.Path.listWithId, index_4.getAllListsController);
app.delete(path_1.Path.listWithId, index_4.deleteListsController);
app.put(path_1.Path.listWithId, index_4.updateListsController);
//Item section
app.post(path_1.Path.item, index_5.createItemController);
app.get(path_1.Path.itemWithId, index_5.getAllItemsController);
app.delete(path_1.Path.itemWithId, index_5.deleteItemController);
app.put(path_1.Path.itemWithId, index_5.updateItemController);
//Comment section
app.post(path_1.Path.comment, index_6.createCommentController);
app.get(path_1.Path.commentWithId, index_6.getAllCommentsController);
app.delete(path_1.Path.commentWithId, index_6.deleteCommentController);
app.put(path_1.Path.commentWithId, index_6.updateCommentController);
//Checklist section
app.post(path_1.Path.checklist, index_7.createChecklistController);
app.get(path_1.Path.checklistWithId, index_7.getAllChecklistController);
app.delete(path_1.Path.checklistWithId, index_7.deleteChecklistController);
app.put(path_1.Path.checklistWithId, index_7.updateChecklistController);
//CheckItem section
app.post(path_1.Path.checkItem, index_8.createCheckItemController);
app.get(path_1.Path.checkItemWithId, index_8.getAllCheckItemsController);
app.delete(path_1.Path.checkItemWithId, index_8.deleteCheckItemController);
app.put(path_1.Path.checkItemWithId, index_8.updateCheckItemController);
//Mark section
app.post(path_1.Path.mark, index_9.createMarkController);
app.get(path_1.Path.markWithId, index_9.getAllMarksController);
app.delete(path_1.Path.markWithId, index_9.deleteMarkController);
app.put(path_1.Path.markWithId, index_9.updateMarkController);
app.listen(port, function () {
    console.log("Trello app listening on port ".concat(port));
});
app.use(errorHandler_1.ErrorHandler);
//# sourceMappingURL=index.js.map