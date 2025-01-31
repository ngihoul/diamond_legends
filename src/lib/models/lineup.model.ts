import { Player } from './player.model';

export interface LineUpDetail {
  playerId: number;
  order: number;
  position: number;
}

export type PositionsInGame = Record<string, string>;

export interface PlayersTableProps {
  players: Player[];
  isSelectedTeam: boolean;
  onLineUpChange?: (lineUp: LineUpDetail[]) => void;
}

export interface SortableRowProps {
  player: Player;
  index: number;
  isSelectedTeam: boolean;
  positionsInGame: PositionsInGame;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>, playerId: number) => void;
  positions: string[];
}

export interface FullLineUp {
  lineUpDetails: LineUpDetail[];
}
