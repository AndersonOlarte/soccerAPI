import {Team} from "../entity/team.entities"

export class DataResponse {
    private statusCode: number;
    private data: Team[] | string;
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

    setStatus = (statusCode: number, data: Team[] | string) => {
        this.statusCode = statusCode;
        this.data = data;
        this.response = {
            statusCode,
            data
        };
    }
}