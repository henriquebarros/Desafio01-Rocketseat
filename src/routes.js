import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';
import { Database } from './database.js';

const database = new Database()

const tasks_ = [];

export const routes = [
    
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req,res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            }:null)
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


            const task = ({
                id:randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            })

            database.insert('tasks',task)
    
            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: async (req,res) => {
            const { ...data } =  req.body;

            const {title, description} = data;
            if(!title || !description){
                return res.writeHead(400).end(JSON.stringify({error:'Title and description are required'}));
            }

            const { id } = req.params;

            const [task] = await database.select('tasks', {
                id,
            })

            if(!task){
                return res.writeHead(404).end(JSON.stringify({error:'Register not found'}));
            }

            Object.assign(task, { ...data, updated_at: new Date() })
            database.update('tasks', id, task )

            

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: async (req,res) => {
            const { id } = req.params;


            const [task] = await database.select('tasks', {
                id,
            })

            if(!task){
                return res.writeHead(404).end(JSON.stringify({error:'Register not found'}));
            }

            database.delete('tasks',id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: async (req,res) => {

            const { id } = req.params;
            const [task] = await database.select('tasks', {
                id,
            })

            if(!task){
                return res.writeHead(404).end(JSON.stringify({error:'Register not found'}));
            }

            Object.assign(task, { completed_at:true, updated_at: new Date() })
            database.update('tasks', id, task )
            
            return res.writeHead(204).end()
        }
    }


]