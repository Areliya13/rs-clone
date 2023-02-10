import { User, WorkSpace } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createWorkSpace } from '../../utils/createWorkSpace';

export const createWorkSpaceService = async (userId: string, title: string) => {
    if (!userId) throw new Error('Id not transferred').message
    if (!title) throw new Error('Title not transferred').message
    const workSpaceObject = createWorkSpace(title)
    await connectToDB()

    const user = await User.findById(userId)
    user?.workSpace.push(workSpaceObject._id)
    await user?.save()

    await WorkSpace.create(workSpaceObject)

    return user
}