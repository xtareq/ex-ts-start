import { Column as Col, CreatedAt, Model, Table, UpdatedAt } from "sequelize-typescript";


@Table({
    tableName:'users'
})
export class User extends Model{

    @Col
    name!:string

    @Col 
    email!:string

    @Col
    phone!:string

    @Col
    password!:string

    @CreatedAt
    created_at!: Date 

    @UpdatedAt
    updated_at!: Date
}