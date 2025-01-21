'use client';

import { useAuth } from "@/lib/contexts/authContext";
import { useToaster } from "@/lib/contexts/toasterContext";
import { Team } from "@/lib/models/team.model";
import apiClient from "@/lib/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

import './page.css';
import Button from "@/app/_components/Button/Button";
import { useGame } from "@/lib/contexts/gameContext";
import { useRouter } from "next/navigation";

export default function Load() {
    const [teams, setTeams] = useState([]);

    const { userId } = useAuth();
    const { showToast } = useToaster();
    const { changeTeam } = useGame();

    const router = useRouter();

    useEffect(() => {
        console.log(userId);
        if(userId) {
            apiClient.get(`/team/user`)
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error: Error) => {
                console.log("Erreur depuis load");
                showToast(error.message, 'error');
            });
        }
    }, [userId]);

    const loadGame = (teamId: number) => {
        changeTeam(teamId);
        router.push('/game/dashboard');
    }

    return (
        <div className="load-game">
            {teams.length > 0 && (
                <div>
                    <div className="heading">
                        <h2>Choisir une partie</h2>
                        <p className="subtitle">Reprends la ou tu t&apos;étais arrêté !</p>
                    </div>
                    
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
                                            <Button className="btn" action={() => loadGame(team.id)}>Charger</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <div>
                <div className="heading">
                    <h2>Lance une nouvelle partie</h2>
                    <p className="subtitle">Enfile ta vareuse et playball !</p>
                </div>
                
                <Link className="btn" href={'/game/new'}>Nouvelle partie</Link>
            </div>
        </div>
    );
}