import {  Mark } from '../../schema/model';
import { IMark } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export interface IUpdateMarkProps {
    color?: string;
    markId: string;
    title?: string;
}

export const updateMarkService = async ({color, markId, title}: IUpdateMarkProps) => {
    if (!markId) throw new Error('markId not transferred')
    await connectToDB()
    
    const mark = await Mark.findById(markId)
    if (!mark) throw new Error('commentId not exist')
    await Mark.findByIdAndUpdate<IMark>(markId, {
        color: color ? color : mark.color,
        title: title ? title : mark.title
    })
    const updatedMark = await Mark.findById(markId)
    return updatedMark
}