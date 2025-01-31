import { PositionType } from "@/lib/models/player.model";
import { PositionsInGame } from "../models/lineup.model";

export const getFilteredPositions = () => {
  return Object.keys(PositionType).filter(
    (value) => isNaN(Number(value)) && !['SP', 'RP', 'CL', 'UTL'].includes(value)
  );
};

export const getInitialPositionsInGame = (): PositionsInGame => {
  const positions: PositionsInGame = {};
  for (let i = 1; i <= 9; i++) {
    positions[`positionInGame${i}`] = "";
  }
  return positions;
};