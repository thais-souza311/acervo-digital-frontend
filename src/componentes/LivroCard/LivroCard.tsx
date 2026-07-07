"use client";

import "@/componentes/LivroCard/LivroCard.css";
import Link from "next/link";
import { useState } from "react";
import { Livro } from "@/tipos/livro";

const PLACEHOLDER = "/livro-sem-capa.svg";

interface LivroCardProps {
  livro: Livro;
  perfil: "ADMIN" | "USER";
  variante?: "catalogo" | "comprado";
  onDelete?: (id: number) => void;
  onComprar?: (id: number) => void;
  onStatus?: (livro: Livro) => void;
}

export default function LivroCard({
  livro,
  perfil,
  variante = "catalogo",
  onDelete,
  onComprar,
  onStatus,
}: LivroCardProps) {
  const [imgSrc, setImgSrc] = useState(livro.imagem || PLACEHOLDER);

  const comprado = variante === "comprado";

  return (
    <div className="card">
      <div className="card-capa">
        <img
          src={imgSrc}
          alt={livro.titulo}
          className="card-img"
          onError={() => setImgSrc(PLACEHOLDER)}
        />
        <span className={`tag-estado tag-${livro.estado.toLowerCase()}`}>
          {livro.estado}
        </span>
        {comprado && <span className="tag-comprado">✓ Comprado</span>}
        {!comprado && livro.status === "INDISPONIVEL" && (
          <span className="tag-indisponivel">Indisponível</span>
        )}
      </div>

      <div className="card-corpo">
        <h2>{livro.titulo}</h2>
        <p className="card-autor">{livro.autor}</p>
        <p className="card-preco">R$ {livro.preco.toFixed(2)}</p>

        <div className="btn-acoes">
          {perfil === "ADMIN" && variante === "catalogo" && (
            <>
              <Link className="btn btn-secundario" href={`/livros/${livro.id}/editar`}>
                Editar
              </Link>
              <button className="btn btn-secundario" onClick={() => onStatus?.(livro)}>
                {livro.status === "DISPONIVEL" ? "Tornar indisponível" : "Recolocar à venda"}
              </button>
              <button className="btn btn-delete" onClick={() => onDelete?.(livro.id)}>
                Excluir
              </button>
            </>
          )}

          {perfil === "USER" &&
            variante === "catalogo" &&
            livro.status === "DISPONIVEL" && (
              <button className="btn btn-comprar" onClick={() => onComprar?.(livro.id)}>
                Comprar
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
