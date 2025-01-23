'use client';

import UniformPreview from "@/app/_components/UniformPreview/UniformPreview";
import { Country } from "@/lib/models/country.model";
import { Team, TeamCreationValues } from "@/lib/models/team.model";
import getCountries from "@/lib/services/countries";
import { createTeam } from "@/lib/services/team";
import { TeamCreationSchema } from "@/lib/validations/schemas"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { CompactPicker } from 'react-color';

import './page.css';
import { useRouter } from "next/navigation";
import { useGame } from "@/lib/contexts/gameContext";
import { useToaster } from "@/lib/contexts/toasterContext";

export default function New() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [colors, setColors] = useState({
        color_1: '#CCCCCC',
        color_2: '#0D00A4',
        color_3: '#0D00A4'
    });

    const router = useRouter();

    const { changeTeam } = useGame();
    const { showToast } = useToaster(); 

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
        console.log("Clicked");
        
        const formData = {
            ...values,
            countryId: parseInt(values.countryIdString),
            logo: null,
            color_1: colors.color_1.substring(1),
            color_2: colors.color_2.substring(1),
            color_3: colors.color_3.substring(1)
        };

        try {
            const team: Team = await createTeam(formData);
            changeTeam(team.id);
            showToast("Equipe créée avec succès", 'success');
            router.push('/game/dashboard')
        }catch(error: any) {
            showToast(error.message, 'error');
        }
    }

    return (
        <div>
            <div className="heading">
                <h2>Nouvelle partie</h2>
                <p className="subtitle">Let&apos;s go to the ballpark !</p>
            </div>
            
            <Formik
                initialValues={{
                    name: '',
                    abbreviation: '',
                    city: '',
                    countryIdString: '',
                    logo: '',
                    color_1: '',
                    color_2: '',
                    color_3: '',
                }}
                validationSchema={TeamCreationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, isValid, isSubmitting}) => (
                    <Form className="team-form">
                        <div className="form-control">
                            <label htmlFor="name">Nom de l&apos;équipe</label>
                            <Field
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Nom de l'équipe"
                            />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="abbreviation">Abréviation</label>
                            <Field
                                type="text"
                                name="abbreviation"
                                value={values.abbreviation}
                                onChange={handleChange}
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
                        
                        <div className="uniform-picker">
                            <div className="color-pickers">
                                <div className="form-control">
                                    <label htmlFor="color_1">Couleur Primaire</label>
                                    <CompactPicker color={colors.color_1} onChangeComplete={ (color) => setColors({ ...colors, color_1: color.hex })} />
                                </div>
                                
                                <div className="form-control">
                                    <label htmlFor="color_2">Couleur Secondaire</label>
                                    <CompactPicker color={colors.color_2} onChangeComplete={ (color) => setColors({ ...colors, color_2: color.hex })} />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="color_3">Couleur tertiaire</label>
                                    <CompactPicker color={colors.color_3} onChangeComplete={ (color) => setColors({ ...colors, color_3: color.hex })} />
                                </div>
                            </div>
                            <div className="uniform-preview">
                                <UniformPreview primaryColor={colors.color_1} secondaryColor={colors.color_2} tertiaryColor={colors.color_3} teamName={values.name} />
                            </div>
                        </div>

                        {/* TODO : create a custom LoadingSpinner */}
                        <button type="submit" disabled={isSubmitting || !isValid }>
                            {isSubmitting ? 'Chargement...' : 'Créer son équipe'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}