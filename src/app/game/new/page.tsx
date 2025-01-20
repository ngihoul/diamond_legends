'use client';

import { Country } from "@/lib/models/country.model";
import { TeamCreationValues } from "@/lib/models/team.model";
import getCountries from "@/lib/services/countries";
import createTeam from "@/lib/services/team";
import { TeamCreationSchema } from "@/lib/validations/schemas"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"

export default function New() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchNationalities = async () => {
            const data = await getCountries();
            setCountries(data);
            setIsLoading(false);
        };
        
        fetchNationalities();
    }, []);

    const handleSubmit = async (values: TeamCreationValues) => {
        const formData = {
            ...values,
            countryId: parseInt(values.countryIdString),
        };

        createTeam(formData);
    }

    return (
        <div>
            <h2>Nouvelle partie</h2>
            <Formik
                initialValues={{
                    name: '',
                    city: '',
                    countryIdString: '',
                    // logo: '',
                    color_1: '',
                    color_2: '',
                    color_3: '',
                }}
                validationSChema={TeamCreationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting}) => (
                    <Form className="team-form">
                        <div className="form-control">
                            <label htmlFor="name">Nom de l&apos;équipe</label>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Nom de l'équipe"
                            />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div className="form-control">
                        <label htmlFor="name">Ville de l&apos;équipe</label>
                            <Field
                                type="text"
                                name="city"
                                placeholder="Ville de l'équipe"
                            />
                            <ErrorMessage name="city" component="div" className="error" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="nationalityIdString">Pays</label>
                            <Field as="select" name="countryIdString">
                            <option value="">Choisir une pays</option>
                            {!isLoading &&
                                countries.map((n) => (
                                <option value={n.id} key={n.id}>
                                    {n.name}
                                </option>
                                ))}
                            </Field>
                            <ErrorMessage name="nationalityIdString" component="div" className="error" />
                        </div>
                        {/* TODO : create a custom LoadingSpinner */}
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Chargement...' : 'Créer son équipe'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}