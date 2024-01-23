import { randomUUID } from 'node:crypto'


const tasks = [];

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req,res) => {

            return res.setHeader('Content-type','application/json').end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req,res) => {
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
    }


]