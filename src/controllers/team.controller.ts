import { Handler, Request, Response } from "express"
import { TeamService } from "../services/team.service";
import {Team, TeamDao} from "../entity/team.entities";
import { DeleteResult } from "typeorm";
import { DataResponse } from "../classes/Response";


const teamService: TeamService = new TeamService();
let message: DataResponse = new DataResponse();

export const getAllTeams: Handler = async (req: Request, res: Response) => {

    try {
        const teams: Team[] = await teamService.getAll();
        message.setStatus(200, teams);
    } catch (error: any) {
        message.setStatus(200, error);
    }
    return res.status(message.getStatusCode).json(message.getResponse);
}

export const getTeamById: Handler = async (req: Request, res: Response) => {
    const requestId: string = req.params.id;
    try {
        const team: Team[] = await teamService.getById(requestId);

        if(team.length) message.setStatus(200, team);
        else message.setStatus(400, `it was imposible find a team with id ${requestId}`);

    } catch (error: any) {
        message.setStatus(500, error);
    }
    return res.status(message.getStatusCode).json(message.getResponse);
};

export const createNewTeam: Handler = async (req: Request, res: Response) => {

    if (!req.body.name || !req.body.totalPlayers || !req.body.country) {
       message.setStatus(400, 'Bad Request');
    }
    try {
        const teamSend: TeamDao = new TeamDao(req.body);
        const newTeam: Team = await teamService.create(teamSend);
        message.setStatus(201, [newTeam]);
    } catch (error: any) {
        message.setStatus(500, `error: ${error}`);
    }
    return res.status(message.getStatusCode).json(message.getResponse);
};

export const updateTeam: Handler = async (req: Request, res: Response) => {
    try {
        if(!req.body.id) message.setStatus(400, 'bad Request');
        else {
            const teamUpdated: Team = await teamService.update(req.body);
            message.setStatus(200, [teamUpdated]);
        }
    } catch (error) {
        message.setStatus(200, 'internal server error' + error);
    }
    return res.status(message.getStatusCode).json(message.getResponse);
}

export const deleteTeam = async (req: Request, res: Response) => {
    try {
        const aswer: DeleteResult = await teamService.deleteById(req.params.id);
        message.setStatus(
            aswer.affected ? 200: 400,
            aswer.affected ? 'team deleted succesfully': `Team with id ${req.params.id} does not exist`
        );
    }
    catch (error) {
        message.setStatus(500, 'internal server error' + error);
    }
    res.status(message.getStatusCode).json(message.getResponse);
}


