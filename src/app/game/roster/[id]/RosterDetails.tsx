'use client';

import { HandedType, Player, PositionType } from '@/lib/models/player.model';
import { Team } from '@/lib/models/team.model';
import { getTeam } from '@/lib/services/team.service';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '@/components/UIUX/Loader/Loader';

import './page.css';
import EnergyBar from '@/components/Roster/EnergyBar/EnergyBar';

export default function RosterDetails({ teamId }: { teamId: number }) {
  const [team, setTeam] = useState({} as Team);

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await getTeam(teamId);
      // QUESTION : Pourquoi useEffect s'exécute 2 fois ?
      console.log('Roster page - useEffect : excuté');
      setTeam(response);
    };

    fetchTeam();
  }, [teamId]);

  return (
    <div className='roster-container'>
      <div className='heading-left'>
        <h2>
          {team.name} {team.city} - Roster
        </h2>
      </div>
      {team.players && team.players.length > 0 ? (
        <table className='roster-table'>
          <thead>
            <tr>
              <th>Nom</th>
              <th>T/B</th>
              <th>Energie</th>
              <th>Positions</th>
              <th>AVG</th>
            </tr>
          </thead>
          <tbody>
            {team.players.map((player: Player) => {
              return (
                <tr key={player.id}>
                  <td>
                    <Link href={`/game/roster/player/${player.id}`}>
                      {player.firstname} {player.lastname}
                      <Image
                        src={`/img/flags/${player.nationality.alpha2}.png`}
                        alt={player.nationality.alpha2}
                        width={30}
                        height={20}
                      />
                    </Link>
                  </td>
                  <td>{`${HandedType[player.throw]} / ${HandedType[player.bat]}`}</td>
                  <td className='energy'>
                    <EnergyBar energy={player.energy} />
                  </td>
                  <td>{player.positions.map((pos: number) => PositionType[pos]).join(', ')}</td>
                  <td>{player.avg > 0 ? player.avg.toFixed(3) : '0.000'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}
    </div>
  );
}
