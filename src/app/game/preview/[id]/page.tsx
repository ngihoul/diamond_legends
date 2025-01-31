import Loader from '@/app/_components/Loader/Loader';
import { Suspense } from 'react';
import PreviewDetails from './PreviewDetails/PreviewDetails';

export default async function Preview({ params }: { params: Promise<{ id: number }> }) {
  const gameId = (await params).id;

  return (
    <Suspense fallback={<Loader />}>
      <PreviewDetails gameId={gameId} />
    </Suspense>
  );
}
