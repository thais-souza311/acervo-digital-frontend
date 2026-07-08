import LivroForm from "@/componentes/LivroForm/LivroForm";
import { getMe } from "@/services/auth.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CriarLivroPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const user = await getMe(cookieHeader);

  if (user.perfil !== "ADMIN") {
    redirect("/home");
  }

  return <LivroForm />;
}

