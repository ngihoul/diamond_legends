
'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { GameContextType, GameProviderProps } from "../models/game.model";
import { getTeam } from "../services/team";
import { getLeague } from "../services/league";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);

    if(!context) {
        throw new Error('gameContext must be used within a GameProvider');
    }

    return context;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [teamSelected, setTeamSelected] = useState<number | null>(null);
    const [inGameDate, setInGameDate] = useState<Date | null>(null);

    useEffect(() => {
        const storedTeam = window.localStorage.getItem('teamSelected');
        if(storedTeam) {
            setTeamSelected(parseInt(storedTeam));
        }

        const storedInGameDate = window.localStorage.getItem('inGameDate');
        if(storedInGameDate) {
            setInGameDate(new Date(storedInGameDate));
        }
    }, []);

    const changeTeam = async (teamId: number | null) => {
        if(teamId) {
            const responseTeam = await getTeam(teamId);
            const responseLeague = await getLeague(responseTeam.league.id);
            setInGameDate(new Date(responseLeague.inGameDate));

            window.localStorage.setItem('teamSelected', teamId.toString());
            window.localStorage.setItem('inGameDate', responseLeague.inGameDate.toString());
        } else {
            window.localStorage.removeItem('teamSelected');
            window.localStorage.removeItem('inGameDate');
        }
        
        setTeamSelected(teamId);
    }

    return (
        <GameContext.Provider value={{ teamSelected, inGameDate, changeTeam }}>
            { children }
        </GameContext.Provider>
    );
}