import { baseUrl } from "./config"
import { IMakeRequestProps, Method } from "./types"

export const makeRequest = ({method, params, path, body}: IMakeRequestProps): Promise<Response> => {
    const paramsUrl = params ? params : ''
    const pathsUrl = path ? path : ''
    const requestUrl = `${baseUrl}/${pathsUrl}/${paramsUrl}`
    const options = {
        method: method ? method : Method.GET,
        body
    }
    return fetch(requestUrl, options)
}