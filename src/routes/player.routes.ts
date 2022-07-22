import { Router } from "express";
import {
    createNewPlayer,
    deletePlayer,
    getAllPlayers,
    getPlayersByParam,
    updatePlayer
} from "../controllers/player.controller";

export const playerRoutes: Router = Router();

playerRoutes.get("/api/players", getAllPlayers)

playerRoutes.get("/api/player", getPlayersByParam)

playerRoutes.post('/api/player', createNewPlayer);

playerRoutes.put('/api/player', updatePlayer);

playerRoutes.delete('/api/player/:id', deletePlayer);