import { model } from "mongoose";
import { boardSchema, checkItemSchema, checkListSchema, commentSchema, itemSchema, listSchema, markSchema, userSchema, workSchema } from "./user";
import { IBoard, ICheckItem, ICheckList, IComment, IItem, IList, IMark, IRef, IUser, IWork } from "./user.types";

export const User = model<IUser>(IRef.user, userSchema);
export const WorkSpace = model<IWork>(IRef.workSpace, workSchema);
export const Board = model<IBoard>(IRef.board, boardSchema);
export const List = model<IList>(IRef.list, listSchema);
export const Item = model<IItem>(IRef.item, itemSchema);
export const Comment = model<IComment>(IRef.comment, commentSchema);
export const Mark = model<IMark>(IRef.mark, markSchema);
export const CheckList = model<ICheckList>(IRef.checkList, checkListSchema);
export const CheckItem = model<ICheckItem>(IRef.checkItem, checkItemSchema);