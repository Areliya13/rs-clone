import { baseUrl } from "./config"
import { IMakeRequestProps, Method } from "./types"

export const makeRequest = <T>({method, params, path, data}: IMakeRequestProps<T>): Promise<Response> => {
    const paramsUrl = params ? params : ''
    const pathsUrl = path ? path : ''
    const requestUrl = `${baseUrl}/${pathsUrl}/${paramsUrl}`

    const body = JSON.stringify(data)
    console.log('ss', method, params, path, body, requestUrl)
    const options = {
        method: method ? method : Method.GET,
        body,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
          },
    }
    return fetch(requestUrl, options)
}