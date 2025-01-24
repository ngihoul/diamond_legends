import { Game } from "@/lib/models/game.model";
import moment from "moment";

import './GameCard.css';
import { useGame } from "@/lib/contexts/gameContext";

export default function GameCard({ game} : { game: Game }) {
    const { teamSelected } = useGame();
    
    return (
        <div className="game-card">
            <table className="game-card-table">
                <thead>
                    <tr>
                        <th>{moment(game.date).format('DD/MM/YYYY')}</th>
                        <th className="runs">R</th>
                        <th className="hits">H</th>
                        <th className="errors">E</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={ game.away.id === teamSelected ? 'is-team' : ''}>{ game.away.name} ({game.away.abbreviation})</td>
                        <td className="runs">{game.awayRuns}</td>
                        <td className="hits">{game.awayHits}</td>
                        <td className="errors">{game.awayErrors}</td>
                    </tr>
                    <tr>
                        <td className={ game.home.id === teamSelected ? 'is-team' : ''}>{game.home.name} ({game.home.abbreviation})</td>
                        <td className="runs">{game.homeRuns}</td>
                        <td className="hits">{game.homeHits}</td>
                        <td className="errors">{game.homeErrors}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}