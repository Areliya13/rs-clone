import { makeRequest } from "../makeRequest"
import { Method, Path } from "../types"

export const deleteOne = async (path: Path, id: string, parentId: string, parentId2?: string) => {
    const res = await makeRequest({
      path, 
      params: id,
      method: Method.DELETE,
      data: {
        parentId,
        parentId2
      }
    })
    return await res.json()
}