import { Country } from "./country.model";
import { League } from "./league.model";
import { Player } from "./player.model";
import { User } from "./user.model";

export interface Team {
    id: number;
    name: string;
    abbreviation: string;
    owner: User;
    city: string;
    country: Country;
    league: League;
    season: number;
    currentDay: number;
    budget: number;
    logo: string;
    color_1: string;
    color_2: string;
    color_3: string;
    players: Player[];
}

export interface TeamCreationValues {
    name: string;
    abbreviation: string;
    city: string;
    countryIdString: string;
    countryId?: number;
    logo?: string | null,
    color_1?: string;
    color_2?: string;
    color_3?: string;
}

export interface UniformValues {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor?: string;
    teamName?: string;
}

export interface TeamViewPlayer {
    id: number;
    name: string;
    abbreviation: string;
}