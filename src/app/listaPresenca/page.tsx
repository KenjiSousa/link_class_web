"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { http } from "@/api/http";
import * as XLSX from "xlsx";

export default function EventosPage() {
  const [listaPresenca, setListaPresenca] = useState([]);

  async function buscaListaPresenca() {
    const res = await http(`/presenca`);
    setListaPresenca(await res.json());
  }

  useEffect(() => {
    buscaListaPresenca();
  }, []);

  function exportarXlsx() {
    const preExport = listaPresenca.map((p: any) => {
      return {
        "ID do evento": p.evento.id,
        "Nome do Evento": p.evento.nome,
        "Data do evento": p.evento.data,
        "E-mail usuário": p.usuario.email,
        "RA": p.usuario.ra,
        "Data do registro de presença": p.dataHora,
      };
    });

    const aba = XLSX.utils.json_to_sheet(preExport);
    aba["!cols"] = [
      { wpx: 93 },
      { wpx: 116 },
      { wpx: 109 },
      { wpx: 181 },
      { wpx: 71 },
      { wpx: 196 },
    ]
    aba["!autofilter"] = { ref: "A:F" }
    const planilha = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(planilha, aba, "Lista de Presença");
    const d = new Date();
    XLSX.writeFile(
      planilha,
      `Lista_Presenca_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}.xlsx`,
    );
  }

  return (
    <main className="flex flex-col">
      <Navbar />

      <div className="p-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Lista de Presença</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer hover:active:bg-blue-700"
            onClick={exportarXlsx}
          >
            Exportar para Excel
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID do evento</th>
              <th className="p-2 border">Nome do evento</th>
              <th className="p-2 border">Data do evento</th>
              <th className="p-2 border">E-mail usuário</th>
              <th className="p-2 border">RA</th>
              <th className="p-2 border">Data do registro de presença</th>
            </tr>
          </thead>
          <tbody>
            {listaPresenca.map((p: any) => (
              <tr key={p.id}>
                <td className="p-2 border text-center">{p.evento.id}</td>
                <td className="p-2 border">{p.evento.nome}</td>
                <td className="p-2 border text-center">{
                  new Date(p.evento.data).toLocaleDateString("pt-BR")
                }</td>
                <td className="p-2 border">{p.usuario.email}</td>
                <td className="p-2 border text-center">{p.usuario.ra}</td>
                <td className="p-2 border text-center">{
                  new Date(p.dataHora).toLocaleString("pt-BR")
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
