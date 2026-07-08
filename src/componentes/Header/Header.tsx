import "@/componentes/Header/Header.css";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../LogoutButton/LogoutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/home" className="header-brand">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5.5C10.3 4.3 7.9 4 5.5 4.4v13C7.9 17 10.3 17.3 12 18.5m0-13c1.7-1.2 4.1-1.5 6.5-1.1v13c-2.4-.4-4.8-.1-6.5 1.1m0-13v13"
                  stroke="#e7c477"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Acervo Digital
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <ul>
          {!token && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/create">Criar Conta</Link>
              </li>
            </>
          )}
          {token && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

