import http from 'node:http'
import { routes } from './routes.js';
import { json } from './middlewares/json.js';


const server = http.createServer(async(req,res)=>{
    const { method, url } = req;
    
    await json(req,res)



    const route = routes.find(route=> {
        return route.method === method && route.path.test(url)
    })

    if(route){
        //   /^\/tasks\/(?<id>[a-z0-9-_]+)/
        // url /tasks/dd20f404-0dc4-4bbb-bb8c-df67f56be681

        
      const routeParams = url.match(route.path)
      
      if(routeParams.groups){
        const { ...params } = routeParams.groups;

        req.params = params
      }
      

      return route.handler(req, res)
    }
    

    return res.end()
})


server.listen(3333)