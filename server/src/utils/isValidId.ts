import { isValidObjectId } from 'mongoose';

export const isValidId = (id: string): boolean => {
    const isValid = isValidObjectId(id)
    return isValid
}