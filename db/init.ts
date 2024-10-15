import { Sequelize } from "sequelize-typescript";
import { Todo } from "./models/to-do";
import { envs } from "../src/config/envs";


const db = new Sequelize({
    database:envs.MYSQL_DATABASE,
    username:envs.MYSQL_USER,
    password:envs.MYSQL_PASSWORD,
    host:envs.MYSQL_HOST,
    port:3307,
    dialect:"mysql",
    models:[Todo]
});

export const dbConnection = async() =>{
    try{
        await db.sync({force: false});
        console.log("Database connected")
    }catch(error){
        console.error(`Error connecting to Database ${error}`)
    }
}