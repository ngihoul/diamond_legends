import { TeamCreationValues } from "../models/team.model";
import apiClient from "./api";

export default async function createTeam(values : TeamCreationValues) {
    apiClient.post('/team', values)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            throw new Error(error.message, error);
        });
}