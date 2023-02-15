
interface IStore {
    user: Partial<IUser>;
}

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
    _id: string;
    image?: string;
    workSpace: IWork[];
}

interface IWork {
    title: string;
    _id: string;
    boards: IBoard[];
}

interface IBoard {
    title: string;
    lists: IList[];
    image?: string;
    color?: string;
    _id: string;
}

interface IList {
    title: string;
    items: IItem[];
    _id: string;
}

interface IItem {
    title: string;
    userId: IUser[];
    deadline?: Date;
    description?: string;
    comments: IComment[];
    marks: IMark[];
    checkLists: ICheckList[];
    image?: string;
    _id: string;
}

interface IComment {
    authorName: string;
    authorImage?: string;
    description: string;
    date: Date;
    _id: string;
}


interface IMark {
    title: string;
    color: string;
    _id: string;
}

interface ICheckList {
    _id: string;
    title: string;
    items: ICheckItem[];
}

interface ICheckItem {
    title: string;
    done: boolean;
    _id: string;
}

export {IUser, IWork, IBoard, IList, IItem, ICheckItem, ICheckList, IComment, IMark, IRef, IStore}