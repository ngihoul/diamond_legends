import { Nationality } from "@/app/models/nationality.model";
import { API_URL } from "../../config";

export default async function getCountries(): Promise<Nationality[]> {
    try {
        const response = await fetch(`${API_URL}/country`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching nationalities:', error);
        return [];
    }
}