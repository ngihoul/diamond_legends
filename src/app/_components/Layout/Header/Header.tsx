'use client';

import { useAuth } from '@/lib/contexts/authContext';
import './Header.css';
import Link from 'next/link';

export default function Header() {
    const { userId } = useAuth();

    return (
        <header className="header-container">
            <div className="header-wrapper wrapper">
                <h1>
                    <Link href={`/`}>Diamond Legends</Link>
                </h1>
                <div className="auth-container">
                    {!userId && (
                        <>
                            <Link href={'/auth/signin'}>Se connecter</Link>
                            <Link href={'/auth/signup'}>S&apos;inscrire</Link>
                        </>
                    )}
                    {userId && (
                        <>
                            <Link href={'/profile'}>Profile</Link>
                            <Link href={'/auth/signout'}>Se deconnecter</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}