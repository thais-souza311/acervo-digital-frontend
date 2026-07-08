"use client";

import "@/componentes/LivroForm/LivroForm.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Livro, OpenLibraryLivro } from "@/tipos/livro";
import { createLivro, searchOpenLibrary, updateLivro } from "@/services/livro.services";
import { toast } from "sonner";

const PLACEHOLDER = "/livro-sem-capa.svg";

interface Props {
  livro?: Livro;
}

export default function LivroForm({ livro }: Props) {
  const router = useRouter();

  const [titulo, setTitulo] = useState(livro?.titulo ?? "");
  const [autor, setAutor] = useState(livro?.autor ?? "");
  const [descricao, setDescricao] = useState(livro?.descricao ?? "");
  const [imagem, setImagem] = useState(livro?.imagem ?? "");
  const [preco, setPreco] = useState(String(livro?.preco ?? ""));
  const [estado, setEstado] = useState(livro?.estado ?? "BOM");
  const [busca, setBusca] = useState("");
  const [sugestoes, setSugestoes] = useState<OpenLibraryLivro[]>([]);
  const [buscando, setBuscando] = useState(false);

  async function handleBuscar() {
    if (!busca.trim()) {
      return;
    }

    setBuscando(true);

    try {
      const resultado = await searchOpenLibrary(busca);
      setSugestoes(resultado);
      if (resultado.length === 0) {
        toast("Nenhum resultado encontrado");
      }
    } catch {
      toast.error("Erro ao buscar livros");
    } finally {
      setBuscando(false);
    }
  }

  function selecionarSugestao(sugestao: OpenLibraryLivro) {
    setTitulo(sugestao.titulo);
    setAutor(sugestao.autor);
    setDescricao(sugestao.descricao);
    setImagem(sugestao.imagem);
    setSugestoes([]);
    toast.success("Dados preenchidos. Revise e defina preço e estado.");
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const payload = {
      titulo,
      autor,
      descricao,
      imagem,
      preco: Number(preco),
      estado,
    };

    try {
      if (livro) {
        await updateLivro(livro.id, payload);
      } else {
        await createLivro(payload);
      }

      toast.success("Livro salvo");
      router.push("/home");
      router.refresh();
    } catch {
      toast.error("Erro ao salvar livro");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="livro-form">
      <h1>{livro ? "Editar Livro" : "Novo Livro"}</h1>

      {!livro && (
        <div className="busca-ol">
          <label htmlFor="busca-ol">Buscar na Open Library</label>
          <div className="busca-linha">
            <input
              id="busca-ol"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleBuscar();
                }
              }}
              placeholder="Ex.: Dom Casmurro"
            />
            <button type="button" onClick={handleBuscar} disabled={buscando}>
              {buscando ? "Buscando..." : "Buscar"}
            </button>
          </div>

          {sugestoes.length > 0 && (
            <div className="sugestoes-grid">
              {sugestoes.map((sugestao, index) => (
                <div className="sugestao-card" key={`${sugestao.titulo}-${index}`}>
                  <img
                    className="sugestao-capa"
                    src={sugestao.imagem || PLACEHOLDER}
                    alt={sugestao.titulo}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                  <div className="sugestao-info">
                    <span className="sugestao-titulo">{sugestao.titulo}</span>
                    <span className="sugestao-autor">
                      {sugestao.autor || "Autor desconhecido"}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="sugestao-usar"
                    onClick={() => selecionarSugestao(sugestao)}
                  >
                    Usar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="form-input">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título do livro"
        />
      </div>

      <div className="form-input">
        <label htmlFor="autor">Autor</label>
        <input
          id="autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Nome do autor"
        />
      </div>

      <div className="form-input">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Breve descrição do exemplar"
        />
      </div>

      <div className="form-input">
        <label htmlFor="imagem">URL da imagem</label>
        <input
          id="imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          placeholder="https://... (opcional)"
        />
      </div>

      <div className="form-input">
        <label htmlFor="preco">Preço (R$)</label>
        <input
          id="preco"
          type="number"
          step="0.01"
          min="0"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="0,00"
        />
      </div>

      <div className="form-input">
        <label htmlFor="estado">Estado de conservação</label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value as typeof estado)}
        >
          <option value="NOVO">NOVO</option>
          <option value="BOM">BOM</option>
          <option value="USADO">USADO</option>
          <option value="DANIFICADO">DANIFICADO</option>
        </select>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}
