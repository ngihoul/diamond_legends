import { ReactNode } from "react";
import { TeamViewCalendar } from "./team.model";

export interface Game {
    id: number;
    date: Date;
    season: number;
    status: GameStatus;
    home: TeamViewCalendar;
    away: TeamViewCalendar;
    homeRuns?: number;
    awayRuns?: number;
    homeHits?: number;
    awayHits?: number;
    homeErrors?: number;
    awayErrors?: number;
}

export interface GameQuery {
    leagueId?: number;
    teamId?: number;
    season?: number;
    month?: number | null;
    day?: number;
}

export interface GameContextType {
    teamSelected: number | null;
    leagueId: number | null;
    inGameDate: Date | null;
    changeTeam: (teamId: number | null) => void;
    changeInGameDate: (date: Date) => void;
}

export interface GameProviderProps {
    children: ReactNode;
}

export enum GameStatus {
    toBePlayed = 0,
    played = 1
}