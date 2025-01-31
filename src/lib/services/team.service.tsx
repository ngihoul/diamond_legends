import { Team, TeamCreationValues } from "../models/team.model";
import apiClient from "./api.service";

export async function createTeam(values : TeamCreationValues) {
    try {
        const response = await apiClient.post('/team', values);
        return response.data;
    }catch(error) {
        throw new Error((error as Error).message, (error as Error));
    }
}

export async function getTeam(teamId: number): Promise<Team> {
    try {
        const response = await apiClient.get(`/team/${teamId}`); 
        return response.data;
    }catch(error) {
        throw new Error((error as Error).message, (error as Error));
    }
}