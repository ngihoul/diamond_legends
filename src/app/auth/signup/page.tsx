'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../../../../config';
import { Nationality } from '@/app/models/nationality.model';

import './page.css';
import getCountries from '@/lib/countries';

export default function SignUp() {

    const [nationalities, setNationalities] = useState<Nationality[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        nationalityIdString: '',
        nationalityId: 0
    });

    useEffect(() => {
        setIsLoading(true);
        const fetchNationalities = async () => {
            const data = await getCountries();
            setNationalities(data);
            setIsLoading(false);
        }

        fetchNationalities();
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formData.nationalityId = parseInt(formData.nationalityIdString);
        // TODO: to place in lib
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data)
        }catch(e) {
            console.error(e);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <div className="signup-container">
            <h2>S&apos;enregistrer</h2>
            <p>Inscrivez-vous et rejoignez la communauté Diamond Legends</p>
            
            <form className="signup-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label id="username">Nom d&apos;utilisateur</label>
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Nom d'utilisateur"
                    />
                </div>
                
                <div className="form-control">
                    <label id="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>

                <div className="form-control">
                    <label id="password">Mot de passe</label>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Mot de passe"
                    />
                </div>

                <div className="form-control">
                    <label id="confirmPassword">Confirmer le mot de passe</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmer le mot de passe"
                    />
                </div>

                <div className="form-control">
                    <label id="nationality">Nationalité</label>
                    <select name="nationalityIdString" onChange={handleChange}>
                        <option value="">Choisir une nationalité</option>
                        {!isLoading && (
                            nationalities.map((n) => <option value={n.id} key={n.id}>{n.name}</option>)
                        )}
                    </select>
                </div>

                <button type="submit">S&apos;inscrire</button>
            </form>
        </div>
    );
}