import { getLeague } from '@/lib/services/league.service';
import TeamButton from '@/components/Roster/TeamButton/TeamButton';
import { League } from '@/lib/models/league.model';

export default async function LeaguePage({ params }: { params: Promise<{ id: number }> }) {
  const leagueId = (await params).id;

  const league: League = await getLeague(leagueId);

  return (
    <div className='league-container'>
      <div className='heading-left'>
        <h2>{league.name}</h2>
        <table className='league-table'>
          <thead>
            <tr>
              <th>Equipe</th>
              <th>W</th>
              <th>L</th>
              <th>%</th>
              <th>L10</th>
              <th>STRK</th>
            </tr>
          </thead>
          <tbody>
            {league.teams?.map((team) => (
              <tr key={team.id}>
                <td>
                  <TeamButton team={team} />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
