'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { GameContextType, GameProviderProps } from '../models/game.model';
import { getTeam } from '../services/team.service';
import { getLeague } from '../services/league.service';
import { FullLineUp } from '../models/lineup.model';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('gameContext must be used within a GameProvider');
  }

  return context;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [teamSelected, setTeamSelected] = useState<number | null>(null);
  const [leagueId, setLeagueId] = useState<number | null>(null);
  const [inGameDate, setInGameDate] = useState<Date | null>(null);
  const [lineUp, setLineUp] = useState<FullLineUp | null>(null);

  useEffect(() => {
    const storedTeam = window.localStorage.getItem('teamSelected');
    if (storedTeam) {
      setTeamSelected(parseInt(storedTeam));
    }

    const storedInGameDate = window.localStorage.getItem('inGameDate');
    if (storedInGameDate) {
      setInGameDate(new Date(storedInGameDate));
    }

    const storedLeagueId = window.localStorage.getItem('leagueId');
    if (storedLeagueId) {
      setLeagueId(parseInt(storedLeagueId));
    }
  }, []);

  const changeTeam = async (teamId: number | null) => {
    if (teamId) {
      const responseTeam = await getTeam(teamId);

      const leagueId = responseTeam.league.id;
      setLeagueId(leagueId);

      const responseLeague = await getLeague(leagueId);
      setInGameDate(new Date(responseLeague.inGameDate));

      window.localStorage.setItem('teamSelected', teamId.toString());
      window.localStorage.setItem('inGameDate', responseLeague.inGameDate.toString());
      window.localStorage.setItem('leagueId', leagueId.toString());
    } else {
      window.localStorage.removeItem('teamSelected');
      window.localStorage.removeItem('inGameDate');
      window.localStorage.removeItem('leagueId');
    }

    setTeamSelected(teamId);
  };

  const changeInGameDate = async (date: Date) => {
    setInGameDate(date);
    window.localStorage.setItem('inGameDate', date.toString());
  };

  const saveLineUp = (lineUp: FullLineUp) => {
    setLineUp(lineUp);
  };

  return (
    <GameContext.Provider
      value={{ teamSelected, leagueId, inGameDate, lineUp, changeTeam, changeInGameDate, saveLineUp }}>
      {children}
    </GameContext.Provider>
  );
};
