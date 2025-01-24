import { ReactNode } from "react";
import { TeamViewCalendar } from "./team.model";

export interface Game {
    id: number;
    season: number;
    date: Date;
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
    inGameDate: Date | null;
    changeTeam: (teamId: number | null) => void;
}

export interface GameProviderProps {
    children: ReactNode;
}