'use client';

import { Game } from "@/lib/models/game.model";
import { Team } from "@/lib/models/team.model";
import { getGame } from "@/lib/services/game";
import { getTeam } from "@/lib/services/team";
import { useEffect, useState } from "react";

import './page.css';
import { Player, PositionType } from "@/lib/models/player.model";
import PlayersTable from "./PlayersTable";
import { useGame } from "@/lib/contexts/gameContext";

export default function PreviewDetails({ gameId } : { gameId : number }) {
    const [game, setGame] = useState<Game | null>(null);
    const [homeTeam, setHomeTeam] = useState<Team | null>(null);
    const [awayTeam, setAwayTeam] = useState<Team | null>(null);

    const [homeHitters, setHomeHitters] = useState<Player[] | null>(null);
    const [homPitchers, setHomePitchers] = useState<Player[] | null>(null);

    const [awayHitters, setAwayHitters] = useState<Player[] | null>(null);
    const [awayPitchers, setAwayPitchers] = useState<Player[] | null>(null);

    const { teamSelected } = useGame();

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
                        { awayTeam && awayHitters && awayHitters.length > 0 && (
                            <>
                                <h3>{awayTeam?.name}</h3>
                                <PlayersTable players={awayHitters} isSelectedTeam={awayTeam.id == teamSelected} />
                            </>
                        )}
                    </div>
                    <div className="home-team team">
                        { homeTeam && homeHitters && homeHitters.length > 0 && (
                            <>
                                <h3>{homeTeam?.name}</h3>
                                <PlayersTable players={homeHitters} isSelectedTeam={homeTeam.id == teamSelected} />
                            </>
                        )}
                    </div>
                </div>
            </>
            }
        </div>
    );
}