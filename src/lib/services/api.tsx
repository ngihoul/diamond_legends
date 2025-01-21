import axios from "axios";
import { API_URL } from "../../../config";
import { Payload } from "../models/auth.model";
import { jwtDecode } from "jwt-decode";

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(isTokenValid(token)) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if(error.response) {
            // if(error.response.status === 401) {
            //     throw new Error('Vous devez vous identifier');
            // } else if(error.response.status === 500) {
            //     throw new Error('Erreur serveur. Veuillez réessayer.');
            // } else {
            //     const errorMessage = error.response.data.message || error.response.data;
            //     throw new Error(errorMessage);
            // }
            const errorMessage = error.response.data.message || error.response.data;
            throw new Error(errorMessage);
        }
        return Promise.reject(error);
    }
);

const isTokenValid = (token: string | null): boolean => {
    if(!token) {
        return false;
    }
    const decoded: Payload = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
}

export default apiClient;