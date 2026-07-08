import { LoginDTO, LoginResponse, User } from "@/tipos/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(dados: LoginDTO): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Usuário ou senha inválidos");
  }

  return response.json();
}

export async function create(dados: LoginDTO): Promise<void> {
  const response = await fetch(`${API_URL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const erro = await response.json().catch(() => null);
    throw new Error(erro?.message ?? "Erro ao criar usuário");
  }
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erro ao sair");
  }
}

export async function getMe(cookieHeader?: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth/me`, {
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

