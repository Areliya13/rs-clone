import { IItem } from "../schema/user.types";
import { createId } from "./createId";

export const createItem = (title:string): IItem => {
    return {
        _id: createId(),
        title,
        checkLists: [],
        comments: [],
        marks: [],
        userId: [],
    }
}