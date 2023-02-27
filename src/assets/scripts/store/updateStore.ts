import { readAll } from "../api/rest/readAll"
import { Path } from "../api/types"
import { store } from "./store"
import { IPartialUser } from "./types"

export const updateStore = async () => {
    const newData: IPartialUser = await readAll(Path.workSpace, store.user._id)
    console.log('обновляю стор', newData)
    store.updateStore(newData)
}