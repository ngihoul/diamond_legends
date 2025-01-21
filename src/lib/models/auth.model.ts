import { ReactNode } from "react";

export interface SignInFormValues {
    emailOrUsername: string;
    password: string;
}

export interface SignUpFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    nationalityIdString: string;
    nationalityId?: number;
}

export interface AuthContextType {
    token: string | null;
    userId: string | null;
    login: (values: SignInFormValues) => Promise<void>;
    register: (values: SignUpFormValues) => Promise<void>;
    logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface Payload {
    Id: string;
    Username: string;
    aud: string;
    exp: number;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    iss: string;
}