import { ICheckList } from "../schema/user.types";
import { createId } from "./createId";

export const createChecklist = (title:string): ICheckList => {
    return {
        _id: createId(),
        title,
        items: []
    }
}