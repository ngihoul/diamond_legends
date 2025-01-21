'use client';

import { useAuth } from '@/lib/contexts/authContext';
import './NavBar.css';
import Link from 'next/link';
import { useGame } from '@/lib/contexts/gameContext';
import Image from 'next/image';

import ball from '@/public/img/ball_without_bg.png';

export default function NavBar() {
    const { userId } = useAuth();
    const { teamSelected } = useGame();

    return (
        // TODO : create navbar when not authenticated
        <>
            <nav className="nav-container">
                <div className="nav-wrapper wrapper">
                    <Image src={ball} alt="ball" width={31} height={40} />
                    {userId && (
                        <Link href={'/game/load'}>Sélectionne ton équipe !</Link>
                    )}

                    {!userId && (
                        <Link className="nav-text" href={'/auth/signup'}>Rejoins le Hall of Fame, inscris-toi !</Link>
                    )}

                    {teamSelected && (
                        <ul>
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">Roster</a></li>
                            <li><a href="#">League</a></li>
                            <li><a href="#">Stats</a></li>
                        </ul>
                    )}
                </div>
            </nav>
        </>
    );
}