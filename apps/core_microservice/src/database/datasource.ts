import { DataSource } from "typeorm"

try{
    process.loadEnvFile("../../.env");
} catch{
    throw new Error(".env not found");
};

const port: number = Number(process.env.POSTGRES_PORT);
const password: string = String(process.env.POSTGRES_PASSWORD);

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: port,
    username: process.env.POSTGRES_USER,
    password: password,
    database: process.env.POSTGRES_DB,

    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
});

export default dataSource;