import { Suspense } from "react";
import PlayerDetails from "./playerDetails";
import Loader from "@/app/_components/Loader/Loader";

export default async function PlayerProfile({ params }: { params: Promise<{ id: number }> }) {
  const playerId = (await params).id;

  return (
    <>
      {/* TODO : créer un composant Loading */}
      <Suspense fallback={<Loader />}>
        <PlayerDetails playerId={playerId} />
      </Suspense>
    </>
  );
}