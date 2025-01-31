'use client';

import { useAuth } from '@/lib/contexts/authContext';
import './NavBar.css';
import Link from 'next/link';
import { useGame } from '@/lib/contexts/gameContext';
import Image from 'next/image';

import ball from '@/public/img/ball_without_bg.png';
import { useEffect, useState } from 'react';
import { Team } from '@/lib/models/team.model';
import { getTeam } from '@/lib/services/team.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChartLine, faChartSimple, faForwardFast, faPeopleGroup, faPlay, faTrophy } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { nextDay, nextGame } from '@/lib/services/league.service';
import { useToaster } from '@/lib/contexts/toasterContext';

export default function NavBar() {
    const [team, setTeam] = useState<Team | null>(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    const { userId } = useAuth();
    const { teamSelected, inGameDate, changeInGameDate } = useGame();
    const { showToast } = useToaster();

    useEffect(() => {
        const fetchTeam = async () => {
            if(teamSelected === null) return;
            
            const response = await getTeam(teamSelected!);
            setTeam(response);
        };

        fetchTeam();
    }, [teamSelected]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.forward-dropdown') && !e.target.closest('.forward-dropdown *')) {
              setIsDropdownVisible(false);
            }
        };
      
        document.body.addEventListener('click', handleClickOutside);
      
        return () => {
          document.body.removeEventListener('click', handleClickOutside);
        };
    }, [setIsDropdownVisible]);

    const goNextDay = async (leagueId: number, teamId: number) => {
        try {
            const response = await nextDay(leagueId, teamId);
            changeInGameDate(new Date(response.inGameDate));
        } catch(e) {
            showToast((e as Error).message, 'error');
        }
    }

    const goNextGame = async (leagueId: number, teamId: number) => {
        try {
            const response = await nextGame(leagueId, teamId);
            changeInGameDate(new Date(response.inGameDate));
        } catch(e) {
            showToast((e as Error).message, 'error');
        }
    }

    return (
        // TODO : create navbar when not authenticated
        <>
            <nav className="nav-container">
                <div className="nav-wrapper wrapper">
                    <Image src={ball} alt="ball" width={31} height={40} />
                    {/* TODO : test on validity of token, not userId */}
                    {(userId && !teamSelected ) && (
                        <Link href={'/game/load'}>Sélectionne ton équipe !</Link>
                    )}

                    {(!userId && !teamSelected) && (
                        <Link className="nav-text" href={'/auth/signup'}>Rejoins le Hall of Fame, inscris-toi !</Link>
                    )}

                    {teamSelected && team && (
                            <>
                            <ul>
                                <li>
                                    <Link href={'/game/dashboard'}>
                                        <FontAwesomeIcon icon={faChartLine} />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/game/calendar`}>
                                        <FontAwesomeIcon icon={faCalendarDays} />
                                        Calendrier
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/game/roster/${teamSelected}`}>
                                        <FontAwesomeIcon icon={faPeopleGroup} />
                                        Equipe
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/game/league/${team.league.id}`}>
                                        <FontAwesomeIcon icon={faTrophy} />
                                        Ligue
                                    </Link>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faChartSimple} />
                                        Stats
                                    </a>
                                </li>
                            </ul>
                            <div className="in-game-date" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                                {moment(inGameDate).format('DD/MM/YYYY')} 
                                <FontAwesomeIcon className="next-day" icon={faForwardFast} />
                                { isDropdownVisible && 
                                    <div className="forward-dropdown">
                                        <div className='forward' onClick={() => goNextDay(team.league.id, teamSelected)}>
                                            Avancer d&apos;un jour <FontAwesomeIcon icon={faPlay} />
                                        </div>
                                        <div className="fast-forward" onClick={() => goNextGame(team.league.id, teamSelected)}>
                                            Avancer jusqu&apos;au prochain match <FontAwesomeIcon className="next-day" icon={faForwardFast} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}