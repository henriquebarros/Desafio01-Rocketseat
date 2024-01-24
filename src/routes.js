import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';


const tasks = [];

export const routes = [
    
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req,res) => {
            
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req,res) => {
            const { title, description } = req.body;

            if(!title || !description){
                return res.writeHead(400).end(JSON.stringify({error:'Title and description are required'}));
            }


            tasks.push({
                id:randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            })
    
            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req,res) => {
            const { ...data } =  req.body;

            const {title, description} = data;
            if(!title || !description){
                return res.writeHead(400).end(JSON.stringify({error:'Title and description are required'}));
            }

            const { id } = req.params;
            const findTask = tasks.findIndex(task=>task.id===id)

            if(findTask===-1){
                return res.writeHead(404).end(JSON.stringify({error:'Register not found'}));
            }

            Object.assign(tasks[findTask], { ...data, updated_at: new Date() })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req,res) => {
            const { id } = req.params;

            const findTask = tasks.findIndex(task=>task.id===id)
            if(findTask===-1){
                return res.writeHead(404).end(JSON.stringify({error:'Register not found'}));
            }

            tasks.splice(findTask,1)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req,res) => {

            const { id } = req.params;

            const findTask = tasks.findIndex(task=>task.id===id)

            if(findTask===-1){
                return res.writeHead(404).end(JSON.stringify({error:'Register not found'}));
            }

            Object.assign(tasks[findTask], { completed_at:true })
            
            return res.writeHead(204).end()
        }
    }


]