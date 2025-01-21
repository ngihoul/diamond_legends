import { ReactNode } from "react";

export interface GameContextType {
    teamSelected: number | null;
    changeTeam: (teamId: number | null) => void;
}

export interface GameProviderProps {
    children: ReactNode;
}