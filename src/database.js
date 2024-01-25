import fs from 'node:fs/promises';
import { serialize } from 'node:v8';


const databsePath = new URL('../db.json', import.meta.url)


export class Database {
    #database = {}
    constructor(){
        fs.readFile(databsePath, 'utf-8')
            .then(data=>{
                this.#database = JSON.parse(data)
            })
            .catch(()=>{
                this.#persist()
            })
    }

    #persist(){
        fs.writeFile(databsePath, JSON.stringify(this.#database))
    }

    select(table, search){
        let data = this.#database[table] ?? [];

        if(search){
            data = data.filter(row => {
                //console.log(Object.entries(search))
                return Object.entries(search).some(([key,value])=>{
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data;
    }


    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()

        return data;
    }

    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row=>row.id===id)

        this.#database[table][rowIndex] = data;
        this.#persist()
    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row=>row.id===id)
        this.#database[table].splice(rowIndex,1)
        this.#persist()
    }

}