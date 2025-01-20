
'use client';

import React, { createContext, useContext, useState } from "react";
import { GameContextType, GameProviderProps } from "../models/game.model";

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

    const changeTeam = (teamId: number) => {
        setTeamSelected(teamId);
    }

    return (
        <GameContext.Provider value={{ teamSelected, changeTeam }}>
            { children }
        </GameContext.Provider>
    );
}