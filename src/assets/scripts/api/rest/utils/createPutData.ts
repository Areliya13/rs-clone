import { ICreateBoardPutData, ICreateCheckItemPutData, ICreateCommentPutData, ICreateItemPutData } from "./types"

export const createWorkSpacePutData = (title: string) => ({ title })

export const createBoardPutData = ({title, color, image}: ICreateBoardPutData) => {
    return {
        title,
        color,
        image
    }
}

export const createListPutData = (title: string) => ({ title })

export const createItemPutData = ({deadline, title, description, image}: ICreateItemPutData) => { 
    return {
        deadline, 
        title, 
        description, 
        image 
    }
}

export const createCommentPutData = ({ description, authorName, authorImage }: ICreateCommentPutData) => {
    return {
        authorName,
        description,
        authorImage,
    }
}

export const createCheckListPutData = (title: string) => ({ title })

export const createCheckItemPutData = ({done, title}: ICreateCheckItemPutData) => ({ done, title })