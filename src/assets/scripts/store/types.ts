
interface IStore {
    user: IPartialUser;
    updateStore: (store: IPartialUser) => void;
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

type IPartialUser = Partial<IUser>

interface IUser {
    name: string;
    _id: string;
    image?: string;
    workSpace: IWork[];
    favoriteBoards: IBoard[]
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
    marks: IMark[];
    workSpaceId: string;
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
    userId: string;
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

enum EventName {
    updateState = 'updateState',
}

interface ISubscriber {
    eventName: EventName;
    function: (store: IPartialUser) => void;
}

interface IEventObject {
    eventName: EventName;
    eventPayload: IPartialUser;
}

interface IReadUser {
    name: string;
    _id: string;
    image?: string;
    workSpace: string[];
    favoriteBoards: string[]
}


export { ISubscriber, IEventObject, EventName };

export {IUser, IPartialUser, IWork, IBoard, IList, IItem, ICheckItem, ICheckList, IComment, IMark, IRef, IStore, IReadUser}