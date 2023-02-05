import { Types } from 'mongoose';

export const createId = (): string => {
    const id = new Types.ObjectId();
    return id._id.toString()
}