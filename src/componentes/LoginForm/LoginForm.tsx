"use client";

import "@/componentes/LoginForm/LoginForm.css";
import { loginSchema } from "@/app/schemas/login.schema";
import { login } from "@/services/auth.services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, senha });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      await login({ email, senha });
      toast.success("Login realizado");
      router.push("/home");
      router.refresh();
    } catch {
      toast.error("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="auth-wrap">
      <aside className="auth-hero">
        <img src="/livraria.svg" alt="Estante de livros do acervo" />
        <h2>Bem-vindo ao Acervo Digital</h2>
        <p> Não perca a oportunidade de enriquecer sua leitura &mdash; adquira um livro agora mesmo!</p>
      </aside>

      <form onSubmit={handleSubmit} className="login-form">
        <h1>Entrar</h1>
        <div className="div-input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="você@email.com"
          />
        </div>
        <div className="div-input">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
          />
        </div>
        <button>Entrar</button>
        <Link href="/create">Não tem conta? Criar conta</Link>
      </form>
    </div>
  );
}
