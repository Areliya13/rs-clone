import { Types } from "mongoose";
import { User } from "../schema/model";
import { connectToDB } from "./connectToDB";


export const getPopulatedUser = async (userId: string | Types.ObjectId) => {
    await connectToDB();
    const user = await User.findById(userId).populate({
        path: 'workSpace', 
        model: 'WorkSpace',
        populate: {
            path: 'boards',
            model: 'Board',
            populate: {
                path: 'lists',
                model: 'List',
                populate: {
                    path: 'items',
                    model: 'Item',
                    populate: [{
                        path: 'userId',
                        model: 'User',
                    },
                    {   path: 'comments',
                        model: 'Comment',
                    },
                    {   path: 'marks',
                        model: 'Mark',
                    },
                    {   path: 'checkLists',
                        model: 'CheckList',
                        populate: {
                            path: 'items',
                            model: 'CheckItem'
                        }
                    },
                    ]
                }
            }
        }
    })
    return user
}