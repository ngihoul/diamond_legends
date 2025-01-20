'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, Payload, SignInFormValues, SignUpFormValues } from "../models/auth.model";
import apiClient from "../services/api";
import { ToastType } from "../models/toaster.model";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useToaster } from "./toasterContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const token = getToken();
    const initialUserId = token && isTokenValid(token) ? getUserId(token) : null;

    const [userId, setUserId] = useState<string | null>(initialUserId);
    const { showToast } = useToaster();
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if(isTokenValid(token)) {
            setUserId(getUserId(token));
        } else {
            removeToken();
            setUserId(null);
            router.push('/');
        }
    }, []);

    const login = async (values: SignInFormValues) => {
        await apiClient.post('/auth/login', values)
            .then((response) => {
                saveToken(response.data);
                const userId = getUserId(response.data);
                setUserId(userId);
                console.log(userId);
                showToast(`Connexion réussie !`, 'success');
                router.push('/game/load');
            })
            .catch((error: Error) => {
                handleError(error, showToast);
            });
    };

    const register = async (values: SignUpFormValues) => {
        await apiClient.post('/auth/register', values)
            .then(
                () => {
                    showToast(`Inscription réussie !`, 'success');
                    router.push('/');
                }
            )
            .catch((error: Error) => {
                handleError(error, showToast);
            });
    };

    const logout = async () => {
        removeToken();
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ userId, login, register, logout}}>
            { children }
        </AuthContext.Provider>
    );
}


const saveToken = (token: string): void => {
    window.localStorage.setItem('token', token);
}

const getToken = (): string | null => {
    // QUESTION : ReferenceError: localStorage is not defined
    let token: string | null = null;
    if(typeof window !== 'undefined'){
        token = window.localStorage.getItem('token');
    }

    return token;
}

const removeToken = (): void => {
    window.localStorage.removeItem('token');
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
    return decoded.Id
}

// const getUser = async (token: string): Promise<User | null> => {
//     if (isTokenValid(token)) {
//         const decoded: Payload = jwtDecode(token);
//         const response = await apiClient.get(`/users/${decoded.Id}`);
//         return response.data;
//     } else {
//         return null;
//     }
// }

const handleError = (error: Error, showToast : (message: string, type: ToastType) => void): void => {
    const errorMessage = error.message || 'Erreur inconnue';
    showToast(`Erreur : ${errorMessage}`, 'error');
}