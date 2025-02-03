import PlayByPlayDetails from '@/components/PlayByPlay/PlayByPlayDetails/PlayByPlayDetails';
import Loader from '@/components/UIUX/Loader/Loader';
import { Suspense } from 'react';

export default async function Preview({ params }: { params: Promise<{ id: number }> }) {
  const gameId = (await params).id;

  return (
    <Suspense fallback={<Loader />}>
      <PlayByPlayDetails gameId={gameId} />
    </Suspense>
  );
}
