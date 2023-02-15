import { IUser } from "../schema/user.types"
import { createId } from "./createId"

interface ICreateNewUserProps {
    name: string,
    image: string | undefined
}

export const createNewUser = ({name, image }: ICreateNewUserProps): IUser => {
    return {
        name,
        _id: createId(),
        image: image ? image : undefined,
        workSpace: [],
        favoriteBoards: [],
      }
}