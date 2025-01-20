
import { API_URL } from "../../../config";
import { Country } from "../models/country.model";

export default async function getCountries(): Promise<Country[]> {
    try {
        const response = await fetch(`${API_URL}/country`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching nationalities:', error);
        return [];
    }
}