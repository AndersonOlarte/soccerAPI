import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entities";



@Entity()
export class Player {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @ManyToOne(() => Team, (team) =>team.players, {onDelete: "CASCADE"})
    @JoinColumn()
    team: Team;

    constructor(name: string, age: number, team: Team) {
        this.name = name;
        this.age = age;
        this.team = team;

    }

    static properties: Array<string> = [
        'age',
        'name',
        'team',
    ];
}