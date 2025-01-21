import { TeamCreationValues } from "../models/team.model";
import apiClient from "./api";

export default async function createTeam(values : TeamCreationValues) {
    try {
        const response = await apiClient.post('/team', values);
        return response.data;
    }catch(error: any) {
        throw new Error(error.message, error);
    }
}