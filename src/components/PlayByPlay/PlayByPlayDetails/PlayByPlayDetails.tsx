'use client';

import { Game, GameEvent, GameWithResults } from '@/lib/models/game.model';
import { getGame } from '@/lib/services/game.service';
import { useEffect, useRef, useState } from 'react';
import { HUB_URL } from '../../../../config';
import useSignalR from '@/lib/hooks/useSignaR';
import { useGame } from '@/lib/contexts/gameContext';
import Scoreboard from '../Scoreboard/Scoreboard';

import './PlayByPlayDetails.css';
import field from '@/public/img/field.png';
import Image from 'next/image';
import { GameOffensiveStats } from '@/lib/models/stats.model';
import { useRouter } from 'next/navigation';

export default function PlayByPlayDetails({ gameId }: { gameId: string }) {
  const [game, setGame] = useState<Game | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [outs, setNbOuts] = useState<number>(0);
  const [strikes, setStrikes] = useState<number>(0);
  const [balls, setBalls] = useState<number>(0);
  const [inning, setInning] = useState<number>(1);
  const [runsAway, setRunsAway] = useState<number>(0);
  const [runsHome, setRunsHome] = useState<number>(0);
  const [bases, setBases] = useState<GameOffensiveStats[]>([]);

  const { lineUp } = useGame();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current.scrollHeight);
  };

  const handleEvent = (gameEvent: GameEvent) => {
    console.log(gameEvent);
    setEvents((prevMessage) => [...prevMessage, gameEvent.message]);
    setInning(gameEvent.halfInnings);
    setNbOuts(gameEvent.outs);
    setStrikes(gameEvent.strikes);
    setBalls(gameEvent.balls);
    setRunsAway(gameEvent.runsAway);
    setRunsHome(gameEvent.runsHome);
    setBases(gameEvent.bases);
  };

  const endHandler = (game: GameWithResults) => {
    router.push(`/game/match/${game.id}`);
  };

  const { isConnected, simulateGame } = useSignalR(HUB_URL, handleEvent, endHandler);

  useEffect(() => {
    const fetchGame = async (gameId: number) => {
      const response = await getGame(gameId);
      setGame(response);
    };

    fetchGame(parseInt(gameId));

    console.log(isConnected);
    // start game
    if (isConnected) {
      const id = parseInt(gameId);
      simulateGame(id, lineUp!);
    }
  }, [gameId, lineUp, isConnected]);

  useEffect(() => {
    scrollToBottom();
  }, [events]);

  return (
    <div className='play-by-play-container'>
      {game && (
        <>
          <div className='heading'>
            <h2>Play by play</h2>
            <p className='subtitle'></p>
          </div>
          <div className='play-by-play-wrapper'>
            <div className='upper'>
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
              <div className='field'>
                <Image src={field} alt='field' width={140} height={140} />
                {bases[0] && (
                  <p className='first-base'>
                    {`${bases[0].player.firstname.substring(0, 1)}. ${bases[0].player.lastname}`}
                  </p>
                )}
                {bases[1] && (
                  <p className='second-base'>
                    {`${bases[1].player.firstname.substring(0, 1)}. ${bases[1].player.lastname}`}
                  </p>
                )}
                {bases[2] && (
                  <p className='third-base'>
                    {`${bases[2].player.firstname.substring(0, 1)}. ${bases[2].player.lastname}`}
                  </p>
                )}
              </div>
            </div>

            <div className='actions-wrapper'>
              <h3>Jeux en direct</h3>
              <div ref={messagesEndRef} className='actions'>
                {events.map((event, index) => (
                  <p key={index}>{event}</p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
