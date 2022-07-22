import { Player } from "../entity/player.entities";
import { Team } from "../entity/team.entities";

export const validateBody = (reqBody: object, entity: string) => {
    const reqBodyKeys = Object.keys(reqBody).sort();
    const entityProperties: Array<string> = entity === 'Player' ?
        Player.properties.sort():
        Team.properties.sort();

    console.log(reqBodyKeys);
    console.log(entityProperties);
    for(let i = 0; i < reqBodyKeys.length; i++) {
        if(reqBodyKeys[i] !== (entityProperties[i])) return false;
    }
    return true;
}

export const validateParam = (param: string, entity: string) => {
    if (entity === "Player") return Player.properties.includes(param);
    return Team.properties.includes(param);
}

export const stringChangeFormat = (teamName: string): string => {
    teamName = teamName.replace("-", " ");
    if(teamName.includes("-")) teamName = stringChangeFormat(teamName);
    return teamName;
}