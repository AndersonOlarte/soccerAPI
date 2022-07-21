import { Router} from "express";
import {
    createNewTeam,
    deleteTeam,
    getAllTeams,
    getPlayers,
    getTeamByName,
    updateTeam
} from "../controllers/team.controller";

export const teamRoutes: Router = Router();

teamRoutes.get('/api/teams', getAllTeams);

teamRoutes.get('/api/team/:name', getTeamByName);

teamRoutes.get('/api/team/:name/players', getPlayers);

teamRoutes.post('/api/team', createNewTeam);

teamRoutes.put('/api/team', updateTeam);

teamRoutes.delete('/api/team/:name', deleteTeam);