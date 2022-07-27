import { DeleteResult, UpdateResult } from "typeorm";
import { Player } from "../entity/player.entities";
import {Team, TeamDao} from "../entity/team.entities";
import { playerRepository, teamRepository } from "../migration/data-source";
import { PlayerService } from "./player.service";

const playerService = new PlayerService();


export class TeamService {
    /**
     * @returns All of teams that are stored in dataBase
     */
    getAll (): Promise<Team []> {
        return new Promise((resolve, reject) => {
            teamRepository.find()
            .then(resolve)
            .catch(reject);
        })
    };
    /**
     * @param paramQuery
     * @returns Team what matches with the corresponding ID
     */
    getByAttribute (paramQuery: object): Promise<Team []> {

        return new Promise((resolve, reject) => {
            teamRepository.findBy(paramQuery)
            .then(resolve)
            .catch(reject);
        })
    };


    getPlayers (team: Team): Promise<Player []> {
        return new Promise((resolve, reject) => {
            playerService.getByTeam(team)
            .then(resolve)
            .catch(reject)
        })

    }

    create(teamDao: TeamDao): Promise<Team> {
        /**
         * @param teamDao
         * @returns Team what was created
         * @throws Error
         */

        return new Promise((resolve, reject) => {
            const newTeam = teamRepository.create(teamDao);
            teamRepository.save(newTeam)
            .then(resolve)
            .catch(reject);
        })
    }

    update (updateTeamSend: Team): Promise<Team> {
        return new Promise((resolve, reject) => {
           teamRepository.findOneBy({name: updateTeamSend.name})
           .then((teamToUpdate: Team  | null) => {
                if (teamToUpdate) {
                    teamToUpdate = {...teamToUpdate, ...updateTeamSend};
                    resolve(teamRepository.save(teamToUpdate))
                }
                reject(`Team with name ${updateTeamSend.name} does not exist.`);
           })
            .catch(reject);
        })
    }

    deleteByName(teamName: string): Promise<DeleteResult> {
        console.log(teamName);
        return new Promise((resolve, reject) => {
            teamRepository.delete({name: teamName})
            .then(resolve)
            .catch(reject);
        })
    }
}





