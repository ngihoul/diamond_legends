'use client';

import GameCard from "@/app/_components/GameCard/GameCard";
import { useGame } from "@/lib/contexts/gameContext";
import { Game } from "@/lib/models/game.model";
import getGames from "@/lib/services/game";
import { getTeam } from "@/lib/services/team";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import './page.css';
import Loader from "@/app/_components/Loader/Loader";

export default function Calendar() {
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const { teamSelected, inGameDate } = useGame();

    const [games, setGames] = useState<Game[]>([]);
    const [month, setMonth] = useState<number | null>(inGameDate ? inGameDate.getMonth() + 1 : null);
    const [onlyMines, setOnlyMines] = useState<boolean>(false);

    const year = new Date().getFullYear();

    useEffect(() => {
        const fetchGames = async (month: number | null) => {
            if(teamSelected === null) return;

            const responseTeam = await getTeam(teamSelected);
            const leagueId = responseTeam.league.id;

            const teamId = onlyMines ? teamSelected : undefined;

            const responseGame = await getGames({ leagueId: leagueId, month: month, teamId: teamId });
            setGames(responseGame);
        };

        fetchGames(month);
        
    }, [month, teamSelected, onlyMines]);

    const previousMonth = () => {
        if(month === null) return;
        let prevMonth: number = month - 1;

        if(prevMonth <= 0) {
            prevMonth = 1;
        }

        setMonth(prevMonth);
    }

    const nextMonth = () => {
        if(month === null) return;
        let nextMonth: number = month + 1;

        if(nextMonth > 12) {
            nextMonth = 12;
        }

        setMonth(nextMonth);
    }

    return (
        <div className="calendar-container">
            { month && games ? (
                <>
                    <div className="heading">
                        <h2>Calendrier</h2>
                        <div className="current-month">
                            <span onClick={() => previousMonth()}><FontAwesomeIcon icon={faArrowLeftLong} /></span>
                            <p className="subtitle">{ `${months[month - 1]} ${year}` }</p>
                            <span onClick={() => nextMonth()}><FontAwesomeIcon icon={faArrowRightLong} /></span>
                        </div>
                    </div>
                    
                    { games.length > 0 ? (
                        <>
                            <div className="filters">
                                <p className="">Filtrer :</p>
                                <span onClick={() => setOnlyMines(!onlyMines)} className={ onlyMines ? "pill active" : 'pill' }>Mes matchs uniquement</span>
                            </div>
                            <div className="calendar-wrapper">
                                {games.map((game: Game) => (
                                    <div key={game.id} className="calendar-item">
                                        <GameCard game={game} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-games">
                            <p>Aucun match programmé ce mois-ci.</p>
                        </div>
                    ) }
                    
                </>
            ) : (
                <Loader />
            )}
        </div>        
    );
}