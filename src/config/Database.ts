import { Sequelize } from "sequelize-typescript"
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

export const connection = new Sequelize({
    dialect:'mariadb',
    host:process.env.DB_HOST || 'localhost',
    port:3306,
    username:process.env.DB_USER || 'root',
    password:process.env.DB_PASS || '',
    database:process.env.DB_NAME || 'xauth',
    models:[path.join(__dirname,"./../models")]
})


