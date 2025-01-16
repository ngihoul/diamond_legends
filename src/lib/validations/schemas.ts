import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
        .max(120, 'Le nom d\'utilisateur doit contenir au plus 120 caractères')
        .required('Le nom d\'utilisateur est requis'),
    email: Yup.string()
        .email('Le format de l\'email est invalide')
        .required('L\'email est requis'),
    password: Yup.string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
        )
        .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Les mots de passe doivent correspondre')
        .required('La confirmation du mot de passe est requise'),
    nationalityIdString: Yup.string()
        .required('La nationalité est requise'),
});

export const LoginSchema = Yup.object().shape({
    emailOrUsername: Yup.string()
        .required('Le nom d\'utilisateur ou l\'email est requis'),
    password: Yup.string()
        .required('Le mot de passe est requis'),
});