export interface ICreateBoardPostData {
    workSpaceId: string;
    title: string
    color?: string;
    image?: string;
}

export interface ICreateMarkPostData {
    itemId: string;
    title: string
    color: string;
    boardId: string;
}

export interface ICreateUserPutData {
    name?: string; 
    image?: string;
    favoriteBoards?: string;
}

export interface ICreateBoardPutData {
    title?: string
    color?: string;
    image?: string;
    list?: string;
}

export interface ICreateItemPutData {
    deadline?: string; 
    title?: string; 
    description?: string; 
    image?: string;
}

export interface ICreateCommentPutData {
    description?: string;
    authorName?: string;
    authorImage?: string;
}

export interface ICreateCheckItemPutData {
    done?: string;
    title?: string;
}

export interface ICreateMarkPutData {
    color?: string;
    title?: string;
}