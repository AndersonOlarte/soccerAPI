import { Player } from "../entity/player.entities";
import {Team} from "../entity/team.entities"

export class DataResponse {
    private statusCode: number;
    private data: Team[] | Player[] |string;
    private response: object;

    get getStatusCode() {
        return this.statusCode;
    }
    get getData() {
        return this.data;
    }
    get getResponse() {
        return this.response;
    }

    setStatus = (statusCode: number, data: Team[]| Player [] | string) => {
        this.statusCode = statusCode;
        this.data = data;
        this.response = {
            statusCode,
            data
        };
    }
}