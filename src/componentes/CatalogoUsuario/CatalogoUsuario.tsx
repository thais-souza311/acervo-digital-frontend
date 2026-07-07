"use client";

import "@/componentes/CatalogoUsuario/CatalogoUsuario.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Livro } from "@/tipos/livro";
import { comprarLivro } from "@/services/livro.services";
import LivroCard from "../LivroCard/LivroCard";
import { toast } from "sonner";

interface Props {
  disponiveis: Livro[];
  comprados: Livro[];
}

export default function CatalogoUsuario({ disponiveis, comprados }: Props) {
  const router = useRouter();
  const [aba, setAba] = useState<"disponiveis" | "comprados">("disponiveis");

  async function handleComprar(id: number) {
    try {
      await comprarLivro(id);
      toast.success("Livro comprado! Veja em 'Livros comprados'.");
      setAba("comprados");
      router.refresh();
    } catch {
      toast.error("Erro ao comprar livro");
    }
  }

  const lista = aba === "disponiveis" ? disponiveis : comprados;

  return (
    <div>
      <div className="abas">
        <button
          className={`aba ${aba === "disponiveis" ? "aba-ativa" : ""}`}
          onClick={() => setAba("disponiveis")}
        >
          Disponíveis <span className="aba-contador">{disponiveis.length}</span>
        </button>
        <button
          className={`aba ${aba === "comprados" ? "aba-ativa" : ""}`}
          onClick={() => setAba("comprados")}
        >
          Livros comprados <span className="aba-contador">{comprados.length}</span>
        </button>
      </div>

      {lista.length === 0 ? (
        <div className="catalogo-vazio">
          <p>
            {aba === "disponiveis"
              ? "Nenhum livro disponível no momento."
              : "Você ainda não comprou nenhum livro."}
          </p>
        </div>
      ) : (
        <div className="grid">
          {lista.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              perfil="USER"
              variante={aba === "comprados" ? "comprado" : "catalogo"}
              onComprar={handleComprar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
