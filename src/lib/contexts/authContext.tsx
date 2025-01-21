'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, Payload, SignInFormValues, SignUpFormValues } from "../models/auth.model";
import apiClient from "../services/api";
import { ToastType } from "../models/toaster.model";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useToaster } from "./toasterContext";
import { useGame } from "./gameContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const { showToast } = useToaster();
    const { changeTeam } = useGame();
    const router = useRouter();

    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if (storedToken && isTokenValid(storedToken)) {
            setToken(storedToken);
            setUserId(getUserId(storedToken));
        } else {
            window.localStorage.removeItem('token');
            setToken(null);
            changeTeam(null);
            setUserId(null);
            router.push('/');
        }
    }, []);

    const login = async (values: SignInFormValues) => {
        try {
            const response = await apiClient.post('/auth/login', values);
            const newToken = response.data;
            window.localStorage.setItem('token', newToken);
            
            const newUserId = getUserId(newToken);
            setUserId(newUserId);
            
            showToast('Connexion réussie !', 'success');
            router.push('/game/load');
        } catch (error: any) {
            // TODO : trouver un autre type que any
            const errorMessage = error.message || 'Une erreur est survenue';
            showToast(errorMessage, 'error');
            
            // Gestion des redirections ici si nécessaire
            // if (error.response?.status === 401) {
            //     router.push('/auth/signin');
            // }
        }
    };

    const register = async (values: SignUpFormValues) => {
        try {
            await apiClient.post('/auth/register', values);
            showToast('Inscription réussie !', 'success');
            router.push('/');
        } catch (error) {
            handleError(error as Error, showToast);
        }
    };

    const logout = async () => {
        window.localStorage.removeItem('token');
        setToken(null);
        setUserId(null);
        changeTeam(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ token, userId, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const isTokenValid = (token: string | null): boolean => {
    if(!token) {
        return false;
    }
    const decoded: Payload = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
}

const getUserId = (token: string | null): string | null => {
    if(!token) {
        return null;
    }
    const decoded: Payload = jwtDecode(token);
    return decoded.Id;
}

const handleError = (error: Error, showToast: (message: string, type: ToastType) => void): void => {
    const errorMessage = error.message || 'Erreur inconnue';
    showToast(`Erreur : ${errorMessage}`, 'error');
}