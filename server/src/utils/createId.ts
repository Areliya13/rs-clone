import { Types } from 'mongoose';

export const createId = (): Types.ObjectId => {
    const id = new Types.ObjectId();
    return id._id
}