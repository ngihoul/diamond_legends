// 'use client';

import './Header.css';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="header-container">
            <div className="header-wrapper wrapper">
                <h1>
                    <Link href={`/`}>Diamond Legends</Link>
                </h1>
                <div className="auth-container">
                    <Link href={`/auth/signin`}>Se connecter</Link>
                    <Link href={`/auth/signup`}>S&apos;inscrire</Link>
                </div>
            </div>
        </header>
    )
}