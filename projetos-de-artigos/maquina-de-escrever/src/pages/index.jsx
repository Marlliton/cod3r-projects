import { useEffect } from "react";
import { MaquinaDeEscrever } from "../components/MaquinaDeEscrever";

export default function Home() {

  return (
    <div className="bg-[#080713] flex justify-center items-center h-screen w-full text-2xl">
      <MaquinaDeEscrever text="Testando o componente, Máquina De Escrever" />
    </div>
  );
}
