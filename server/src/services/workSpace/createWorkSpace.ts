import { User, WorkSpace } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createWorkSpace } from '../../utils/createWorkSpace';

export const createWorkSpaceService = async (userId: string, title: string) => {
    if (!userId) throw new Error('Id not transferred')
    if (!title) throw new Error('Title not transferred')
    const workSpaceObject = createWorkSpace(title)
    await connectToDB()

    const user = await User.findById(userId)
    if (!user) throw new Error('User not exist')
    user?.workSpace.push(workSpaceObject._id)
    await user?.save()

    await WorkSpace.create(workSpaceObject)

    return user
}