import { DeleteResult } from "typeorm";
import {Team, TeamDao} from "../entity/team.entities";
import { teamRepository } from "../migration/data-source";

export class TeamService {

    async getAll (): Promise<Team []> {
        return new Promise((resolve, reject) => {
            teamRepository.find()
            .then(resolve)
            .catch(reject);
        })
    };

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





