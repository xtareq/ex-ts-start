import { Column as Col, CreatedAt, Default, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./User";


@Table({
    tableName:'password_resets'
})
export class PasswordReset extends Model{
    
    @Col
    email!:string

    @Col
    token!:string

    @Default(false)
    @Col
    expired!:boolean

    @Default("current_timestamp()")
    @Col
    @CreatedAt
    createdAt!: Date 

    @Default("null on update current_timestamp()")
    @Col
    @UpdatedAt
    updatedAt!: Date
}



