import { Game } from './game.model';
import { Player } from './player.model';

export interface GameOffensiveStats {
  ab: number;
  avg: number;
  bb: number;
  cs: number;
  double: number;
  game: Game;
  h: number;
  hr: number;
  ibb: number;
  id: number;
  obp: number;
  ops: number;
  order: number;
  pa: number;
  player: Player;
  position: number;
  r: number;
  rbi: number;
  sb: number;
  slg: number;
  so: number;
  triple: number;
}
