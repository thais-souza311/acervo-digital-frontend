export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  descricao: string;
  imagem: string;
  preco: number;
  estado: "NOVO" | "BOM" | "USADO" | "DANIFICADO";
  status: "DISPONIVEL" | "INDISPONIVEL";
}

export interface CreateLivroDTO {
  titulo: string;
  autor: string;
  descricao: string;
  imagem: string;
  preco: number;
  estado: "NOVO" | "BOM" | "USADO" | "DANIFICADO";
}

export interface UpdateLivroDTO {
  titulo?: string;
  autor?: string;
  descricao?: string;
  imagem?: string;
  preco?: number;
  estado?: "NOVO" | "BOM" | "USADO" | "DANIFICADO";
  status?: "DISPONIVEL" | "INDISPONIVEL";
}

export interface OpenLibraryLivro {
  titulo: string;
  autor: string;
  descricao: string;
  imagem: string;
}

export interface Compra {
  id: number;
  precoPago: number;
  livro: Livro;
}

