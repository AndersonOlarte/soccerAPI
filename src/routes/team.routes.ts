import { Router} from "express";
import { createNewTeam, deleteTeam, getAllTeams, getTeamById, updateTeam } from "../controllers/team.controller";

export const teamRoutes: Router = Router();

teamRoutes.get('/getAllTeams', getAllTeams);

teamRoutes.get('/getTeam/:id', getTeamById);

teamRoutes.post('/createTeam', createNewTeam);

teamRoutes.put('/updateTeam', updateTeam);

teamRoutes.delete('/deleteTeam/:id', deleteTeam);