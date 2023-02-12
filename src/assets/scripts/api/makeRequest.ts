import { baseUrl } from "./config"
import { IMakeRequestProps, Method } from "./types"

export const makeRequest = ({method, params, path, body}: IMakeRequestProps): Promise<Response> => {
    const requestUrl = `${baseUrl}/${path ? path : ''}/${params ? params : ''}`
    return fetch(requestUrl, {
        method: method ? method : Method.GET,
        body
    })
}