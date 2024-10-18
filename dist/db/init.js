"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const to_do_1 = require("./models/to-do");
const envs_1 = require("../src/config/envs");
const db = new sequelize_typescript_1.Sequelize({
    database: envs_1.envs.MYSQL_DATABASE,
    username: envs_1.envs.MYSQL_USER,
    password: envs_1.envs.MYSQL_PASSWORD,
    host: envs_1.envs.MYSQL_HOST,
    port: 3307,
    dialect: "mysql",
    models: [to_do_1.Todo]
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.sync({ force: false });
        console.log("Database connected");
    }
    catch (error) {
        console.error(`Error connecting to Database ${error}`);
    }
});
exports.dbConnection = dbConnection;
