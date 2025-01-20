import { ReactNode } from "react";

export interface GameContextType {
    teamSelected: number | null;
    changeTeam: (teamId: number) => void;
}

export interface GameProviderProps {
    children: ReactNode;
}