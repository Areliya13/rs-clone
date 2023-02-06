import { Schema, Types } from 'mongoose';
import { IUser } from './user.types';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true  },
  image: String,
  boards: [{
    title: String,
    image: String,
    color: String,
    _id: Types.ObjectId,
    list: [{
            title: String,
            id: String,
            items: [{
                    title: String,
                    userId: [String],
                    deadline: Date,
                    description: String,
                    comments: [{
                        userId:	String,
                        description: String,
                        date: Date,
                        authorName: String,
                        authorImg: String,
                        id: String,
                    }],
                    actions: [{
                        userId: String,
                        date: Date,
                        id: String,
                    }],
                    marks: [{
                        title: String,
                        color: String,
                        id: String,
                    }],
                    checkLists: [{
                        id: String,
                        items: [{
                            title: String,
                            done: Boolean,
                            id: String,
                        }]
                    }],
                    image: String,
                    id: String,
                    authorId: String,
                }
            ]
        }
    ],
  }]
});



export {userSchema}