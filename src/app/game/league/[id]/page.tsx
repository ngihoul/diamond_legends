import { Suspense } from "react";
import LeagueDetails from "./LeagueDetails";
import Loader from "@/app/_components/Loader/Loader";

export default async function League({ params } : { params : { id: number}}) {
    const leagueId = (await params).id;

    return (
        <>
            {/* TODO : créer un composant Loading */}
            <Suspense fallback={<Loader />}>
                <LeagueDetails leagueId={leagueId} />
            </Suspense>
        </>
    );
}