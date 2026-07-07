export interface LoginDTO {
  email: string;
  senha: string;
}

export interface User {
  id: number;
  email: string;
  perfil: "ADMIN" | "USER";
}

export interface LoginResponse {
  success: boolean;
  user: User;
}

