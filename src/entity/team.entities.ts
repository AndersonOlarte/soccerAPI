import { Entity, PrimaryColumn,Column, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { IReqBody } from "../interfaces/IReqBody";

export class TeamDao {
    name: string;
    totalPlayers: number;
    country: string;

    constructor(dataSent: IReqBody) {
        this.name = dataSent.name;
        this.totalPlayers = dataSent.totalPlayers;
        this.country = dataSent.country;
    }
}

@Entity()
export class Team {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    totalPlayers: number;

    @Column()
    country: string;

    constructor() {
        this.name = 'none',
        this.totalPlayers = 0.
        this.country = 'none'
    }

}
