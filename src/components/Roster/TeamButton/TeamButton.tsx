'use client';

import { useGame } from "@/lib/contexts/gameContext";
import { Team } from "@/lib/models/team.model";
import Link from "next/link";

type TeamButtonProps = {
    team: Team
};

export default function TeamButton({team} : TeamButtonProps) {

    const { teamSelected } = useGame();

    return (
        <Link className="link" href={`/game/roster/${team.id}`}>
            { team.id == teamSelected ? <b>{team.name}</b> : team.name} ({ team.abbreviation })
        </Link>
    );
}