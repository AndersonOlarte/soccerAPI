import { DataSource } from "typeorm";
import { Player } from "../entity/player.entities";
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
    entities: [Team, Player],
    subscribers: [],
    migrations: [],
});

AppDataSource.initialize()
    .then(() => {

    })
    .catch((err) => console.log(err));

export const teamRepository = AppDataSource.getRepository(Team);

export const playerRepository = AppDataSource.getRepository(Player);