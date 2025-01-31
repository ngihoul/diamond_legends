import { Suspense } from 'react';
import Loader from '@/components/UIUX/Loader/Loader';
import PreviewDetails from '@/components/Preview/PreviewDetails/PreviewDetails';

export default async function Preview({ params }: { params: Promise<{ id: number }> }) {
  const gameId = (await params).id;

  return (
    <Suspense fallback={<Loader />}>
      <PreviewDetails gameId={gameId} />
    </Suspense>
  );
}
