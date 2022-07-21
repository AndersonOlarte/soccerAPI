import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, PrimaryColumn } from "typeorm";
import { IReqBody } from "../interfaces/IReqBody";
import { Player } from "./player.entities";

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
@Unique(["name"])
export class Team {

    @PrimaryColumn()
    name: string;

    @Column()
    totalPlayers: number;

    @Column()
    country: string;

    @OneToMany(() => Player, (player) => player.team)
    players: Player[]

    constructor() {
        this.name = 'none',
        this.totalPlayers = 0.
        this.country = 'none'
    }
    static properties: Array<string> = [
        'country',
        'name',
        'totalPlayers',
    ];

}
