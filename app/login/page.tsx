"use client"
import Link from "next/link";
import Image from "next/image";


export default function Page() {



  return (
    <div className="flex flex-col py-12 gap-24">
      <h1 className="text-7xl text-center tracking-wide font-bold">Elige tu perfil</h1>

      <div className="mx-64 flex gap-8 justify-center">
        <Link className="flex flex-col gap-4 hover:cursor-pointer hover:scale-105 transition-all" href="/diego">
          <Image
            src="/fotomia.jpg"
            width={1000}
            height={1000}
            alt="Imagen mía"
            className="aspect-square w-48 object-cover rounded-full bg-zinc-900"
          />
          <h2 className="text-2xl text-center">Diego</h2>
        </Link>
        <Link className="flex flex-col gap-4 hover:cursor-pointer hover:scale-105 transition-all" href="/rafael">
          <Image
            src="/user.png"
            width={1000}
            height={1000}
            alt="Imagen mía"
            className="aspect-square w-48 object-cover rounded-full bg-zinc-900 p-8"
          />
          <h2 className="text-2xl text-center">Rafael</h2>
        </Link>
        <Link className="flex flex-col gap-4 hover:cursor-pointer hover:scale-105 transition-all" href="/profe">
          <Image
            src="/user.png"
            width={1000}
            height={1000}
            alt="Imagen mía"
            className="aspect-square w-48 object-cover rounded-full bg-zinc-900 p-8"
          />
          <h2 className="text-2xl text-center">Profe</h2>
        </Link>
      </div>
    </div>
  );
}