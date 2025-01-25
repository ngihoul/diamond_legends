import { Team } from "./team.model";

export interface League {
    id: number;
    name: string;
    inGameDate: Date;
    teams?: Team[];
}