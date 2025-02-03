'use client';

import { Game } from '@/lib/models/game.model';
import { Team } from '@/lib/models/team.model';
import { getGame, playGame } from '@/lib/services/game.service';
import { getTeam } from '@/lib/services/team.service';
import { useCallback, useEffect, useState } from 'react';
import { Player } from '@/lib/models/player.model';
import { useGame } from '@/lib/contexts/gameContext';
import { HittersTable } from '../HittersTable/HittersTable';

import './PreviewDetails.css';
import Alert from '@/components/UIUX/Alert/Alert';
import { LineUpDetail } from '@/lib/models/lineup.model';
import Button from '@/components/UIUX/Button/Button';
import PitcherChoice from '../PitcherChoice/PitcherChoice';
import { useToaster } from '@/lib/contexts/toasterContext';
import { useRouter } from 'next/navigation';

export default function PreviewDetails({ gameId }: { gameId: number }) {
  const [game, setGame] = useState<Game | null>(null);
  const { showToast } = useToaster();
  const router = useRouter();

  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);

  const [homeHitters, setHomeHitters] = useState<Player[] | null>(null);
  const [homePitchers, setHomePitchers] = useState<Player[] | null>(null);

  const [awayHitters, setAwayHitters] = useState<Player[] | null>(null);
  const [awayPitchers, setAwayPitchers] = useState<Player[] | null>(null);

  const [lineUp, setLineUp] = useState<LineUpDetail[]>([]);
  const [startingPitcher, setStartingPitcher] = useState<LineUpDetail | null>(null);

  const { teamSelected, saveLineUp } = useGame();

  useEffect(() => {
    const fetchTeam = async (teamId: number) => {
      const response = await getTeam(teamId);
      return response;
    };

    const fetchGameAndTeamsDetails = async (gameId: number) => {
      const response = await getGame(gameId);
      setGame(response);
      const home = await fetchTeam(response.home.id);
      setHomeTeam(home);
      const away = await fetchTeam(response.away.id);
      setAwayTeam(away);
    };

    fetchGameAndTeamsDetails(gameId);
  }, [gameId]);

  useEffect(() => {
    if (homeTeam) {
      setHomeHitters(getHitters(homeTeam));

      setHomePitchers(getStartingPitchers(homeTeam));
    }
  }, [homeTeam]);

  useEffect(() => {
    if (awayTeam) {
      setAwayHitters(getHitters(awayTeam));

      setAwayPitchers(getStartingPitchers(awayTeam));
    }
  }, [awayTeam]);

  const getHitters = (team: Team): Player[] => {
    return team.players.filter((p) => !p.positions.some((pos) => [1, 12, 13].includes(pos)));
  };
  const getStartingPitchers = (team: Team): Player[] => {
    return team!.players.filter((p) => p.positions.some((pos) => [1].includes(pos)));
  };
  const handleLineUpChange = useCallback((lineup: LineUpDetail[]) => {
    setLineUp(lineup);
  }, []);

  const startGame = async (gameId: number, playByPlay: boolean = false) => {
    if (!startingPitcher) {
      showToast('Choisissez un lanceur partant', 'error');
      return;
    }

    if (lineUp.length < 9) {
      showToast('Choisissez 9 joueurs', 'error');
      return;
    }

    const fullLineUp = { lineUpDetails: [...lineUp, startingPitcher] };

    try {
      if (!playByPlay) {
        await playGame(gameId, fullLineUp, playByPlay);
        // TODO : Redirect to match details
        router.push('/game/calendar');
      } else {
        saveLineUp(fullLineUp);
        router.push(`/game/play-by-play/${gameId}`);
      }
    } catch (error) {
      showToast((error as Error).message, 'error');
    }
  };

  return (
    <div className='preview-container'>
      {game && (
        <>
          <div className='heading'>
            <h2>Avant-match</h2>
            <p className='subtitle'>
              {game?.away.name} vs {game?.home.name}
            </p>
          </div>
          <div className='alert-container'>
            <Alert type='info'>Déplacez les joueurs dans l'ordre souhaité. Ensuite, choisissez leur position.</Alert>
          </div>
          <div className='teams-container'>
            <div className='away-team team'>
              {awayTeam && awayHitters && awayPitchers && awayHitters.length > 0 && (
                <>
                  <h3>{awayTeam?.name}</h3>
                  <PitcherChoice
                    pitchers={awayPitchers}
                    isSelectedTeam={awayTeam.id == teamSelected}
                    onPitcherChange={awayTeam.id == teamSelected ? (pitcher) => setStartingPitcher(pitcher) : undefined}
                  />
                  <HittersTable
                    players={awayHitters}
                    isSelectedTeam={awayTeam.id == teamSelected}
                    onLineUpChange={awayTeam.id == teamSelected ? handleLineUpChange : undefined}
                  />
                </>
              )}
            </div>
            <div className='home-team team'>
              {homeTeam && homeHitters && homePitchers && homeHitters.length > 0 && (
                <>
                  <h3>{homeTeam?.name}</h3>
                  <PitcherChoice
                    pitchers={homePitchers}
                    isSelectedTeam={homeTeam.id == teamSelected}
                    onPitcherChange={homeTeam.id == teamSelected ? (pitcher) => setStartingPitcher(pitcher) : undefined}
                  />

                  <HittersTable
                    players={homeHitters}
                    isSelectedTeam={homeTeam.id == teamSelected}
                    onLineUpChange={homeTeam.id == teamSelected ? handleLineUpChange : undefined}
                  />
                </>
              )}
            </div>
          </div>
          <div className='start-game'>
            <Button
              action={() => {
                startGame(game.id);
              }}
              className='btn'>
              Simuler le match
            </Button>
            <Button
              action={() => {
                startGame(game.id, true);
              }}
              className='btn'>
              Voir le match
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
