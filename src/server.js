import http from 'node:http'
import { randomUUID } from 'node:crypto'
const tasks = [];


const server = http.createServer((req,res)=>{
    const { method, url } = req;


    //http GET localhost:3333/tasks
    if(method==='GET' && url==='/tasks'){
        console.log(tasks)

        return res.setHeader('Content-type','application/json').end(JSON.stringify(tasks))
    }

    //http POST localhost:3333/tasks
    if(method==='POST' && url==='/tasks'){
        console.log(method)
        tasks.push({
            id:randomUUID(),
            title: 'Entendendo Streams no Node',
            description: 'Nessa aula prática vamos conhecer o conteito de streams dentro do Node, mostrando explempos de como essa funcionalidade pode ajudar no dia a dia em nossas aplicações.',
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return res.writeHead(201).end();
    }


    return res.end()
})


server.listen(3333)