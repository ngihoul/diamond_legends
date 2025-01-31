import apiClient from "./api.service";

export async function getPlayer(playerId: number) {
    try {
        const response = await apiClient.get(`/player/${playerId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message, error);
    }
}