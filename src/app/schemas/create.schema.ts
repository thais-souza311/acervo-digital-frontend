import { z } from "zod";

export const createSchema = z.object({
  email: z.email("Email inválido"),
  senha: z.string().min(4, "Senha precisa ter no mínimo 4 caracteres"),
  confSenha: z.string(),
}).refine((d) => d.senha === d.confSenha, {
  message: "As senhas não coincidem",
  path: ["confSenha"],
});

