import apiClient from "./api";

export const getLeague = async (leagueId: number) => {
    try {
        const response = await apiClient.get(`/league/${leagueId}`); 
        return response.data;
    }catch(error) {
        throw new Error((error as Error).message, (error as Error));
    }
}