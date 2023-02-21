import { store } from "../../store/store"
import { IBoard } from "../../store/types"

export const getAllUserBoards = () => {
    const workSpace = store.user.workSpace
    const arr: IBoard[] = []

    workSpace.forEach((space) => {
        arr.push(...space.boards)
    })

    return arr
}