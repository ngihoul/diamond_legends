import { API_URL } from "../../../config";
import { Country } from "../models/country.model";
import apiClient from "./api.service";

export default async function getCountries(): Promise<Country[]> {
    try {
        const response = await apiClient.get(`${API_URL}/country`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nationalities:', error);
        return [];
    }
}