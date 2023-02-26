import { ICreateBoardPutData, ICreateCheckItemPutData, ICreateCommentPutData, ICreateItemPutData, ICreateMarkPutData, ICreateUserPutData } from "./types"

export const createUserPutData = ({name, image, favoriteBoards}: ICreateUserPutData) => ({name, image, favoriteBoards})

export const createWorkSpacePutData = (title: string) => ({ title })

export const createBoardPutData = ({title, color, image, list}: ICreateBoardPutData) => {
    return {
        title,
        color,
        image,
        list
    }
}

export const createListPutData = (title: string, item?: string) => ({ title, item })

export const createItemPutData = ({deadline, title, description, image}: ICreateItemPutData) => { 
    return {
        deadline, 
        title, 
        description, 
        image 
    }
}

export const createCommentPutData = ({ description }: ICreateCommentPutData) => ({description})

export const createCheckListPutData = (title: string) => ({ title })

export const createCheckItemPutData = ({done, title}: ICreateCheckItemPutData) => ({ done, title })

export const createMarkPutData = ({title, color}: ICreateMarkPutData) => ({ title, color })