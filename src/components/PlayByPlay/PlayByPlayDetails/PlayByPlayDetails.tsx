'use client';

import { Game, GameEvent } from '@/lib/models/game.model';
import { getGame, playGame } from '@/lib/services/game.service';
import { useEffect, useState } from 'react';
import { HUB_URL } from '../../../../config';
import useSignalR from '@/lib/hooks/useSignaR';
import { useGame } from '@/lib/contexts/gameContext';
import Scoreboard from '../Scoreboard/Scoreboard';

export default function PlayByPlayDetails({ gameId }: { gameId: number }) {
  const [game, setGame] = useState<Game | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [outs, setNbOuts] = useState<number>(0);
  const [strikes, setStrikes] = useState<number>(0);
  const [balls, setBalls] = useState<number>(0);
  const [inning, setInning] = useState<number>(1);
  const [runsAway, setRunsAway] = useState<number>(0);
  const [runsHome, setRunsHome] = useState<number>(0);
  const { lineUp } = useGame();

  const handleEvent = (gameEvent: GameEvent) => {
    setEvents([gameEvent.message]);
    setInning(gameEvent.inning);
    setNbOuts(gameEvent.outs);
    setStrikes(gameEvent.strikes);
    setBalls(gameEvent.balls);
    setRunsAway(gameEvent.runAway);
    setRunsHome(gameEvent.runHome);
  };

  const { isConnected } = useSignalR(HUB_URL, handleEvent);

  useEffect(() => {
    const fetchGame = async (gameId: number) => {
      const response = await getGame(gameId);
      setGame(response);
    };

    fetchGame(gameId);

    // start game
    const startGame = async () => {
      await playGame(gameId, lineUp!, true);
    };

    startGame();
  }, [gameId, lineUp]);

  return (
    <div className='play-by-play-container'>
      {game && (
        <>
          <div className='heading'>
            <h2>Play by play</h2>
            <p className='subtitle'></p>
          </div>
          <div className='play-by-play-wrapper'>
            <Scoreboard
              homeTeam={game.home!}
              awayTeam={game.away!}
              inning={inning}
              balls={balls}
              strikes={strikes}
              outs={outs}
              runsHome={runsHome}
              runsAway={runsAway}
            />
            <div className='actions'>
              {events.map((event, index) => (
                <p key={index}>{event}</p>
              ))}
            </div>
            <div className='away-line-up'></div>
            <div className='home-line-up'></div>
          </div>
        </>
      )}
    </div>
  );
}
