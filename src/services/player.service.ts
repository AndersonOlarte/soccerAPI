import { DeleteResult } from "typeorm";
import { Player } from "../entity/player.entities";
import { Team } from "../entity/team.entities";
import { playerRepository, teamRepository } from "../migration/data-source";



export class PlayerService {

    getAllPlayers(): Promise<Player []> {

        // TODO: check the list the application returns contains the team name
        return new Promise((resolve, reject) => {
            playerRepository.find({
                relations:{
                    team: true
                }
            })
            .then(resolve)
            .catch(reject);
        })
    };

    getByAttribute(params: object): Promise<Player []> {
        return new Promise((resolve, reject) => {
            playerRepository.findBy(params)
            .then(resolve)
            .catch(reject);
        })
    }

    getByTeam(team: Team): Promise<Player []> {
        return new Promise ((resolve, reject) => {
            playerRepository.findBy({team},)
            .then(resolve)
            .catch(reject);
        })
    }

    create(playerSent: any, teamSent: Team): Promise<Player> {
        //TODO: check the application verifies the team exist before create a new player.

        return new Promise((resolve, reject) => {
            const newPlayer = new Player(playerSent.name, playerSent.age, teamSent);
            console.log(teamSent);
            console.log(newPlayer);
            playerRepository.save(newPlayer)
            .then(resolve)
            .catch(reject);
        })
    }

    update (updatePlayerSent: Player): Promise<Player> {
        return new Promise((resolve, reject) => {
            playerRepository.save(updatePlayerSent)
            .then(resolve)
            .catch(reject);
        })
    }

    deleteById (id: string): Promise<DeleteResult> {
        return new Promise((resolve, reject) => {
            playerRepository.delete(id)
            .then(resolve)
            .catch(reject)
        })
    }

    functionTest (teamSent: any, team:Team) {
        const player: Player = new Player(teamSent.name, teamSent.age, team);
        console.log(player);
        return new Promise((resolve, reject) => {
            playerRepository.save(player)
            .then(resolve)
            .catch(reject)
        })
    }
}