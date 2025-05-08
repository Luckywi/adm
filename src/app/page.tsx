'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

// Lazy‐load de votre composant 3D, sans SSR
const LogoScene = dynamic(() => import('../components/LogoScene'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <header>
        <div className="flex justify-center w-full pt-8">
          <Image
            src="/adm-logo.svg"
            alt="Logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <div>
          <h1 className="flex justify-center w-full text-4xl font-extrabold">
            Solutions digitales sur mesure.
          </h1>
        </div>
      </header>
      <main>
        <LogoScene />
      </main>
    </>
  )
}
