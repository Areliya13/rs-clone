import { makeRequest } from "../makeRequest"
import { Method, Path } from "../types"

export const deleteOne = async (path: Path, id: string, parentId: string) => {
    const res = await makeRequest({
      path, 
      params: id,
      method: Method.DELETE,
      data: {
        parentId
      }
    })
    return await res.json()
}