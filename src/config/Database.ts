import { Sequelize } from "sequelize-typescript"
import path from 'path'
import { User } from "../models/User"

export const connection = new Sequelize({
    dialect:'mariadb',
    host:'127.0.0.1',
    port:3306,
    username:'root',
    password:'',
    database:'xauth',
    models:[path.join(__dirname,"./../models")]
})


