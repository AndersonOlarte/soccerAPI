import express from 'express';
import dotenv from "dotenv";
import {teamRoutes} from './routes/team.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi  from 'swagger-ui-express';
import { options } from './swaggerOptions';

const app = express();
dotenv.config();

app.set('port', process.env.SERVER_PORT || 8080);


app.use(express.json()); // converts the incoming body on PUT and POST request into JSON objects
app.use(teamRoutes);

const spec = swaggerJSDoc(options);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));



export default app;

