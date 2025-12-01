"use client";

import { http } from "@/api/http";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function EventosPage() {
  const [palestrantes, setPalestrantes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [idAtual, setIdAtual] = useState<number | null>(null);

  async function buscaPalestrantes() {
    const res = await http("/palestrante");
    setPalestrantes(await res.json());
  }

  useEffect(() => {
    buscaPalestrantes();
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
    if (!confirm("Deseja mesmo excluir este palestrante?")) return;

    const res = await http(`/palestrante/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      buscaPalestrantes();
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
          <h1 className="text-3xl font-bold">Palestrantes</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer hover:active:bg-blue-700"
            onClick={cadastrar}
          >
            Novo Palestrante
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Descrição</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {palestrantes.map((e: any) => (
              <tr key={e.id}>
                <td className="p-2 border text-center">{e.id}</td>
                <td className="p-2 border">{e.nome}</td>
                <td className="p-2 border">{e.descricao}</td>
                <td className="p-2 border">
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
            onSave={buscaPalestrantes}
          />
        )}
      </div>
    </main>
  );
}

function EventoModal({ id, onClose, onSave }: any) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    palestrantes: []
  });

  useEffect(() => {
    if (!id) return;
    http(`/palestrante/${id}`)
      .then(r => r.json())
      .then(data => setForm(data));
  }, [id]);

  function tratarMudanca(e: any) {
    setForm(ant => ({ ...ant, [e.target.name]: e.target.value }));
  }

  async function salvar() {
    const url = id
      ? `/palestrante/${id}`
      : "/palestrante";

    const res = await http(url, {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSave();
      onClose();
    } else {
      alert(`Erro ao salvar: ${(await res.json()).message}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-x1 w-[500px]">
        <h2 className="text-x1 font-bold mb-4">
          {id ? "Editar Palestrante" : "Novo Palestrante"}
        </h2>

        <label htmlFor="nome">Nome</label>
        <input
          name="nome"
          value={form.nome}
          onChange={tratarMudanca}
          className="border b-2 w-full mb-4"
          placeholder="Nome do palestrante"
        />

        <label htmlFor="descricao">Descrição</label>
        <input
          name="descricao"
          value={form.descricao}
          onChange={tratarMudanca}
          className="border b-2 w-full mb-4"
          placeholder="Descrição"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:active:bg-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-400 hover:active:bg-green-600"
            onClick={salvar}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
