export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((queryParams, paramet)=>{
        const [key,value] = paramet.split('=');

        queryParams[key]=value;

        return queryParams
    },{})
}