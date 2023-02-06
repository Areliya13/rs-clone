interface IBoard {
    title: string;
    lists: IList[];
    image?: string;
    color?: string;
}

interface IList {
    title: string;
    items: IItem[];
    id: string;
}

interface IItem {
    title: string;
    userId: string[];
    deadline: Date;
    description: string;
    comments: IComment[];
    actions: IAction[];
    marks: IMark[];
    checkLists: ICheckItem[];
    image: string;
    id: string;
    authorId: string;
}

interface IUser {
    name: string;
    id: string;
    image?: string;
    boards: IBoard[];
}

interface IComment {
    userId:	string;
    description: string;
    date: Date;
    authorName: string;
    authorImg: string;
    id: string;
}

interface IAction {
    userId: string;
    // do: unknown; //sadsada
    date: Date;
    id: string;
}

interface IMark {
    title: string;
    color: string;
    id: string;
}

interface ICheckList {
    id: string;
    items: ICheckItem[]
}

interface ICheckItem {
    title: string;
    done: boolean;
    id: string;
}

export {IUser, IBoard, IList, IItem, ICheckItem, ICheckList, IAction, IComment, IMark}
