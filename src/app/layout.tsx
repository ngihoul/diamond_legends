import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Layout/Header/Header";
import NavBar from "./_components/Layout/NavBar/NavBar";
import Toaster from "./_components/Toaster/Toaster";
import { AuthProvider } from "@/lib/contexts/authContext";
import { ToasterProvider } from "@/lib/contexts/toasterContext";
import { GameProvider } from "@/lib/contexts/gameContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diamond Legends",
  description: "Online Baseball Manager SImulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* TODO: import font as explained in docs */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Playwrite+IN:wght@100..400&display=swap" rel="stylesheet" />
      </head>
      
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ToasterProvider>
            <AuthProvider>
              <GameProvider>
                <Header />
                <NavBar />
                <main className="main">
                  <Toaster />
                  <div className="wrapper">
                    {children}
                  </div>
                </main>
              </GameProvider>
            </AuthProvider>
          </ToasterProvider>
        </body>
    </html>
  );
}
