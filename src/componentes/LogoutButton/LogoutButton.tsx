"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/services/auth.services";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logout realizado");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Erro ao sair");
    }
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

