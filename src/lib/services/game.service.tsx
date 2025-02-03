import { Game, GameQuery } from '../models/game.model';
import { FullLineUp, LineUpDetail } from '../models/lineup.model';
import apiClient from './api.service';

export async function getGames(query: GameQuery): Promise<Game[]> {
  try {
    const response = await apiClient.get('/game', { params: query });
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message, error as Error);
  }
}

export async function getGame(gameId: number): Promise<Game> {
  try {
    const response = await apiClient.get(`/game/${gameId}`);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message, error as Error);
  }
}

export async function playGame(gameId: number, fullLineUp: FullLineUp, playByPlay: boolean = false): Promise<Game> {
  try {
    const response = await apiClient.post(`/game/play/${gameId}?playByPlay=${playByPlay}`, fullLineUp);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message, error as Error);
  }
}

export async function getOpponentLineUp(gameId: number, opponentId: number): Promise<LineUpDetail[]> {
  try {
    const response = await apiClient.get(`/game/preview/${gameId}/vs/${opponentId}`);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message, error as Error);
  }
}
