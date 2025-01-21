"use client";

import { useEffect, useState } from "react";
import { HandedType, Player, PositionType } from "@/lib/models/player.model";
import { getPlayer } from "@/lib/services/player";
import { useToaster } from "@/lib/contexts/toasterContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import moment from "moment";

export default function PlayerDetails({ playerId }: { playerId: number }) {
  const [player, setPlayer] = useState<Player | null>(null);

  const { showToast } = useToaster();
  const router = useRouter();

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const fetchedPlayer = await getPlayer(playerId);
        setPlayer(fetchedPlayer);
      } catch (error) {
        showToast((error as Error).message, 'error');
        router.push('/game/roster');
      }
    }

    fetchPlayer();
  }, [playerId]);

  if (!player) {
    return <div>Chargement des données du joueur...</div>;
  }

  return (
    <div className="player-profile-container">
        <div className="heading-left">
            <h2>
                {player.lastname} {player.firstname} 
                <Image src={`/img/flags/${player.nationality.alpha2}.png`} alt={player.nationality.alpha2} width={30} height={20} />
            </h2>
        </div>
        <div className="data">
            <ul>
                <li>Date de naissance : {moment(player.dateOfBirth).format('DD/MM/YYYY')}</li>
                <li>Lance : {HandedType[player.throw]}</li>
                <li>Frappe : {HandedType[player.bat]}</li>
                <li>Salaire : ${player.salary.toFixed(2)}</li>
            </ul>
        </div>
        <div className="in-game">
            <ul>
                <li>Position{ player.positions.length > 1 ? 's' : ''} : {player.positions.map((pos) => PositionType[pos]).join(', ')}</li>
                <li>Énergie : {player.energy} / 100</li>
            </ul>
        </div>
        <div className="batting-skills">
            <h3>Batting skills</h3>
            <ul>
                <li>Contact: {player.contact}</li>
                <li>Puissance: {player.power}</li>
                <li>Course: {player.running}</li>
            </ul>
        </div>
        <div className="defense-skills">
            <h3>Defense skills</h3>
            <ul>
                <li>Défence : {player.defense}</li>
                <li>Mental : {player.mental}</li>
                <li>Endurance : {player.stamina}</li>
            </ul>
        </div>
        <div className="pitching-skills">
            <h3>Pitching skills</h3>
            <ul>
                <li>Contrôle : {player.control}</li>
                <li>Vitesse : {player.velocity}</li>
                <li>Mouvement : {player.movement}</li>
            </ul>
        </div>
    </div>
  );
}
