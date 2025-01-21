import { Team, TeamCreationValues } from "../models/team.model";
import apiClient from "./api";

export async function createTeam(values : TeamCreationValues) {
    try {
        const response = await apiClient.post('/team', values);
        return response.data;
    }catch(error: any) {
        throw new Error(error.message, error);
    }
}

export async function getTeam(teamId: number): Promise<Team> {
    try {
        const response = await apiClient.get(`/team/${teamId}`); 
        return response.data;
    }catch(error: any) {
        throw new Error(error.message, error);
    }
}