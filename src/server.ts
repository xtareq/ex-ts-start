import express,{Express} from 'express'
import { connection } from './config/Database';
import { hello } from './routes';
import 'reflect-metadata'
import { SqlError } from 'mariadb';

export type IPort = number | string
const PORT = process.env.PORT || 3500

async function igniteServer(PORT:IPort){
    const server:Express = express();

    /**
     * @function database connection check
     * @return void
    */
    connection.authenticate().catch((err)=>{
        process.exit(1)
    })

    connection.sync();

    server.get('/',hello);


    server.listen(PORT)





}
igniteServer(PORT)







