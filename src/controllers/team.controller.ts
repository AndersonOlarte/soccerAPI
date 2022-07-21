import { Handler, Request, Response } from "express"
import { TeamService } from "../services/team.service";
import {Team, TeamDao} from "../entity/team.entities";
import { DeleteResult } from "typeorm";
import { DataResponse } from "../classes/Response";
import { Player } from "../entity/player.entities";
import { stringChangeFormat, validateBody } from "../assests/Assets";


const teamService: TeamService = new TeamService();
let message: DataResponse = new DataResponse();

export const getAllTeams: Handler = async (req: Request, res: Response) => {
    try {
        const teams: Team[] = await teamService.getAll();
        message.setStatus(200, teams);
    } catch (error: any) {
        message.setStatus(500, error);
    }
    return res.status(message.getStatusCode).json(message.getResponse);
}

export const getTeamByName: Handler = async (req: Request, res: Response) => {
    const requestName: string = req.params.name.replace("-", " ");
    try {
        const team: Team[] = await teamService.getByAttribute("name", requestName);

        if(team.length) message.setStatus(200, team);
        else message.setStatus(400, `It was imposible find a team with name ${requestName}`);

    } catch (error: any) {
        message.setStatus(500, error);
    }
    return res.status(message.getStatusCode).json(message.getResponse);
};

export const getPlayers: Handler = async (req: Request, res: Response) => {
    try {
        const teamName: string = req.params.name.replace("-"," ",);
        const team: Team [] = await teamService.getByAttribute("name", teamName);
        if (team.length) {
            const players: Player[] = await teamService.getPlayers(team[0]);
            console.log("Players", players);
            message.setStatus(200, players);
        }
        else {
            message.setStatus(400,`The team with name ${teamName} was not found.`);
        }
    } catch (error) {
        message.setStatus(500,`Error: ${error}`);
    }
    res.status(message.getStatusCode).json(message.getResponse);
}

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
        if(!validateBody(req.body, 'Team') ) {
            message.setStatus(400, 'bad Request');
        }
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
        const teamName: string = stringChangeFormat(req.params.name);
        const aswer: DeleteResult = await teamService.deleteByName(teamName);
        message.setStatus(
            aswer.affected ? 200: 400,
            aswer.affected ? 'team deleted succesfully': `Team with name ${teamName} does not exist`
        );
    }
    catch (error) {
        message.setStatus(500, 'internal server error: ' + error);
    }
    res.status(message.getStatusCode).json(message.getResponse);
}


