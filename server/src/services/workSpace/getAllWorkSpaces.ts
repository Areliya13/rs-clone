import { getPopulatedUser } from '../../utils/getPopulatedUser';

export const getAllWorkSpacesService = async (userId: string) => {
    if (!userId) throw new Error('Id not transferred').message
    const response = await getPopulatedUser(userId)
    return response
}