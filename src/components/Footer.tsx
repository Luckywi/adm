'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 px-4 py-6">
      <Image
        src="/adm.png"
        alt="Logo ADM"
        width={64}
        height={64}
        className="w-16 h-16 object-contain"
        priority
      />

      <div className="flex flex-col items-center gap-2 text-[#222222] text-sm font-medium sm:flex-row sm:gap-6">
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <Link href="/mentions-legales" className="hover:underline text-center">
          Mentions légales
        </Link>
        <Link href="/politique-confidentialite" className="hover:underline text-center">
          Politique de confidentialité
        </Link>
      </div>
    </footer>
  );
}
