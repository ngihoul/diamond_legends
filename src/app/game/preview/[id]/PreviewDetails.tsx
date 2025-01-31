'use client';

import { Game } from "@/lib/models/game.model";
import { Team } from "@/lib/models/team.model";
import { getGame } from "@/lib/services/game";
import { getTeam } from "@/lib/services/team";
import { useEffect, useState } from "react";

import './page.css';
import { Player, PositionType } from "@/lib/models/player.model";

export default function PreviewDetails({ gameId } : { gameId : number }) {
    // Get all positions except pitchers from Position Enum
    const positions = Object.keys(PositionType).filter((value) => isNaN(Number(value)) && value != 'SP' && value != 'RP' && value != "CL" && value != "UTL");

    const [game, setGame] = useState<Game | null>(null);
    const [homeTeam, setHomeTeam] = useState<Team | null>(null);
    const [awayTeam, setAwayTeam] = useState<Team | null>(null);

    const [homeHitters, setHomeHitters] = useState<Player[] | null>(null);
    const [homPitchers, setHomePitchers] = useState<Player[] | null>(null);

    const [awayHitters, setAwayHitters] = useState<Player[] | null>(null);
    const [awayPitchers, setAwayPitchers] = useState<Player[] | null>(null);

    const getHitters = (team: Team): Player[] => {
        console.log('test', JSON.stringify(team));
        
        return team.players.filter((p) => !p.positions.some((pos) => [1, 12, 13].includes(pos)))
    }
    const getPitchers = (team: Team): Player[] => {
        return team!.players.filter((p) => p.positions.some((pos) => [1, 12, 13].includes(pos)))
    }

    useEffect(() => {
        const fetchTeam = async (teamId: number) => {
            const response = await getTeam(teamId);
            return response;
        }

        const fetchGameAndTeamsDetails = async (gameId: number) => {
            const response = await getGame(gameId);
            setGame(response);
            const home = await fetchTeam(response.home.id);
            setHomeTeam(home);
            const away = await fetchTeam(response.away.id);
            setAwayTeam(away);
        }

        fetchGameAndTeamsDetails(gameId);
    }, [gameId]);

    useEffect(() => {
        if(homeTeam) {
            setHomeHitters(getHitters(homeTeam));
            console.log(homeHitters);
            
            setHomePitchers(getPitchers(homeTeam));
        }
    }, [homeTeam]);

    useEffect(() => {
        if(awayTeam) { 
            setAwayHitters(getHitters(awayTeam));
            console.log(awayHitters);
            
            setAwayPitchers(getPitchers(awayTeam));
        }
    }, [awayTeam]);

    return (
        <div className="preview-container">
            { game && 
            <>
                <div className="heading">
                    <h2>Avant-match</h2>
                    <p className="subtitle">{game?.away.name} vs {game?.home.name}</p>
                </div>
                <div className="teams-container">
                    <div className="away-team team">
                        <h3>{awayTeam?.name}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}></th>
                                    <th>Nom</th>
                                    <th>Positions</th>
                                    <th>AVG</th>
                                </tr>
                            </thead>
                            <tbody>
                                { awayHitters && awayHitters.length > 0 && awayHitters.map((player, index) => (
                                    <tr key={player.id}>
                                        { index < 9 ? ( <td>{ index + 1 }</td> ) : ( <td>BE</td> ) }
                                        { index < 9 ? ( <td>
                                            <select name="play-position">
                                                <option value=""></option>
                                                { positions.map((key, index) => ( 
                                                    // Adding 1 to index to match with real Enum values
                                                    <option key={key} value={index + 1}>{key}</option>
                                                 ))}
                                            </select>
                                        </td> ) : ( <td></td> )}
                                        <td>{player.lastname} {player.firstname}</td>
                                        
                                        <td>{player.positions.map((pos: number) => PositionType[pos]).join(', ')}</td>
                                        <td>{player.avg ? (player.avg.toFixed(3)) : (`0.000`)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="home-team team">
                        <h3>{homeTeam?.name}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}></th>
                                    <th>Nom</th>
                                    <th>Positions</th>
                                    <th>AVG</th>
                                </tr>
                            </thead>
                            <tbody>
                                { homeHitters && homeHitters.length > 0 && homeHitters.map((player) => (
                                    <tr key={player.id}>
                                        <td></td>
                                        <td></td>
                                        <td>{player.lastname} {player.firstname}</td>
                                        <td>{player.positions.map((pos: number) => PositionType[pos]).join(', ')}</td>
                                        <td>{player.avg ? (player.avg.toFixed(3)) : (`0.000`)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            }
        </div>
    );
}