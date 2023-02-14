import { makeRequest } from "../makeRequest"
import { Method, Path } from "../types"

export const updateOne = async <T>(path: Path, id: string, data: T ) => {
    const res = await makeRequest({
      path, 
      params: id,
      method: Method.PUT,
      data
    })
    return await res.json()
}

