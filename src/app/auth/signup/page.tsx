'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../../../../config';
import { Nationality } from '@/app/models/nationality.model';

import './page.css';
import getCountries from '@/lib/countries';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerSchema } from '@/lib/validations/schemas';

interface SignUpFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    nationalityIdString: string;
    nationalityId?: number;
}

export default function SignUp() {
    const [nationalities, setNationalities] = useState<Nationality[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    useEffect(() => {
      setIsLoading(true);
      const fetchNationalities = async () => {
        const data = await getCountries();
        setNationalities(data);
        setIsLoading(false);
      };
  
      fetchNationalities();
    }, []);
  
    const handleSubmit = async (values: SignUpFormValues) => {
      const formData = {
        ...values,
        nationalityId: parseInt(values.nationalityIdString),
      };
  
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
      <div className="signup-container">
        <h2>S&apos;enregistrer</h2>
        <p>Inscrivez-vous et rejoignez la communauté Diamond Legends</p>
        
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            nationalityIdString: '',
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              <div className="form-control">
                <label htmlFor="username">Nom d&apos;utilisateur</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="error" />
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
  
              <div className="form-control">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
  
              <div className="form-control">
                <label htmlFor="nationalityIdString">Nationalité</label>
                <Field as="select" name="nationalityIdString">
                  <option value="">Choisir une nationalité</option>
                  {!isLoading &&
                    nationalities.map((n) => (
                      <option value={n.id} key={n.id}>
                        {n.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name="nationalityIdString" component="div" className="error" />
              </div>
  
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Chargement...' : 'S\'inscrire'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }