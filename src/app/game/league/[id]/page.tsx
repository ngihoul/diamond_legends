import { Suspense } from "react";
import LeagueDetails from "./LeagueDetails";

export default async function League({ params } : { params : { id: number}}) {
    const leagueId = (await params).id;

    return (
        <>
            {/* TODO : créer un composant Loading */}
            <Suspense fallback={<div>Chargement des informations...</div>}>
                <LeagueDetails leagueId={leagueId} />
            </Suspense>
        </>
    );
}