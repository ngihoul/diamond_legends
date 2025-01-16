import { API_URL } from "../../../config";
import { SignInFormValues, SignUpFormValues } from "../models/auth.model";
import { ToastType } from "../models/toaster.model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function Register(values: SignUpFormValues, showToast : (message: string, type: ToastType) => void): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`${data}`);
        }

        showToast(`Inscription réussie !`, 'success');
    } catch (e) {
        const errorMessage = (e as Error).message || 'Erreur inconnue';
        showToast(`Erreur : ${errorMessage}`, 'error');
    }
};

export async function Login(values: SignInFormValues, showToast : (message: string, type: ToastType) => void, router: AppRouterInstance): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error(`${response.statusText}`);
        }

        const data = await response.text();

        saveToken(data);

        showToast(`Connexion établie !`, 'success');

        router.push('/');
    } catch (e) {
        const errorMessage = (e as Error).message || 'Erreur inconnue';
        showToast(`Erreur : ${errorMessage}`, 'error');
    }
}

const saveToken = (token: string): void => {
    localStorage.setItem('token', token);
}