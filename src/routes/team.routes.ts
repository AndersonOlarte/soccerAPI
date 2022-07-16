import { Router} from "express";
import { createNewTeam, deleteTeam, getAllTeams, getTeamById, updateTeam } from "../controllers/team.controller";

export const teamRoutes: Router = Router();

teamRoutes.get('/api/teams', getAllTeams);

teamRoutes.get('/api/team/:id', getTeamById);

teamRoutes.post('/api/team', createNewTeam);

teamRoutes.put('/api/team', updateTeam);

teamRoutes.delete('/api/team/:id', deleteTeam);