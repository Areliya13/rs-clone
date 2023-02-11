import { ICheckItem } from "../schema/user.types";
import { createId } from "./createId";

export const createCheckItem= (title:string): ICheckItem => {
    return {
        _id: createId(),
        title,
        done: false,
    }
}