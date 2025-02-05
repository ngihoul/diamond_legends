import { GamePitchingStats } from '@/lib/models/stats.model';
import { TeamViewCalendar } from '@/lib/models/team.model';

import './PitcherBoxes.css';

type PitchersBoxProps = {
  team: TeamViewCalendar;
  stats: GamePitchingStats[];
};

export default function PitchersBox({ team, stats }: PitchersBoxProps) {
  return (
    <div className='pitchers-score-box-wrapper'>
      <table className='pitchers-stats-table'>
        <thead>
          <tr>
            <th className='pitcher-name'>Pitchers - {team.abbreviation}</th>
            <th>IP</th>
            <th>H</th>
            <th>R</th>
            <th>ER</th>
            <th>BB</th>
            <th>K</th>
            <th>HR</th>
            <th className='era'>ERA</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.id}>
              <td className='pitcher-name'>
                {s.player.firstname.substring(0, 1)}. {s.player.lastname}
              </td>
              <td>{s.ip}</td>
              <td>{s.h}</td>
              <td>{s.r}</td>
              <td>{s.er}</td>
              <td>{s.bb}</td>
              <td>{s.so}</td>
              <td>{s.hr}</td>
              <td className='era'>{s.era}</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
