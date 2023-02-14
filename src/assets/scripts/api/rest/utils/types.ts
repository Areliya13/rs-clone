export interface ICreateBoardPostData {
    workSpaceId: string;
    title: string
    color?: string;
    image?: string;
}

export interface ICreateBoardPutData {
    title?: string
    color?: string;
    image?: string;
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