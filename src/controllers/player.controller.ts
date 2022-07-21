import { Handler, Request, Response } from "express";
import { DataResponse } from "../classes/Response";
import { Player } from "../entity/player.entities";
import { Team } from "../entity/team.entities";
import { PlayerService } from "../services/player.service";
import { TeamService } from "../services/team.service";
import { validateBody, stringChangeFormat } from "../assests/Assets";

const message: DataResponse = new DataResponse();
const playerService = new PlayerService();
const teamService  = new TeamService();

export const getAllPlayers: Handler = async (req: Request, res: Response) => {
    try {
        const allPlayers: Player[] = await playerService.getAllPlayers();
        message.setStatus(200, allPlayers);
    } catch (error) {
        message.setStatus(500, "Error: " + error);
    }
    return res.status(message.getStatusCode).json(message.getData);
}

export const createNewPlayer: Handler = async (req: Request, res: Response) => {
    try {
        if (!validateBody(req.body, 'Player')) {
            message.setStatus(400, "Bad request");
        }
        else{
            const playerTeam: Team [] = await teamService.getByAttribute("name", req.body.team);
            const newPlayer: Player = new Player(req.body.id, req.body.name, req.body.age, playerTeam[0]);
            const playerCreated: Player = await playerService.create(newPlayer);
            message.setStatus(201, [playerCreated]);
        }
    } catch (error) {
        message.setStatus(500, "error" + error);
    }
    return res.status(message.getStatusCode).json(message.getResponse);
}