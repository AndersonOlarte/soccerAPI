import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entities";



@Entity()
export class Player {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @ManyToOne(() =>Team, (team) =>team.players)
    team: Team;

    constructor(id: string, name: string, age: number, team: Team) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.team = team;
    }

    static properties: Array<string> = [
        'age',
        'id',
        'name',
        'team'
    ];
}