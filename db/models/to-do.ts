import { AllowNull, AutoIncrement, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'task'
})
export class Todo extends Model{

    @Column({
        type:DataType.INTEGER, 
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type:DataType.STRING, 
        allowNull: true
    })
    title!: string;

    @Column({
        type:DataType.STRING, 
        allowNull: true
    })
    description!: string;

    @Column({
        type:DataType.BOOLEAN, 
        allowNull: true
    })
    completed!: boolean;
}