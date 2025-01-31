import { Suspense } from 'react';
import RosterDetails from './RosterDetails';
import Loader from '@/components/UIUX/Loader/Loader';

export default async function PlayerProfile({ params }: { params: Promise<{ id: number }> }) {
  const teamId = (await params).id;

  return (
    <>
      {/* TODO : créer un composant Loading */}
      <Suspense fallback={<Loader />}>
        <RosterDetails teamId={teamId} />
      </Suspense>
    </>
  );
}
