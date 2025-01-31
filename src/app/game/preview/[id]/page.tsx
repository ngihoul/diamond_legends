import { Suspense } from 'react';
import PreviewDetails from '@/components/PreviewDetails/PreviewDetails';
import Loader from '@/components/Loader/Loader';

export default async function Preview({ params }: { params: Promise<{ id: number }> }) {
  const gameId = (await params).id;

  return (
    <Suspense fallback={<Loader />}>
      <PreviewDetails gameId={gameId} />
    </Suspense>
  );
}
