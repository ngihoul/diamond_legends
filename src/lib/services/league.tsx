import { League } from "../models/league.model";
import apiClient, { apiServer } from "./api";

export const getLeague = async (leagueId: number): Promise<League> => {
    try {
        await (new Promise((resolve) => setTimeout(resolve, 1_000)));
        const response = await apiServer.get(`/league/${leagueId}`); 
        return response.data;
    } catch(error) {
        console.log(error);
        
        throw new Error((error as Error).message, (error as Error));
    }
}

export const nextDay = async (leagueId: number, teamId: number): Promise<League> => {
    try {
        const response = await apiClient.get(`/league/${leagueId}/next-day/${teamId}`); 
        return response.data;
    } catch(error) {
        throw new Error((error as Error).message, (error as Error));
    }
}

export const nextGame = async (leagueId: number, teamId: number): Promise<League> => {
    try {
        const response = await apiClient.get(`/league/${leagueId}/next-game/${teamId}`); 
        return response.data;
    } catch(error) {
        throw new Error((error as Error).message, (error as Error));
    }
}