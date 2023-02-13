interface IMakeRequestProps<T> {
    method?: Method; 
    params?: string; 
    path?: Path;
    data?: T;
}

enum Method {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT'
}

enum Path {
    user = 'user',
    workSpace = 'workSpace',
    board = 'board',
    list = 'list',
    item = 'item',
    comment = 'comment',
    checklist = 'checklist',
    checkitem = 'checkitem'
}

export {IMakeRequestProps, Method, Path}