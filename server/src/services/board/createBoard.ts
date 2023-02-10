import { Board, WorkSpace } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createBoard } from '../../utils/createBoard';

export interface createBoardProps {
    workSpaceId: string;
    image?: string;
    color?: string;
    title: string;
}

export const createBoardService = async ({workSpaceId, image, color, title}: createBoardProps) => {
    if (!workSpaceId) throw new Error('WorkSpaceId not transferred').message
    if (!title) throw new Error('Title not transferred').message
    if (!image && !color) throw new Error('Image or color not transferred').message
    await connectToDB()

    const newBoard = createBoard({title, color, image})
    const workSpace = await WorkSpace.findById(workSpaceId)
    workSpace?.boards.push(newBoard._id)
    await workSpace?.save()
    const board = await Board.create(newBoard)
    return board
}