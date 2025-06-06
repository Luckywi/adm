// src/app/realisations/Layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réalisations | ADM - Solutions Digitales sur Mesure",
  description: "Découvrez les projets web réalisés par ADM, des sites vitrines aux solutions de réservation en ligne.",
  keywords: "projets web, réalisations, sites internet, portfolio, développement web, Lyon",
  // Ajout de metadataBase pour résoudre l'avertissement
  metadataBase: new URL('https://adm-digital.fr'),
  openGraph: {
    title: "Réalisations | ADM - Solutions Digitales sur Mesure",
    description: "Découvrez les projets web réalisés par ADM, des sites vitrines aux solutions de réservation en ligne.",
    url: "https://adm-digital.fr/realisations",
    siteName: "ADM Digital",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "ADM - Solutions Digitales sur Mesure",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RealisationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}