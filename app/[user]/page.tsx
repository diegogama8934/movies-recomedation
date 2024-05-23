"use client"


export default function Page({ params }: { params: { user: String } }) {


  return (
    <div className="p-10">
      <h1 className="text-6xl">Hola <span className="capitalize">{params.user}</span>!</h1>

    </div>
  );
}