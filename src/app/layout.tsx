// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClickSpark from '../ReactBits/ClickSpark'; // Importez le composant ClickSpark

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADM - Solutions Digitales sur Mesure",
  description: "Développeur web freelance proposant des solutions digitales personnalisées pour votre entreprise.",
  // Ajout de metadataBase pour résoudre l'avertissement
  metadataBase: new URL('https://adm-digital.fr'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClickSpark 
          sparkColor="#FFB5CA" 
          sparkRadius={25}
          sparkSize={10}
          sparkCount={16}
          extraScale={1.2}
        >
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}