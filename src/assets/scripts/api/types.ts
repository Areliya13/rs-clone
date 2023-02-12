interface IMakeRequestProps {
    method?: Method; 
    params?: string; 
    path?: Path;
    body?: string;
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