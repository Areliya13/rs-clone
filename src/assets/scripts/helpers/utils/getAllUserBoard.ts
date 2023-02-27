import { IBoard, IPartialUser } from "../../store/types"

export const getAllUserBoards = (user: IPartialUser) => {
    const workSpace = user?.workSpace
    if (!workSpace) return []
    const arr: IBoard[] = []

    workSpace.forEach((space) => {
        arr.push(...space.boards)
    })

    return arr
}