import { IWork } from "../schema/user.types";
import { createId } from "./createId";

export const createWorkSpace = (title: string): IWork => {

    return {
        _id: createId(),
        title,
        boards: []
    }
}