import ball from '@/public/img/ball_without_bg.png';

import './Loader.css';
import Image from 'next/image';

export default function Loader() {
    return (
        <div className="overlay">
            <div className="spinner">
            <Image src={ball} alt="ball" width={100} height={120} />
            </div>
        </div>
    );
}