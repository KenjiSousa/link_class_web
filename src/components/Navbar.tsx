"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Adicione aqui a lógica de logout (limpar cookies, etc)
    // Exemplo: document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  return (
    <header className="w-full bg-gray-100 border-b border-gray-200 px-6 py-3 flex items-center justify-between font-sans">
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          {/* Simulação do Logo Vermelho */}
          <div className="text-[#e20613] w-10 h-10">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h4v10c0 1.1.9 2 2 2s2-.9 2-2V4h4v10c0 3.31-2.69 6-6 6s-6-2.69-6-6V4z" />
              <path d="M14 4h4v6h-4z" opacity="0.5"/> 
            </svg>
          </div>
          <span className="text-[10px] font-bold text-black uppercase leading-tight">
            Cordenador
          </span>
        </div>

        {/* Linha Divisória Vertical */}
        <div className="h-10 w-[1px] bg-gray-400 mx-2"></div>

        {/* Instituto UNIPAR */}
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold text-black">Instituto</span>
          <span className="text-xl font-bold text-black leading-none tracking-wide">
            UNIPAR
          </span>
        </div>
      </div>

      {/* Centro/Direita: Links de Navegação */}
      <nav className="hidden md:flex items-center gap-8 text-gray-500 text-sm font-medium">
        <Link href="#" className="hover:text-[#e20613] transition-colors">
          Criar Evento
        </Link>
        <Link href="#" className="hover:text-[#e20613] transition-colors">
          Editar
        </Link>
        <Link href="#" className="hover:text-[#e20613] transition-colors">
          Exibir QR Code
        </Link>
        <Link href="#" className="hover:text-[#e20613] transition-colors">
          Histórico
        </Link>
        <Link href="#" className="hover:text-[#e20613] transition-colors">
          Exportar Dados
        </Link>
      </nav>

      {/* Extrema Direita: Botão Sair */}
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