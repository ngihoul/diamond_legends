'use client';

import { useEffect, useState } from 'react';
import { Nationality } from '@/lib/models/nationality.model';

import './page.css';
import getCountries from '@/lib/services/countries';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerSchema } from '@/lib/validations/schemas';
import { useToaster } from '@/lib/contexts/ToasterContext';
import { SignUpFormValues } from '@/lib/models/auth.model';
import { Register } from '@/lib/services/auth';

export default function SignUp() {
    const [nationalities, setNationalities] = useState<Nationality[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showToast } = useToaster();
  
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
      
      await Register(formData, showToast);
    };
  
    return (
      <div className="signup-container">
        <div className="heading">
          <h2>S&apos;enregistrer</h2>
          <p>Inscrivez-vous et rejoignez la communauté Diamond Legends</p>
        </div>
        
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