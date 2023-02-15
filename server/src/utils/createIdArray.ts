import { Types } from "mongoose";

export const createIdArray = (idArray: string[]): Types.ObjectId[] => {
    const newArray = idArray.map((id) => {
        const newId = new Types.ObjectId(id)
        if (!newId) throw new Error('Bad id in array')
        return newId
    }) 

    return newArray
}