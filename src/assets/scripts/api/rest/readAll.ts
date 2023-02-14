import { makeRequest } from "../makeRequest"
import { Method, Path } from "../types"

export const readAll = async (path: Path, id: string) => {
    const res = await makeRequest({
      path, 
      params: id,
      method: Method.GET,
    })
    return await res.json()
}