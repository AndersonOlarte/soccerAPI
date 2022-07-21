import { Router } from "express";
import { createNewPlayer, getAllPlayers } from "../controllers/player.controller";

export const playerRoutes: Router = Router();

playerRoutes.get("/api/players", getAllPlayers)

playerRoutes.post('/api/player', createNewPlayer);