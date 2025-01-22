import { Suspense } from "react";
import RosterDetails from "./RosterDetails";

export default async function PlayerProfile({ params }: { params: { id: number } }) {
  const teamId = (await params).id;

  return (
    <>
      {/* TODO : créer un composant Loading */}
      <Suspense fallback={<div>Chargement des informations...</div>}>
        <RosterDetails teamId={teamId} />
      </Suspense>
    </>
  );
}