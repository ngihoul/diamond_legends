import { ReactNode } from 'react';
import { TeamViewCalendar } from './team.model';
import { FullLineUp } from './lineup.model';

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
  lineUp: FullLineUp | null;
  changeTeam: (teamId: number | null) => void;
  changeInGameDate: (date: Date) => void;
  saveLineUp: (lineUp: FullLineUp) => void;
}

export interface GameProviderProps {
  children: ReactNode;
}

export enum GameStatus {
  toBePlayed = 0,
  played = 1,
}

export interface GameEvent {
  message: string;
  inning: number;
  balls: number;
  strikes: number;
  outs: number;
  runHome: number;
  runAway: number;
}
