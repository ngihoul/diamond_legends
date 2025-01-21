'use client';

import { useGame } from "@/lib/contexts/gameContext"

export default function Dashboard() {
    const { teamSelected } = useGame();
    return (
        <div>
            <div className="heading-left">
                <h2>Dashboard</h2>
                <p className="subtitle">Un résumé de ton equipe</p>
            </div>
            <p>Team selectionnée : { teamSelected }</p>
        </div>
    );
}