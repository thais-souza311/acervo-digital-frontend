import LivroForm from "@/componentes/LivroForm/LivroForm";
import { getMe } from "@/services/auth.services";
import { getLivro } from "@/services/livro.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarLivroPage({ params }: Props) {
  const { id } = await params;

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

  const livro = await getLivro(id, cookieHeader);

  return <LivroForm livro={livro} />;
}

