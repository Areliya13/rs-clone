import { Schema, Types } from 'mongoose';
import { IBoard, ICheckItem, ICheckList, IComment, IItem, IList, IMark, IRef, IUser, IWork } from './user.types';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true  },
    image: String,
    _id: Types.ObjectId,
    workSpace: [{
      type: Types.ObjectId,
      ref: IRef.workSpace,
    }]
  });

const workSchema = new Schema<IWork>({
    _id: Types.ObjectId,
    title: { type: String, required: true  },
    boards: [{
        type: Types.ObjectId,
        ref: IRef.board,
    }]
})

const boardSchema = new Schema<IBoard>({
    _id: Types.ObjectId,
    title: { type: String, required: true  },
    lists: [{
        type: Types.ObjectId,
        ref: IRef.list,
    }],
    color: String,
    image: String,
})

const listSchema = new Schema<IList>({
    _id: Types.ObjectId,
    title: { type: String, required: true  },
    items: [{
        type: Types.ObjectId,
        ref: IRef.item,
    }],
})

const itemSchema = new Schema<IItem>({
    _id: Types.ObjectId,
    title: { type: String, required: true  },
    userId: [{
        type: Types.ObjectId,
        ref: IRef.user,
    }],
    deadline: Date,
    description: String,
    comments: [{
        type: Types.ObjectId,
        ref: IRef.comment,
    }],
    marks: [{
        type: Types.ObjectId,
        ref: IRef.mark,
    }],
    checkLists: [{
        type: Types.ObjectId,
        ref: IRef.checkList,
    }],
    image: String,
})

const commentSchema = new Schema<IComment>({
    _id: Types.ObjectId,
    authorName: String,
    authorImage: String,
    description: String,
    date: Date
})

const checkListSchema = new Schema<ICheckList>({
    _id: Types.ObjectId,
    items: [{
        type: Types.ObjectId,
        ref: IRef.checkItem,
    }],
})

const checkItemSchema = new Schema<ICheckItem>({
    _id: Types.ObjectId,
    done: Boolean,
    title: String,
})

const markSchema = new Schema<IMark>({
    _id: Types.ObjectId,
    color: String,
    title: String,
})

export {userSchema, 
    workSchema, 
    boardSchema, 
    listSchema, 
    itemSchema, 
    commentSchema,
    checkListSchema,
    checkItemSchema,
    markSchema
}