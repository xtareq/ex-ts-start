import { Column as Col, CreatedAt, Default, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./User";


@Table({
    tableName:'password_resets'
})
export class PasswordReset extends Model{
    
    @ForeignKey(()=>User)
    @Col
    userId!:number

    @Col
    code!:string

    @Default(false)
    @Col
    expired!:boolean

    @CreatedAt
    created_at!: Date 

    @UpdatedAt
    updated_at!: Date
}



