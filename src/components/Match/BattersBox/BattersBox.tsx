import { PositionType } from '@/lib/models/player.model';
import { GameOffensiveStats } from '@/lib/models/stats.model';

import './BattersBox.css';
import { TeamViewCalendar } from '@/lib/models/team.model';

type BattersBoxProps = {
  team: TeamViewCalendar;
  stats: GameOffensiveStats[];
};

export default function BattersBox({ team, stats }: BattersBoxProps) {
  return (
    <div className='batters-score-box-wrapper'>
      <table className='batters-stats-table'>
        <thead>
          <tr>
            <th className='batter-name'>Batters - {team.abbreviation}</th>
            <th>PA</th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>RBI</th>
            <th>BB</th>
            <th>K</th>
            <th className='avg'>AVG</th>
            <th className='ops'>OPS</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.id}>
              <td className='batter-name'>
                <span className='player-name'>
                  {s.player.firstname.substring(0, 1)}. {s.player.lastname}
                </span>{' '}
                <span className='player-position'>{PositionType[s.position]}</span>
              </td>
              <td>{s.pa}</td>
              <td>{s.ab}</td>
              <td>{s.r}</td>
              <td>{s.h}</td>
              <td>{s.rbi}</td>
              <td>{s.bb}</td>
              <td>{s.so}</td>
              <td className='avg'>{s.avg.toFixed(3)}</td>
              <td className='ops'>{s.ops.toFixed(3)}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
        <tfoot>
          <tr>
            <td className='batter-name'>Total</td>
            <td>{stats.map((s) => s.pa).reduce((sum, value) => sum + value)}</td>
            <td>{stats.map((s) => s.ab).reduce((sum, value) => sum + value)}</td>
            <td>{stats.map((s) => s.r).reduce((sum, value) => sum + value)}</td>
            <td>{stats.map((s) => s.h).reduce((sum, value) => sum + value)}</td>
            <td>{stats.map((s) => s.rbi).reduce((sum, value) => sum + value)}</td>
            <td>{stats.map((s) => s.bb).reduce((sum, value) => sum + value)}</td>
            <td>{stats.map((s) => s.so).reduce((sum, value) => sum + value)}</td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
      {/* TODO : create a OtherStats Component */}
      <div className='other-stats'>
        <div className='hr'>
          <span className='label'>HR: </span>{' '}
          {stats
            .filter((s) => s.hr > 0)
            .map((s, index, array) => (
              <span key={s.id} className='player-name'>
                {s.player.firstname.substring(0, 1)}. {s.player.lastname} {s.hr > 1 ? s.hr : ''}
                {index < array.length - 1 && ', '}
              </span>
            ))}
        </div>
        <div className='triple'>
          <span className='label'>3B: </span>{' '}
          {stats
            .filter((s) => s.triple > 0)
            .map((s, index, array) => (
              <span key={s.id} className='player-name'>
                {s.player.firstname.substring(0, 1)}. {s.player.lastname} {s.triple > 1 ? s.triple : ''}
                {index < array.length - 1 && ', '}
              </span>
            ))}
        </div>
        <div className='triple'>
          <span className='label'>2B: </span>{' '}
          {stats
            .filter((s) => s.double > 0)
            .map((s, index, array) => (
              <span key={s.id} className='player-name'>
                {s.player.firstname.substring(0, 1)}. {s.player.lastname} {s.double > 1 ? s.double : ''}
                {index < array.length - 1 && ', '}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
