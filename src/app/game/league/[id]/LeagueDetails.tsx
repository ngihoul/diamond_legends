'use client';

import { useGame } from "@/lib/contexts/gameContext";
import { League } from "@/lib/models/league.model";
import { getLeague } from "@/lib/services/league";
import { useEffect, useState } from "react";

export default function LeagueDetails({ leagueId } : { leagueId : number}) {
    const [league, setLeague] =useState({} as League);

    const { teamSelected } = useGame();

    useEffect(() => {
        const fetchLeague = async () => {
            const response = await getLeague(leagueId);
            setLeague(response);
        };

        fetchLeague();
    }, [leagueId]);

    return (
        <div className="league-container">
            <div className="heading-left">
                <h2>{league.name}</h2>
                <table className="league-table">
                    <thead>
                        <tr>
                            <th>Equipe</th>
                            <th>W</th>
                            <th>L</th>
                            <th>%</th>
                            <th>L10</th>
                            <th>STRK</th>
                        </tr>
                    </thead>
                    <tbody>
                        {league.teams?.map((team) => (
                            <tr key={team.id}>
                                <td>{ team.id == teamSelected ? <b>{team.name}</b> : team.name}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}