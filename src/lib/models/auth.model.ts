import { ReactNode } from "react";
import { User } from "./user.model";

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
    user: User | null;
    login: (values: SignInFormValues) => Promise<void>;
    register: (values: SignUpFormValues) => Promise<void>;
    logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}