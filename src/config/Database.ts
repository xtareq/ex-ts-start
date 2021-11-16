import { Sequelize } from "sequelize-typescript"
import path from 'path'
<<<<<<< HEAD
import dotenv from 'dotenv'
dotenv.config()
=======
import { Dialect } from "sequelize"
>>>>>>> 2ba9a55c8e69c48e0974272275d3e474af3ede47


export const connection= new Sequelize({
    dialect: process.env.DB_DIALECT as Dialect || 'mariadb',
    host:process.env.DB_HOST || 'localhost',
    port:3306,
    username:process.env.DB_USER || 'root',
    password:process.env.DB_PASS || '',
    database:process.env.DB_NAME || '',
    models:[path.join(__dirname,"./../models")]
})


