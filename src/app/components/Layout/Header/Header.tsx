'use client';

import { useRouter } from 'next/navigation';
import Button from '../../Button/Button';
import './Header.css';

export default function Header() {
    const router = useRouter();

    const navToHome = () => router.push('/');
    const navToSignIn = () => router.push('/auth/signin');
    const navToSignUp = () => router.push('/auth/signup');

    return (
        <header className="header-container">
            <div className="header-wrapper wrapper">
                <h1 onClick={navToHome}>Diamond Legends</h1>
                <div className="auth-container">
                    <Button className="btn signin-btn" action={navToSignIn}>Se connecter</Button>
                    <Button className='btn signup-btn' action={navToSignUp}>S&apos;inscrire</Button>
                </div>
            </div>
        </header>
    )
}