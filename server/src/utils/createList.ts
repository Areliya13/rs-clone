import { IList } from "../schema/user.types";
import { createId } from "./createId";

export const createList = (title: string): IList => {
    return {
        _id: createId(),
        title,
        items: []
    }
}