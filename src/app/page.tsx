import Image from "next/image";

export default function Home() {
  return (
    <main>
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
  <h1 className="flex justify-center w-full text-4xl font-extrabold">Solutions digitales sur mesure.</h1>
</div>
</main>
  );
}