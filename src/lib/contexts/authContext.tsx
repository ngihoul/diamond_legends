'use client';

import React, { createContext, useContext, useState } from "react";
import { AuthContextType, AuthProviderProps, SignInFormValues, SignUpFormValues } from "../models/auth.model";
import apiClient from "../services/api";
import { User } from "../models/user.model";
import { ToastType } from "../models/toaster.model";
import { useToaster } from "./toasterContext";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { showToast } = useToaster();
    const router = useRouter();

    const login = async (values: SignInFormValues) => {
        await apiClient.post('/auth/login', values)
            .then((response) => {
                saveToken(response.data);
                setUser(response.data.user);
                showToast(`Connexion réussie !`, 'success');
                router.push('/');
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
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout}}>
            { children }
        </AuthContext.Provider>
    );
}


const saveToken = (token: string): void => {
    localStorage.setItem('token', token);
}

const removeToken = (): void => {
    localStorage.removeItem('token');
}

const handleError = (error: Error, showToast : (message: string, type: ToastType) => void): void => {
    const errorMessage = error.message || 'Erreur inconnue';
    showToast(`Erreur : ${errorMessage}`, 'error');
}