// import { SignInFormValues, SignUpFormValues } from "../models/auth.model";
// import { ToastType } from "../models/toaster.model";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import apiClient from "./api";

// export async function Register(
//     values: SignUpFormValues, 
//     showToast : (message: string, type: ToastType) => void,
//     router : AppRouterInstance
// ): Promise<void> {
//     await apiClient.post('/auth/register', values)
//         .then(
//             () => {
//                 showToast(`Inscription réussie !`, 'success');
//                 router.push('/');
//             }
//         )
//         .catch((error: Error) => {
//             handleError(error, showToast);
//         }
//     );
// };

// export async function Login(
//     values: SignInFormValues,
//     showToast : (message: string, type: ToastType) => void, 
//     router: AppRouterInstance
// ): Promise<void> {
//     await apiClient.post('/auth/login', values)
//         .then((response) => {
//             saveToken(response.data);
//             showToast(`Connexion établie !`, 'success');
//             router.push('/');
//         })
//         .catch((error: Error) => {
//             handleError(error, showToast);
//         });
// }

// const saveToken = (token: string): void => {
//     localStorage.setItem('token', token);
// }

// const handleError = (error: Error, showToast : (message: string, type: ToastType) => void): void => {
//     const errorMessage = error.message || 'Erreur inconnue';
//     showToast(`Erreur : ${errorMessage}`, 'error');
// }
