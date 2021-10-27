import express,{Express} from 'express'
import { connection } from './config/Database';
import authRoutes from './routes/authRoutes'
import 'reflect-metadata'
import dotenv from 'dotenv'

dotenv.config()

export type IPort = number | string
const PORT = process.env.PORT || 3500

async function igniteServer(PORT:IPort){
    const server:Express = express();

    server.use(express.json())

    /**
     * @function database connection check
     * @return void
    */
    try {
        await connection.authenticate()
        await connection.sync({force:false});
        //await connection.models.PasswordReset.sync({force:true})
    } catch (error) {
        process.exit(1);
    }



    server.use("/auth", authRoutes)



    server.listen(PORT)





}
igniteServer(PORT)







