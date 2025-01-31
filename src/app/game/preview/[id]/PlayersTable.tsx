import { Player, PositionType } from "@/lib/models/player.model"
import { useState } from "react";

import './PlayersTable.css';

type PlayersTableProps = {
    players: Player[];
    isSelectedTeam: boolean;
}

type PositionsInGame = Record<string, string>;

export default function PlayersTable({ players, isSelectedTeam } : PlayersTableProps ) {
    // Get all positions except pitchers from Position Enum
    const positions = Object.keys(PositionType).filter((value) => isNaN(Number(value)) && value != 'SP' && value != 'RP' && value != "CL" && value != "UTL");

    const [positionsInGame, setPositionsInGame] = useState<PositionsInGame>({
        positionInGame1: "",
        positionInGame2: "",
        positionInGame3: "",
        positionInGame4: "",
        positionInGame5: "",
        positionInGame6: "",
        positionInGame7: "",
        positionInGame8: "",
        positionInGame9: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setPositionsInGame((prevValues) => {
            const newValues = { ...prevValues };

            Object.keys(newValues).forEach((key) => {
                if(newValues[key] === value) {
                    newValues[key] = "";
                }
            });

            newValues[name] = value;

            return newValues;
        })
    };

    return(
        <table className="players-table">
            <thead>
                <tr>
                    <th colSpan={2}></th>
                    <th>Nom</th>
                    <th>Energie</th>
                    <th>Positions</th>
                    <th>AVG</th>
                </tr>
            </thead>
            <tbody>
                { players && players.length > 0 && players.map((player, index) => (
                    <tr key={player.id}>
                        { isSelectedTeam ? (
                            <>
                                { index < 9 ? ( <td>{ index + 1 }</td> ) : ( <td>BE</td> ) }
                                { index < 9 ? ( <td>
                                    <select onChange={handleChange} name={`positionInGame${index + 1}`} value={positionsInGame[`positionInGame${index + 1}`]}>
                                        <option value=""></option>
                                        { positions.map((key, index) => ( 
                                            // Adding 1 to index to match with real Enum values
                                            <option key={key} value={index + 1}>{key}</option>
                                        ))}
                                    </select>
                                </td> ) : ( <td></td> )}
                            </>
                        ) : ( 
                            <>
                                <td></td>
                                <td></td>
                            </>
                        ) }
                        <td>{player.lastname} {player.firstname}</td>
                        <td>{player.energy}%</td>
                        <td>{player.positions.map((pos: number) => PositionType[pos]).join(', ')}</td>
                        <td>{player.avg ? (player.avg.toFixed(3)) : (`0.000`)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}