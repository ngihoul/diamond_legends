'use client';

import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/lib/validations/schemas";
import { SignInFormValues } from "@/lib/models/auth.model";
import { useAuth } from "@/lib/contexts/authContext";

export default function SignIn() {
    const { login } = useAuth();

    const handleSubmit = async (values: SignInFormValues) => {
        await login(values);
    }

    return (
        <div className="signin-container">
            <div className="heading">
                <h2>Se connecter</h2>
                <p className="subtitle">Vos équipes vous attendent !</p>
            </div>
            <Formik
                initialValues={{
                    emailOrUsername: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, isSubmitting }) => (
                    <Form className="signin-form">
                        <div className="form-control">
                            <label htmlFor="emailOrUsername">Email ou nom d&apos;utilisateur</label>
                            <Field 
                                type="text"
                                name="emailOrUsername"
                                placeholder="Email ou nom d&apos;utilisateur"
                            />
                            <ErrorMessage name="emailOrUsername" component="div" className="error" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Mot de passe</label>
                            <Field 
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                            />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>
                        <button className="btn" type="submit" disabled={isSubmitting || !isValid }>
                            {isSubmitting ? 'Chargement...' : 'Se connecter'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}