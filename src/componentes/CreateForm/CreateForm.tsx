"use client";

import { createSchema } from "@/app/schemas/create.schema";
import { create } from "@/services/auth.services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import "@/componentes/LoginForm/LoginForm.css";

export default function CreateForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const result = createSchema.safeParse({
      email,
      senha,
      confSenha,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      await create({ email, senha });
      toast.success("Usuário criado com sucesso");
      router.push("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao criar usuário");
    }
  }

  return (
    <div className="auth-wrap">
      <aside className="auth-hero">
        <img src="/livraria.svg" alt="Estante de livros do acervo" />
        <h2>Crie sua conta</h2>
        <p>Cadastre-se para acompanhar o catálogo e comprar seus livros.</p>
      </aside>

      <form onSubmit={handleSubmit} className="login-form">
        <h1>Criar Conta</h1>
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
            placeholder="Mínimo 4 caracteres"
          />
        </div>
        <div className="div-input">
          <label htmlFor="confSenha">Confirmar Senha</label>
          <input
            id="confSenha"
            type="password"
            value={confSenha}
            onChange={(e) => setConfSenha(e.target.value)}
            placeholder="Repita a senha"
          />
        </div>
        <button>Criar Conta</button>
        <Link href="/login">Já tem conta? Entrar</Link>
      </form>
    </div>
  );
}
