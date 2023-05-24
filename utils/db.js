import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config({ path: '.env'})

const db = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 300000,
        idle: 10000,
    }
});

export default db;