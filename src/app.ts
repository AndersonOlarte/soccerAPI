import express from 'express';
import dotenv from "dotenv";
import {teamRoutes} from './routes/team.routes';

const app = express();

dotenv.config();

app.use(express.json());
app.use(teamRoutes);


app.set('port', process.env.SERVER_PORT || 8080);

export default app;

