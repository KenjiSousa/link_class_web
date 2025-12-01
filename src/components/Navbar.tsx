"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="w-full bg-gray-100 border-b border-gray-200 px-6 py-3 flex items-center justify-between font-sans">
      <div className="flex items-center gap-4">
        <Link href="/inicio" className="flex flex-col items-center gap-2">
          <Image
            src="/logoUnipar.svg"
            alt="Logo Unipar"
            width="0"
            height="0"
            style={{ width: "100%", height: "auto" }}
          />
          <span className="text-[13px] font-bold text-black uppercase leading-tight">
            Coordenador
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-5 text-gray-500 text-sm font-medium">
        <Link href="/palestrantes" className="hover:text-(--unired) border border-transparent hover:border-(--unired) p-2 rounded-md transition-colors">
          Palestrantes
        </Link>
        <Link href="/eventos" className="hover:text-(--unired) border border-transparent hover:border-(--unired) p-2 rounded-md transition-colors">
          Eventos
        </Link>
        <Link href="/listaPresenca" className="hover:text-(--unired) border border-transparent hover:border-(--unired) p-2 rounded-md transition-colors">
          Lista de Presença
        </Link>
      </nav>

      <div>
        <button
          onClick={handleLogout}
          className="text-black hover:text-[#e20613] transition-colors p-2"
          aria-label="Sair"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
}