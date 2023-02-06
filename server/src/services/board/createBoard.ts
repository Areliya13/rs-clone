import { UserList } from '../../schema/model';
import { IUser } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';
import { createBoard, IBoardProps } from '../../utils/createBoard';

export const createBoardService = async (id: string, props: IBoardProps) => {
    if (!id) throw new Error('Id not transferred').message
    if (!props.title) throw new Error('Title not transferred').message
    if (!props.color && !props.image) throw new Error('Image or color not transferred').message
    await connectToDB()
    const user = await UserList.findById(id)
    const allBoards = user?.boards
    if (allBoards) {
        const board = await createBoard(props)
        await UserList.findByIdAndUpdate<IUser>(id, {boards: [board, ...allBoards]})
        const user = await UserList.findById(id)
        return user
    }
}