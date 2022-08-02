import { useEffect } from "react";
import { MaquinaDeEscrever } from "../components/MaquinaDeEscrever";

export default function Home() {
  return (
    <div className="bg-[#080713] flex justify-center items-center h-screen w-full text-2xl">

      <h1 className="font-bold">
        <MaquinaDeEscrever text="Olá eu sou" esconderCursor />
      
        <span className="text-3xl">
          <MaquinaDeEscrever text="Marlliton Souza" delay={1300} esconderCursor />
        </span>
        
        <MaquinaDeEscrever text="Front-end Developer" delay={2800} />
      </h1>

    </div>
  );
}
