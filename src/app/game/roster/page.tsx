'use client';

import { useGame } from "@/lib/contexts/gameContext";
import { HandedType, Player, PositionType } from "@/lib/models/player.model";
import { Team } from "@/lib/models/team.model";
import { getTeam } from "@/lib/services/team";
import Image from "next/image";
import { useEffect, useState } from "react";

import './page.css';

export default function Roster() {
    const [team, setTeam] = useState({} as Team);

    const { teamSelected } = useGame();

    useEffect(() => {
        const fetchTeam = async () => {
            // QUESTION : Pourquoi useEffect s'exécute 2 fois ?
            const response = await getTeam(teamSelected!);
            console.log('Roster page - useEffect : excuté');
            setTeam(response);
        }

        fetchTeam();
    }, []);

    return (
        <div className="roster-container">
            <div className="heading-left">
                <h2>Roster</h2>
            </div>
            { team.players && team.players.length > 0 ? (
                <table className="roster-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>T/B</th>
                            <th>Energie</th>
                            <th>Positions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.players.map((player: Player) => {
                            return (
                                <tr key={player.id}>
                                    <td>{player.firstname} {player.lastname} <Image src={`/img/flags/${player.nationality.alpha2}.png`} alt={player.nationality.alpha2} width={30} height={20} /></td>
                                    <td>{`${HandedType[player.throw]} / ${HandedType[player.bat]}`}</td>
                                    <td className="energy">
                                        <div className="energy-bar" style={ player.energy === 100 ? { width: '100%', backgroundColor: 'green' } : player.energy >= 70 && player.energy < 100 ? { width: `${player.energy}%`, backgroundColor: '#ACE1AF' } : player.energy > 50 &&player.energy < 70 ? { width: `${player.energy}%`, backgroundColor: 'orange' } : { width: `${player.energy}%`, backgroundColor: 'red'}}></div>
                                    </td>
                                    <td>{player.positions.map((pos: number) => PositionType[pos]).join(', ')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Aucun joueur dans votre équipe</p>
            )}
        </div>
    );
}