import { Game, GameStatus } from "@/lib/models/game.model";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExplosion } from '@fortawesome/free-solid-svg-icons'

import './GameCard.css';
import { useGame } from "@/lib/contexts/gameContext";
import Button from "../Button/Button";

export default function GameCard({ game} : { game: Game }) {
    const { teamSelected, inGameDate } = useGame();

    const isTeam = (teamId: number) => teamId === teamSelected;
    const isTeamClassName = (teamId: number) => isTeam(teamId) ? 'is-team' : '';
    const isTeamIcon = (teamId: number) => isTeam(teamId) ? (<FontAwesomeIcon icon={faExplosion} />) : '';
    const isToday = moment(game.date).format('DD/MM/YYYY') == moment(inGameDate).format('DD/MM/YYYY');
    
    return (
        <div className="game-card">
            <table className="game-card-table">
                <thead>
                    <tr className={ isToday && (isTeam(game.home.id) || isTeam(game.away.id)) ? 'is-today' : ''}>
                        <th>{ isToday ? 'Aujourd\'hui' : moment(game.date).format('DD/MM/YYYY')}</th>
                        <th className="runs">R</th>
                        <th className="hits">H</th>
                        <th className="errors">E</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={isTeamClassName(game.away.id)}>{ isTeamIcon(game.away.id) } {game.away.name} ({game.away.abbreviation})</td>
                        <td className="runs">{game.awayRuns}</td>
                        <td className="hits">{game.awayHits}</td>
                        <td className="errors">{game.awayErrors}</td>
                    </tr>
                    <tr>
                        <td className={ isTeamClassName(game.home.id) }>{ isTeamIcon(game.home.id) } {game.home.name} ({game.home.abbreviation})</td>
                        <td className="runs">{game.homeRuns}</td>
                        <td className="hits">{game.homeHits}</td>
                        <td className="errors">{game.homeErrors}</td>
                    </tr>
                    { (isTeam(game.home.id) || isTeam(game.away.id)) && isToday && game.status === GameStatus.toBePlayed && (
                        <tr>
                            <td colSpan={4} className="play">
                                <Button action={() => {alert('clicked')}} className="btn">Play ball !</Button>
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    );
}