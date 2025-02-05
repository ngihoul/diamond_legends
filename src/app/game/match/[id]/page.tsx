import MatchDetails from '@/components/Match/MatchDetails/MatchDetails';
import Loader from '@/components/UIUX/Loader/Loader';
import { Suspense } from 'react';

export default async function Match({ params }: { params: Promise<{ id: number }> }) {
  const gameId = (await params).id;

  return (
    <Suspense fallback={<Loader />}>
      <MatchDetails gameId={gameId} />
    </Suspense>
  );
}
