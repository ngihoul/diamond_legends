'use client';

import { GameStatus, GameWithResults } from '@/lib/models/game.model';
import { PositionType } from '@/lib/models/player.model';
import { getGameWithResults } from '@/lib/services/game.service';
import { useEffect, useState } from 'react';

import './MatchDetails.css';
import BattersBox from '../BattersBox/BattersBox';
import moment from 'moment';
import PitchersBox from '../PitchersBox/PitchersBox';
import Link from 'next/link';

type MatchDetailsProps = {
  gameId: number;
};

export default function MatchDetails({ gameId }: MatchDetailsProps) {
  const [game, setGame] = useState<GameWithResults | null>(null);

  useEffect(() => {
    const fetchGameWithResults = async (gameId: number) => {
      const response = await getGameWithResults(gameId);
      setGame(response);
    };

    fetchGameWithResults(gameId);
  });

  return (
    <div className='match-details-container'>
      {game && (
        <>
          <div className='breadcrumb'>
            <Link href={`/game/calendar/`}>← Retour vers le calendrier</Link>
          </div>
          <div className='summary'>
            <div className='away-team'>
              <div className='name'>{game.away.name}</div>
              <div className='abbreviation'>({game.away.abbreviation})</div>
            </div>
            <div className='away-score'>{game.awayRuns == 0 ? '-' : game.awayRuns}</div>
            <div className='status'>
              {game.status == GameStatus.played ? 'FINAL' : moment(game.date).format('DD/MM/YYYY')}
            </div>
            <div className='home-score'>{game.homeRuns == 0 ? '-' : game.homeRuns}</div>
            <div className='home-team'>
              <div className='name'>{game.home.name}</div>
              <div className='abbreviation'>({game.home.abbreviation})</div>
            </div>
          </div>
          <div className='batters-boxes'>
            <div className='away-box'>
              <BattersBox
                team={game.away}
                stats={game.offensiveStats.filter((s) => s.player.team.name == game.away.name)}
              />
            </div>
            <div className='home-box'>
              <BattersBox
                team={game.home}
                stats={game.offensiveStats.filter((s) => s.player.team.name == game.home.name)}
              />
            </div>
          </div>
          <div className='pitchers-boxes'>
            <div className='away-box'>
              <PitchersBox
                team={game.away}
                stats={game.pitchingStats.filter((s) => s.player.team.name === game.away.name)}
              />
            </div>
            <div className='home-box'>
              <PitchersBox
                team={game.home}
                stats={game.pitchingStats.filter((s) => s.player.team.name === game.home.name)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
