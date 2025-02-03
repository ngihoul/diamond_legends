import { TeamViewCalendar } from '@/lib/models/team.model';

import './Scoreboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

type ScoreboardProps = {
  homeTeam: TeamViewCalendar;
  awayTeam: TeamViewCalendar;
  inning: number;
  balls: number;
  strikes: number;
  outs: number;
  runsHome: number;
  runsAway: number;
};

export default function Scoreboard({
  homeTeam,
  awayTeam,
  inning,
  balls,
  strikes,
  outs,
  runsHome,
  runsAway,
}: ScoreboardProps) {
  return (
    <div className='scoreboard'>
      <div className='up'>
        <div className='guests'>
          <div className='name'>{awayTeam.name}</div>
          <div className='score'>{runsAway ?? 0}</div>
        </div>
        <div className='inning'>
          <div className='name'>Inning</div>
          <div className='score'>{Math.floor((inning ?? 1) + 1 / 2)}</div>
        </div>
        <div className='home'>
          <div className='name'>{homeTeam.name}</div>
          <div className='score'>{runsHome ?? 0}</div>
        </div>
      </div>
      <div className='down'>
        <div className='ball'>
          <div className='name'>Ball</div>
          <div className='score'>
            {balls == 0 ? (
              <></>
            ) : balls == 1 ? (
              <>
                <FontAwesomeIcon icon={faCircle} />
              </>
            ) : balls == 2 ? (
              <>
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
              </>
            ) : balls == 3 ? (
              <>
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
              </>
            )}
          </div>
        </div>
        <div className='strike'>
          <div className='name'>Strike</div>
          <div className='score'>
            {balls == 0 ? (
              <></>
            ) : strikes == 1 ? (
              <>
                <FontAwesomeIcon icon={faCircle} />
              </>
            ) : strikes == 2 ? (
              <>
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
              </>
            )}
          </div>
        </div>
        <div className='out'>
          <div className='name'>Out</div>
          <div className='score'>
            {outs == 0 ? (
              <></>
            ) : outs == 1 ? (
              <>
                <FontAwesomeIcon icon={faCircle} />
              </>
            ) : outs == 2 ? (
              <>
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faCircle} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
