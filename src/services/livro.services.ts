import { Compra, CreateLivroDTO, Livro, OpenLibraryLivro, UpdateLivroDTO } from "@/tipos/livro";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLivros(cookieHeader?: string): Promise<Livro[]> {
  const response = await fetch(`${API_URL}/livros`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader ?? "",
    },
  });

  if (!response.ok) {
    throw new Error("Nao autenticado");
  }

  return response.json();
}

export async function getLivro(id: string, cookieHeader?: string): Promise<Livro> {
  const response = await fetch(`${API_URL}/livros/${id}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader ?? "",
    },
  });

  if (!response.ok) {
    throw new Error("Nao autenticado");
  }

  return response.json();
}

export async function createLivro(livro: CreateLivroDTO): Promise<void> {
  const response = await fetch(`${API_URL}/livros`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livro),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar livro");
  }
}

export async function updateLivro(id: number, livro: UpdateLivroDTO): Promise<void> {
  const response = await fetch(`${API_URL}/livros/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livro),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar livro");
  }
}

export async function deleteLivro(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/livros/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir livro");
  }
}

export async function getCompras(cookieHeader?: string): Promise<Compra[]> {
  const response = await fetch(`${API_URL}/compras`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader ?? "",
    },
  });

  if (!response.ok) {
    throw new Error("Nao autenticado");
  }

  return response.json();
}

export async function comprarLivro(livroId: number): Promise<void> {
  const response = await fetch(`${API_URL}/compras`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ livroId }),
  });

  if (!response.ok) {
    throw new Error("Erro ao comprar livro");
  }
}

export async function searchOpenLibrary(q: string): Promise<OpenLibraryLivro[]> {
  const response = await fetch(`${API_URL}/open-library/search?q=${encodeURIComponent(q)}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar livros");
  }

  return response.json();
}

