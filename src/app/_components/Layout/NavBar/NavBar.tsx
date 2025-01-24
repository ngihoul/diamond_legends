'use client';

import { useAuth } from '@/lib/contexts/authContext';
import './NavBar.css';
import Link from 'next/link';
import { useGame } from '@/lib/contexts/gameContext';
import Image from 'next/image';

import ball from '@/public/img/ball_without_bg.png';
import { useEffect, useState } from 'react';
import { Team } from '@/lib/models/team.model';
import { getTeam } from '@/lib/services/team';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChartLine, faChartSimple, faPeopleGroup, faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    const [team, setTeam] = useState<Team | null>(null);

    const { userId } = useAuth();
    const { teamSelected } = useGame();

    useEffect(() => {
        const fetchTeam = async () => {
            if(teamSelected === null) return;
            
            const response = await getTeam(teamSelected!);
            setTeam(response);
        };

        fetchTeam();
    }, [teamSelected]);

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
                    )}
                </div>
            </nav>
        </>
    );
}