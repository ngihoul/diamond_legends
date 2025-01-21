'use client';

import { useGame } from "@/lib/contexts/gameContext"

export default function Dashboard() {
    const { teamSelected } = useGame();
    return (
        <div>
            <p>Team selectionnée : { teamSelected }</p>
        </div>
    );
}