import { Suspense } from 'react';
import PlayerDetails from '@/components/Roster/PlayerDetails/playerDetails';
import Loader from '@/components/UIUX/Loader/Loader';

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
