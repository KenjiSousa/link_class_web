"use client";

import React from "react";
import * as XLSX from "xlsx";

interface Evento {
  id: number;
  data: string;
  hora: string;
  titulo: string;
  duracao: string;
}

interface Participante {
  nome: string;
  email: string;
  curso: string;
  horarioCheckin: string;
}

const eventos: Evento[] = [
  {
    id: 1,
    data: "15/09/2025",
    hora: "19h10",
    titulo: "Palestra sobre Setembro Amarelo",
    duracao: "4h",
  },
  {
    id: 2,
    data: "10/10/2025",
    hora: "19h10",
    titulo: "Palestra sobre Empreendedorismo",
    duracao: "4h",
  },
  {
    id: 3,
    data: "21/10/2025",
    hora: "19h10",
    titulo: "Palestra sobre Inteligência Artificial",
    duracao: "4h",
  },
];

const gerarParticipantes = (eventoId: number): Participante[] => {
  return Array.from({ length: 15 }).map((_, index) => ({
    nome: `Aluno ${index + 1} do Evento ${eventoId}`,
    email: `aluno${index + 1}@edu.unipar.br`,
    curso: index % 2 === 0 ? "Engenharia de Software" : "Sistemas de Informação",
    horarioCheckin: "19:15:32",
  }));
};

export default function HistoricoPage() {
  
  const handleExportarExcel = (evento: Evento) => {
    const participantes = gerarParticipantes(evento.id);

    const worksheet = XLSX.utils.json_to_sheet(participantes);

    const wscols = [
      { wch: 30 }, // Nome
      { wch: 30 }, // Email
      { wch: 25 }, // Curso
      { wch: 15 }, // Checkin
    ];
    worksheet["!cols"] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Presença");

    const fileName = `Lista_Presenca_${evento.data.replace(/\//g, "-")}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center font-sans">
      <header className="w-full max-w-md bg-[#3a3b40] py-6 rounded-b-xl shadow-md flex justify-center items-center mb-6">
        <div className="w-12 h-12">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M25 25 V75 H55 Q85 75 85 50 T55 25 H25"
              stroke="var(--unired)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M40 40 V60 H55"
              stroke="var(--unired)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </header>

      <main className="w-full max-w-md px-6 pb-10">
        <h1 className="text-center text-xl font-bold text-black mb-8">
          Lista Editor
        </h1>

        <div className="space-y-6">
          {eventos.map((evento) => (
            <button
              key={evento.id}
              onClick={() => handleExportarExcel(evento)}
              className="w-full bg-[#e0e0e0] rounded-2xl p-5 shadow-sm flex flex-col items-center transition-transform active:scale-95 hover:bg-[#d6d6d6] cursor-pointer"
              title="Clique para baixar a lista de presença em Excel"
            >
              <div className="w-full flex justify-between text-sm font-bold text-black mb-2 px-6">
                <span>{evento.data}</span>
                <span>{evento.hora}</span>
              </div>

              <div className="flex flex-col items-center justify-center w-full mb-3 text-black">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span className="font-bold text-base leading-tight text-center max-w-[220px]">
                    {evento.titulo}
                  </span>
                </div>
              </div>

              <div className="bg-[var(--unired)] text-white text-sm font-bold px-10 py-1 rounded-full shadow-sm">
                {evento.duracao}
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}