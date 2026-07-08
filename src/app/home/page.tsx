import LivrosGrid from "@/componentes/LivrosGrid/LivrosGrid";
import CatalogoUsuario from "@/componentes/CatalogoUsuario/CatalogoUsuario";
import { getMe } from "@/services/auth.services";
import { getCompras, getLivros } from "@/services/livro.services";
import { Livro } from "@/tipos/livro";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const user = await getMe(cookieHeader);
  const livros = await getLivros(cookieHeader);

  const isAdmin = user.perfil === "ADMIN";
  const comprados: Livro[] = isAdmin
    ? []
    : (await getCompras(cookieHeader)).map((compra): Livro => ({
        id: compra.id,
        titulo: compra.titulo,
        autor: compra.autor,
        descricao: "",
        imagem: compra.imagem,
        preco: compra.precoPago,
        estado: compra.estado,
        status: "INDISPONIVEL",
      }));

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Acervo Digital</h1>
          <p>
            {isAdmin
              ? "Gerencie o acervo: cadastre, edite e controle a disponibilidade dos livros."
              : "Cada exemplar é único — quando alguém leva, ele sai da prateleira."}
          </p>
        </div>

        {isAdmin && (
          <Link href="/livros/criar" className={styles.btnAdd}>
            + Adicionar livro
          </Link>
        )}
      </section>

      {isAdmin ? (
        livros.length === 0 ? (
          <div className={styles.vazio}>
            <p>Nenhum livro cadastrado ainda.</p>
          </div>
        ) : (
          <LivrosGrid livros={livros} perfil="ADMIN" />
        )
      ) : (
        <CatalogoUsuario
          disponiveis={livros.filter((livro) => livro.status === "DISPONIVEL")}
          comprados={comprados}
        />
      )}
    </main>
  );
}
