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