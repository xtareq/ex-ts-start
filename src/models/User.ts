import { BelongsTo, Column as Col, CreatedAt, Default, DefaultScope, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Role } from "./Role";


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

    @Col
    avatar!:string

    @Default(null)
    @Col
    verify_code!:string

    @Default(false)
    @Col
    verified!:boolean

    @ForeignKey(()=>Role)
    @Col 
    roleId!:number

    @BelongsTo(()=>Role)
    role!:Role

    @CreatedAt
    created_at!: Date 

    @UpdatedAt
    updated_at!: Date
}