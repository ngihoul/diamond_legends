import { Suspense } from "react";
import PlayerDetails from "./playerDetails";

export default async function PlayerProfile({ params }: { params: { id: number } }) {
  const playerId = (await params).id;

  return (
    <div className="player-profile-container">
      <Suspense fallback={<div>Chargement des informations...</div>}>
        <PlayerDetails playerId={playerId} />
      </Suspense>
    </div>
  );
}