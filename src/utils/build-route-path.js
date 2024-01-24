export function buildRoutePath(path){
    //path ex.: /tasks/:id => /^\/tasks\/(?<id>[a-z0-9-_]+)/
    const routeParametersRegex = /:([a-zA-Z]+)/g

    var pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex;
}