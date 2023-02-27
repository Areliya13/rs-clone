import { Types } from "mongoose";

enum IRef {
    user = 'User',
    workSpace = 'WorkSpace',
    board = 'Board',
    list = 'List',
    item = 'Item',
    comment = 'Comment',
    mark = 'Mark',
    checkList = 'CheckList',
    checkItem = 'CheckItem',
}

interface IUser {
    name: string;
    _id: Types.ObjectId;
    image?: string;
    workSpace: Types.ObjectId[];
    favoriteBoards: Types.ObjectId[];
}

interface IWork {
    title: string;
    _id: Types.ObjectId;
    boards: Types.ObjectId[];
}

interface IBoard {
    title: string;
    lists: Types.ObjectId[];
    marks: Types.ObjectId[];
    image?: string;
    color?: string;
    _id: Types.ObjectId;
    workSpaceId: Types.ObjectId;
}

interface IList {
    title: string;
    items: Types.ObjectId[];
    _id: Types.ObjectId;
}

interface IItem {
    title: string;
    userId: Types.ObjectId[];
    deadline?: Date;
    description?: string;
    comments: Types.ObjectId[];
    marks: Types.ObjectId[];
    checkLists: Types.ObjectId[];
    image?: string;
    _id: Types.ObjectId;
}

interface IComment {
    description: string;
    userId: Types.ObjectId;
    date: Date;
    _id: Types.ObjectId;
}


interface IMark {
    title: string;
    color: string;
    _id: Types.ObjectId;
}

interface ICheckList {
    _id: Types.ObjectId;
    title: string;
    items: Types.ObjectId[];
}

interface ICheckItem {
    title: string;
    done: boolean;
    _id: Types.ObjectId;
}

export {IUser, IWork, IBoard, IList, IItem, ICheckItem, ICheckList, IComment, IMark, IRef}
