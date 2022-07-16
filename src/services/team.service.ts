import { DeleteResult } from "typeorm";
import {Team, TeamDao} from "../entity/team.entities";
import { teamRepository } from "../migration/data-source";


export class TeamService {
    /**
     * @returns All of teams that are stored in dataBase
     */
    async getAll (): Promise<Team []> {
        return new Promise((resolve, reject) => {
            teamRepository.find()
            .then(resolve)
            .catch(reject);
        })
    };
    /**
     * @param id 
     * @returns Team what matches with the corresponding ID
     */
    async getById (id: string): Promise<Team []> {
        return new Promise((resolve, reject) => {
            teamRepository.findBy({
                id
            })
            .then(resolve)
            .catch(reject);
        })
    };

    async create(teamDao: TeamDao): Promise<Team> {
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

    async update (updateTeamSend: Team): Promise<Team> {
        return new Promise((resolve, reject) => {
            teamRepository.save(updateTeamSend)
            .then(resolve)
            .catch(reject);
        })
    }

    async deleteById(id: string): Promise<DeleteResult> {
        return new Promise((resolve, reject) => {
            teamRepository.delete(id)
            .then(resolve)
            .catch(reject);
        })
    }
}





