import { Sequelize } from "sequelize-typescript"
import path from 'path'
import { Dialect } from "sequelize"


export const connection= new Sequelize({
    dialect: process.env.DB_DIALECT as Dialect || 'mariadb',
    host:process.env.DB_HOST || 'localhost',
    port:3306,
    username:process.env.DB_USER || 'root',
    password:process.env.DB_PASS || '',
    database:process.env.DB_NAME || '',
    models:[path.join(__dirname,"./../models")]
})


