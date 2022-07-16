import { Handler, Request, Response } from "express"
import { TeamService } from "../services/team.service";
import { IResponse } from "../interfaces/Response";
import {Team, TeamDao} from "../entity/team.entities";
import { teamRepository } from "../migration/data-source";
import { DeleteResult } from "typeorm";


const teamService: TeamService = new TeamService();
let message: IResponse;

export const getAllTeams: Handler = async (req: Request, res: Response) => {

    try {
        const teams: Team[] = await teamService.getAll();
        message = {
            statusCode: 200,
            data: teams
        }
    } catch (error: any) {
        message = {
            statusCode: 500,
            data: error
        }
    }
    return res.status(message.statusCode).json(message);
}

export const getTeamById: Handler = async (req: Request, res: Response) => {
    const requestId: string = req.params.id;
    try {
        const team: Team[] = await teamService.getById(requestId);
        if(team.length) {
            message = {
                statusCode: 200,
                data: team
            }
        }
        else {
            message = {
                statusCode: 400,
                data: `it was imposible find a team with id ${requestId}`
            }
        }
    } catch (error: any) {
        message = {
            statusCode: 500,
            data: error
        }
    }
    return res.status(message.statusCode).json(message);
};

export const createNewTeam: Handler = async (req: Request, res: Response) => {

    if (!req.body.name || !req.body.totalPlayers || !req.body.country) {
        return res.status(400).json({
            statusCode: 400,
            data: 'Bad Request'
        });
    }
    try {
        const teamSend: TeamDao = new TeamDao(req.body);
        const newTeam: Team = await teamService.create(teamSend);
        message = {
            statusCode: 201,
            data: [newTeam]
        }
    } catch (error: any) {
        message = {
            statusCode: 500,
            data: `error: ${error}`
        };
    }
    return res.status(message.statusCode).json(message);
};

export const updateTeam: Handler = async (req: Request, res: Response) => {
    try {
        if(!req.body.id) {
            message = {
                statusCode: 400,
                data: 'bad Request'
            }
        }
        else {
            const teamUpdated: Team = await teamService.update(req.body);
            message = {
                statusCode: 200,
                data: [teamUpdated]
            }
        }
    } catch (error) {
        message = {
            statusCode:500,
            data: 'internal server error' + error
        }
    }
    return res.status(message.statusCode).json(message);
}

export const deleteTeam = async (req: Request, res: Response) => {
    try {
        const aswer: DeleteResult = await teamService.deleteById(req.params.id);
        message = {
            statusCode: aswer.affected ? 200: 401,
            data: aswer.affected ? 'team deleted succesfully': `Team with id ${req.params.id} does not exist`
        }
    } catch (error) {
        message = {
            statusCode: 500,
            data: 'server error' + error
        }
    }
    res.status(message.statusCode).json(message);
}


