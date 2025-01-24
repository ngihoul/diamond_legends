import { Game, GameQuery } from "../models/game.model";
import apiClient from "./api";

export default async function getGames(query: GameQuery): Promise<Game[]> {
    try {
        const response = await apiClient.get('/game', { params: query });
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message, (error as Error));
    }
}