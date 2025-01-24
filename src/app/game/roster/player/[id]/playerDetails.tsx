"use client";

import { useEffect, useState } from "react";
import { Player, PositionType, HandedType } from "@/lib/models/player.model";
import { getPlayer } from "@/lib/services/player";
import { useToaster } from "@/lib/contexts/toasterContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

import './page.css';
import Link from "next/link";
import Loader from "@/app/_components/Loader/Loader";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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
        showToast((error as Error).message, "error");
        router.push("/game/roster");
      }
    }
    fetchPlayer();
  }, [playerId]);

  const createRadarData = (skills: Record<string, number>, colors: string[]) => ({
    labels: Object.keys(skills),
    datasets: [
      {
        data: Object.values(skills),
        backgroundColor: colors[0],
        borderColor: colors[1],
        borderWidth: 1,
      },
    ],
  });

  const radarOptions = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        display: false
      },
    }
  };

  if (!player) {
    return <Loader />;
  }

  const battingSkills = createRadarData({
    Contact: player.contact,
    Power: player.power,
    Running: player.running,
  }, [ "rgba(182, 6, 42, 0.2)", "rgba(182, 6, 42, 1)"]);

  const defenseSkills = createRadarData({
    Defense: player.defense,
    Mental: player.mental,
    Stamina: player.stamina,
  }, ["rgba(3, 29, 113, 0.2)", "rgba(3, 29, 113, 1)"]);

  const pitchingSkills = createRadarData({
    Control: player.control,
    Velocity: player.velocity,
    Movement: player.movement,
  }, ["rgba(16, 81, 50, 0.2)", "rgba(16, 81, 50, 1)"]);

  const age = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // TODO : check les jours 

    return age;
  }

  return (
    <div className="player-profile-container">
      <div className="breadcrumb">
        <Link href={`/game/roster/${player.team.id}`}>← Retour vers le roster</Link>
      </div>
        <div className="heading-left">
            <h2>
                <Image
                    src={`/img/flags/${player.nationality.alpha2}.png`}
                    alt={player.nationality.alpha2}
                    width={30}
                    height={20}
                /> 
                {player.lastname} <span className="firstname">{player.firstname}</span>
            </h2>
        </div>
        <div className="data">
            <div className="section generic-data">
                <ul>
                    <li><span className="label">Date de naissance : </span> {moment(player.dateOfBirth).format("DD/MM/YYYY")} - {age(player.dateOfBirth)} ans</li>
                    <li><span className="label">Lance : </span> {HandedType[player.throw]}</li>
                    <li><span className="label">Frappe : </span> {HandedType[player.bat]}</li>
                    <li><span className="label">Salaire : </span> ${player.salary.toFixed(2)}</li>
                </ul>
            </div>
            <div className="section in-game">
                <ul>
                    <li><span className="label">Equipe :</span> <Link className="link" href={`/game/team/${player.team.id}`}>{player.team.name} ({player.team.abbreviation.toUpperCase()})</Link></li>
                    <li>
                        <span className="label">Position{player.positions.length > 1 ? "s" : ""} :</span> {player.positions.map((pos) => PositionType[pos]).join(", ")}
                    </li>
                    <li><span className="label">Energie : </span> {player.energy} / 100</li>
                </ul>
            </div>
        </div>
        <div className="skills">
            <div className="section skills-section batting-skills">
                <h3>Batting skills</h3>
                <ul>
                    <SkillItem label="Contact" skill={player.contact} />
                    <SkillItem label="Puissance" skill={player.power} />
                    <SkillItem label="Course" skill={player.running} />
                </ul>
                <div className="graph batting-skills-graph">
                    <Radar data={battingSkills} options={radarOptions}/>
                </div>
            </div>
            <div className="section skills-section defense-skills">
                <h3>Defense skills</h3>
                <ul>
                  <SkillItem label="Défense" skill={player.defense} />
                  <SkillItem label="Mental" skill={player.mental} />
                  <SkillItem label="Endurance" skill={player.stamina} />
                </ul>
                <div className="graph defense-skills-graph">
                    <Radar data={defenseSkills} options={radarOptions}/>
                </div>
            </div>
            <div className="section skills-section pitching-skills">
                <h3>Pitching skills</h3>
                <ul>
                  <SkillItem label="Contrôle" skill={player.control} />
                  <SkillItem label="Vitesse" skill={player.velocity} />
                  <SkillItem label="Mouvement" skill={player.movement} />
                </ul>
                <div className="graph pitching-skills-graph">
                    <Radar data={pitchingSkills} options={radarOptions}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export const SkillItem = ({ label, skill }: { label: string, skill: number }) => {
  const isHighOrLow = (skill: number): string => {
    return skill >= 80 ? "high" : skill <= 40 ? "low" : "";
  }

  return(
    <li className={ isHighOrLow(skill) }>
        <span className="label">{label} : </span> {skill}
    </li>
  );
}