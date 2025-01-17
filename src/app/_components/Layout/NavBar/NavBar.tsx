'use client';

import { useAuth } from '@/lib/contexts/authContext';
import './NavBar.css';

export default function NavBar() {
    const { userId } = useAuth();
    return (
        // TODO : create navbar when not authenticated
        <>
            {userId && (
                <nav className="nav-container">
                <div className="nav-wrapper wrapper">
                    <ul>
                        <li><a href="#">Roster</a></li>
                        <li><a href="#">League</a></li>
                        <li><a href="#">Stats</a></li>
                    </ul>
                </div>
            </nav>
            )}
        </>
    );
}