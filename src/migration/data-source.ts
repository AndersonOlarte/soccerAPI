import { DataSource } from "typeorm";
import app from "../app";
import {Team} from "../entity/team.entities";


const AppDataSource = new DataSource({
    type: "mysql",
    host: 'localhost',
    database: 'soccer',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: 'anderson',
    password: 'anderson',
    synchronize: true,
    logging: true,
    entities: [Team],
    subscribers: [],
    migrations: [],
});

AppDataSource.initialize()
    .then(() => {

    })
    .catch((err) => console.log(err));

export const teamRepository = AppDataSource.getRepository(Team);