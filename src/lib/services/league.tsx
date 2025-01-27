import { League } from "../models/league.model";
import apiClient from "./api";

export const getLeague = async (leagueId: number) => {
    try {
        const response = await apiClient.get(`/league/${leagueId}`); 
        return response.data;
    } catch(error) {
        throw new Error((error as Error).message, (error as Error));
    }
}

export const nextDay = async (leagueId: number): Promise<League> => {
    try {
        const response = await apiClient.get(`/league/${leagueId}/next-day`); 
        return response.data;
    } catch(error) {
        throw new Error((error as Error).message, (error as Error));
    }
}