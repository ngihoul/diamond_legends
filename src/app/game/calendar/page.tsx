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

export default function Calendar() {
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const [games, setGames] = useState<Game[]>([]);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

    const { teamSelected } = useGame();

    const year = new Date().getFullYear();

    useEffect(() => {
        const fetchGames = async (month?: number) => {
            if(teamSelected === null) return;

            const responseTeam = await getTeam(teamSelected);
            const leagueId = responseTeam.league.id;

            const responseGame = await getGames({ leagueId: leagueId, month: month });
            setGames(responseGame);
        };

        if(month === undefined) return;
        fetchGames(month);
        
    }, [month, teamSelected]);

    const previousMonth = () => {
        let prevMonth: number = month - 1;

        if(prevMonth <= 0) {
            prevMonth = 1;
        }

        setMonth(prevMonth);
    }

    const nextMonth = () => {
        let nextMonth: number = month + 1;

        if(nextMonth > 12) {
            nextMonth = 12;
        }

        setMonth(nextMonth);
    }

    return (
        <div className="calendar-container">
            <div className="heading">
                <h2>Calendrier</h2>
                <div className="current-month">
                    <span onClick={() => previousMonth()}><FontAwesomeIcon icon={faArrowLeftLong} /></span>
                    <p className="subtitle">{ `${months[month - 1]} ${year}` }</p>
                    <span onClick={() => nextMonth()}><FontAwesomeIcon icon={faArrowRightLong} /></span>
                </div>
            </div>
            <div className="calendar-wrapper">
                {games && games.length > 0 ? games.map((game: Game) => (
                    <div key={game.id} className="calendar-item">
                        <GameCard game={game} />
                    </div>
                )) : (
                    <div className="calendar-item">
                        <div className="calendar-item-left">
                            <p>Aucun match au mois de { months[month - 1].toLowerCase() }</p>
                            <p></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}