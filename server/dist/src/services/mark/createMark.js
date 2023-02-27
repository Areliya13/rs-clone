"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkService = void 0;
var model_1 = require("../../schema/model");
var connectToDB_1 = require("../../utils/connectToDB");
var createMark_1 = require("../../utils/createMark");
var createMarkService = function (_a) {
    var itemId = _a.itemId, boardId = _a.boardId, color = _a.color, title = _a.title;
    return __awaiter(void 0, void 0, void 0, function () {
        var newMark, item, board, mark;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!itemId || !boardId)
                        throw new Error('boardId or itemId not transferred');
                    if (!color || !title)
                        throw new Error('color or title not transferred');
                    return [4 /*yield*/, (0, connectToDB_1.connectToDB)()];
                case 1:
                    _b.sent();
                    newMark = (0, createMark_1.createMark)(color, title);
                    return [4 /*yield*/, model_1.Item.findById(itemId)];
                case 2:
                    item = _b.sent();
                    if (!item)
                        throw new Error('itemId is not found');
                    item.marks.push(newMark._id);
                    return [4 /*yield*/, item.save()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, model_1.Board.findById(boardId)];
                case 4:
                    board = _b.sent();
                    if (!board)
                        throw new Error('board is not found');
                    board.marks.push(newMark._id);
                    return [4 /*yield*/, board.save()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, model_1.Mark.create(newMark)];
                case 6:
                    mark = _b.sent();
                    return [2 /*return*/, mark];
            }
        });
    });
};
exports.createMarkService = createMarkService;
//# sourceMappingURL=createMark.js.map