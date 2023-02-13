import { makeRequest } from "../makeRequest"
import { Method, Path } from "../types"

export const createOne = async <T>(path: Path, data: T ) => {
    const res = await makeRequest({
      path, 
      method: Method.POST,
      data
    })
    return await res.json()
}