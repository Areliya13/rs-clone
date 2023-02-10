import { User } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';

export const getAllUsersService = async () => {
    await connectToDB()
    const response = await User.find()
    return response
}