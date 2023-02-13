import { ICreateBoardPostData } from "./types"

export const createWorkSpacePostData = (title: string, userId: string) => ({title, userId})

export const createBoardPostData = ({workSpaceId, title, color, image}: ICreateBoardPostData) => {
    return {
        workSpaceId,
        title,
        color,
        image
    }
}

export const createListPostData = (boardId: string, title: string) => ({ boardId, title })

export const createItemPostData = (listId: string, title: string) => ({ listId, title })

export const createCommentPostData = (itemId: string, userId: string, description: string) => {
    return {
        itemId,
        description,
        userId,
    }
}

export const createCheckListPostData = (itemId: string, title: string) => ({ itemId, title })

export const createCheckItemPostData = (checkListId: string, title: string) => ({ checkListId, title })