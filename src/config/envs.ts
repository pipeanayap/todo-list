import 'dotenv/config';
import * as env from 'env-var';


export const envs = {
    MYSQL_PASSWORD: env.get("MYSQL_PASSWORD").required().asString(),
    MYSQL_HOST: env.get("MYSQL_HOST").required().asString(),
    MYSQL_USER: env.get("MYSQL_USER").required().asString(),
    MYSQL_DATABASE: env.get("MYSQL_DATABASE").required().asString(),
    MYSQL_PORT:env.get("MYSQL_PORT").required().asPortNumber()
} 
