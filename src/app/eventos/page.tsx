"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import EventoModal from "./eventoModal";
import { http } from "@/api/http";
import QrModal from "./qrModal";

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalQr, setModalQr] = useState({
    idEvento: null,
    nomeEvento: "",
    aberto: false
  });
  const [idAtual, setIdAtual] = useState<number | null>(null);

  async function buscaEventos() {
    const res = await http(`/evento`);
    setEventos(await res.json());
  }

  useEffect(() => {
    buscaEventos();
  }, []);

  function cadastrar() {
    setIdAtual(null);
    setModalAberto(true);
  }

  function editar(id: number) {
    setIdAtual(id);
    setModalAberto(true);
  }

  async function excluir(id: number) {
    if (!confirm("Deseja mesmo excluir este evento?")) return;

    const res = await http(`/evento/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      buscaEventos();
    } else {
      alert(`Erro ao excluir: ${(await res.json()).message}`);
    }
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <main className="flex flex-col">
      <Navbar />

      <div className="p-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Eventos</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer hover:active:bg-blue-700"
            onClick={cadastrar}
          >
            Novo Evento
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Data</th>
              <th className="p-2 border">Palestrantes</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((e: any) => (
              <tr key={e.id}>
                <td className="p-2 border text-center">{e.id}</td>
                <td className="p-2 border">{e.nome}</td>
                <td className="p-2 border text-center">
                  {new Date(e.data).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-2 border">
                  {e.palestrantes.map((p: any) => (
                    p.nome
                  )).join(", ")}
                </td>
                <td className="p-2 border text-center">
                  <div className="flex justify-center gap-3">
                    <button 
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 cursor-pointer hover:active:bg-yellow-600"
                      onClick={() => editar(e.id)}
                    >
                      Editar
                    </button>
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 cursor-pointer hover:active:bg-red-600"
                      onClick={() => excluir(e.id)}
                    >
                      Excluir
                    </button>
                    <button 
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 cursor-pointer hover:active:bg-blue-600"
                      onClick={() => {
                        console.log(modalQr.idEvento)
                        setModalQr({ idEvento: e.id, nomeEvento: e.nome, aberto: true });
                        console.log(modalQr.idEvento)
                      }}
                    >
                      Exibir QR Code
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAberto && (
          <EventoModal
            id={idAtual}
            onClose={fecharModal}
            onSave={buscaEventos}
          />
        )}

        {modalQr.aberto && (
          <QrModal
            idEvento={modalQr.idEvento}
            nomeEvento={modalQr.nomeEvento}
            onClose={() => {setModalQr({idEvento: null, nomeEvento: "", aberto: false})}}
          />
        )}
      </div>
    </main>
  );
}
