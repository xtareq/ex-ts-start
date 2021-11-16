import { Column as Col, CreatedAt, Model, Table, UpdatedAt } from "sequelize-typescript";


@Table({
    tableName:'roles'
})
export class Role extends Model{

    @Col
    name!:string

    @CreatedAt
    createdAt!: Date 

    @UpdatedAt
    updatedAt!: Date
}



