import {Team} from "../entity/team.entities"

export interface IResponse {
    
    statusCode: number,
    data: Team[] | string,
}