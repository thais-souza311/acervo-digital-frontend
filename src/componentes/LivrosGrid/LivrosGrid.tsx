"use client";

import "@/componentes/LivrosGrid/LivrosGrid.css";
import { useRouter } from "next/navigation";
import { Livro } from "@/tipos/livro";
import { comprarLivro, deleteLivro, updateLivro } from "@/services/livro.services";
import LivroCard from "../LivroCard/LivroCard";
import { toast } from "sonner";

interface Props {
  livros: Livro[];
  perfil: "ADMIN" | "USER";
}

export default function LivrosGrid({ livros, perfil }: Props) {
  const router = useRouter();

  async function handleDelete(id: number) {
    try {
      await deleteLivro(id);
      toast.success("Livro excluído");
      router.refresh();
    } catch {
      toast.error("Erro ao excluir livro");
    }
  }

  async function handleComprar(id: number) {
    try {
      await comprarLivro(id);
      toast.success("Livro comprado");
      router.refresh();
    } catch {
      toast.error("Erro ao comprar livro");
    }
  }

  async function handleStatus(livro: Livro) {
    const status = livro.status === "DISPONIVEL"
      ? "INDISPONIVEL"
      : "DISPONIVEL";

    try {
      await updateLivro(livro.id, { status });
      toast.success("Status atualizado");
      router.refresh();
    } catch {
      toast.error("Erro ao atualizar status");
    }
  }

  const livrosMap = livros.map((livro) => (
    <LivroCard
      key={livro.id}
      livro={livro}
      perfil={perfil}
      onDelete={handleDelete}
      onComprar={handleComprar}
      onStatus={handleStatus}
    />
  ));

  return (
    <div className="grid">
      {livrosMap}
    </div>
  );
}

