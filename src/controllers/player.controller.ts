import { Handler, Request, Response } from "express";
import { DataResponse } from "../classes/Response";
import { Player } from "../entity/player.entities";
import { Team } from "../entity/team.entities";
import { PlayerService } from "../services/player.service";
import { TeamService } from "../services/team.service";
import { validateBody, stringChangeFormat} from "../assests/Assets";
import { DeleteResult } from "typeorm";

const message: DataResponse = new DataResponse();
const playerService = new PlayerService();
const teamService  = new TeamService();

export const getAllPlayers: Handler = async (req: Request, res: Response) => {
    try {
        const allPlayers: Player[] = await playerService.getAllPlayers();
        return res.status(200).json({players: allPlayers});
    } catch (error) {
        return res.status(500).json({Error: `${error}`});
    }
}

export const getPlayersByParam: Handler = async ( req: Request, res:Response) => {
    try {
        const foundPlayers: Player[] = await playerService.getByAttribute(req.query);
        return res.status(200).json({players: [foundPlayers]});
    } catch (error) {
        return res.status(500).json({error});
    }
}

export const createNewPlayer: Handler = async (req: Request, res: Response) => {
    try {
        if (!validateBody(req.body, 'Player')) {
            return res.status(400).json({message: 'Bad Request.'});
        }
        else{
            const teamRequested: Team [] = await teamService.getByAttribute({name: req.body.team});
            const playerCreated: Player = await playerService.create(req.body, teamRequested[0]);

            return res.status(201).json({player: playerCreated});
        }
    } catch (error) {
        res.status(500).json({error: `${error}`});
    }
}

export const updatePlayer: Handler = async (req: Request, res: Response) => {
    try {
        if(!validateBody(req.body, 'Player')) {
            return res.status(400).json({message: `Bad request`});
        }
        const id: string = req.body.id;
        console.log(id);
        const playerToUpdate: Player [] = await playerService.getByAttribute({id});
        console.log(playerToUpdate);
        if(playerToUpdate.length) {
            const teamUpdate: Player = await playerService.update(playerToUpdate[0]);
            return res.status(200).json({teamUpdate})
        }
        return res.status(400).json({message: `Unable to find a player with ID: ${id}`})
    } catch (error) {
        return res.status(500).json({error})
    }
}

export const deletePlayer: Handler = async (req: Request, res: Response) => {
    try {
        const playerId: string = stringChangeFormat(req.params.id);
        const answer: DeleteResult = await playerService.deleteById(playerId);
        if(answer.affected) return res.status(200).json({message: 'Team deleted succesfully'});
        return res.status(400).json({message:  `Team with id ${playerId} does not exist`});
    }
    catch (error) {
        return res.status(500).json({message: `Error: ${error}`});
    }
}

export const testPlayer: Handler = async (req:Request, res: Response) => {
    try {
        const team: Team [] = await teamService.getAll();
        const response = await playerService.functionTest({name: 'pedro', age: 12},team[0]);
        return res.status(200).json(response);
    } catch {
        return res.status(500).json('fallo la app');
    }
}