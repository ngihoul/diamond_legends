'use client';

import { ToasterProvider } from "@/lib/contexts/toasterContext";
import { GameProvider } from "@/lib/contexts/gameContext";
import { AuthProvider } from "@/lib/contexts/authContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToasterProvider>
      <GameProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </GameProvider>
    </ToasterProvider>
  );
}