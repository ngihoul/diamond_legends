'use client';

import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/lib/validations/schemas";
import { SignInFormValues } from "@/lib/models/auth.model";
import { Login } from "@/lib/services/auth";
import { useToaster } from "@/lib/contexts/ToasterContext";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const { showToast } = useToaster();
    const router = useRouter();

    const handleSubmit = async (values: SignInFormValues) => {
        await Login(values, showToast, router);
    }

    return (
        <div className="signin-container">
            <div className="heading">
                <h2>Se connecter</h2>
                <p>Vos équipes vous attendent !</p>
            </div>
            <Formik
                initialValues={{
                    emailOrUsername: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
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
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Chargement...' : 'S\'inscrire'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}