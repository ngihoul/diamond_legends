'use client';

import { useAuth } from "@/lib/contexts/authContext";
import { useToaster } from "@/lib/contexts/toasterContext";
import { Team } from "@/lib/models/team.model";
import apiClient from "@/lib/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

import './page.css';

export default function Load() {
    const [teams, setTeams] = useState([]);
    const { userId } = useAuth();
    const { showToast } = useToaster();

    useEffect(() => {
        console.log(userId);
        if(userId) {
            apiClient.get(`/team/user`)
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error) => {
                console.log("Erreur depuis load");
                showToast(error.message, 'error');
            });
        }
    }, []);

    return (
        <div>
            {teams.length > 0 && (
                <div>
                    <h2>Choisir une partie</h2>
                    <table className="table table-load">
                        <thead>
                            <tr>
                                <th>Equipe</th>
                                <th>Saison</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team: Team) => {
                                return (
                                    <tr key={team.id}>
                                        <td>{team.name}</td>
                                        <td>{team.season}</td>
                                        <td>
                                            <Link className="btn" href={`/game/${team.id}/dashboard`}>Charger</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <div>
                <Link className="btn" href={'/game/new'}>Nouvelle partie</Link>
            </div>
        </div>
    );
}