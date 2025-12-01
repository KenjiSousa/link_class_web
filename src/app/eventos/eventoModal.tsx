import { http } from "@/api/http";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import TimePicker from "react-time-picker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "./style.css";

registerLocale("ptBR", ptBR);

const palestrantes = await http("/palestrante")
  .then(res => {
    return res.json()
  })
  .then(json => Array.from(json).map((p: any) => {return { value: p.id, label: p.nome }; }));

interface FormEvento {
  nome: string,
  data: string,
  hr_ini: string,
  hr_fim: string,
  logradouro: string,
  numero: string,
  palestrantes: number[],
  tema: string,
  status: string,
  obs: string,
}

export default function EventoModal({ id, onClose, onSave }: any) {
  new Date().toISOString().substring(0, 10);
  const [
    form,
    setForm
  ] = useState<FormEvento>({
    nome: "",
    data: new Date().toISOString().substring(0, 10),
    hr_ini: "",
    hr_fim: "",
    logradouro: "",
    numero: "",
    palestrantes: [],
    tema: "",
    status: "aberto",
    obs: "",
  });

  useEffect(() => {
    if (!id) return;
    http(`/evento/${id}`)
      .then(res => res.json())
      .then(e => {
        e.palestrantes = Array.from(e.palestrantes).map((p: any) => p.id);
        console.log(e)
        setForm(e)
      });
  }, [id]);

  function tratarMudanca(e: any) {
    setForm(ant => ({ ...ant, [e.target.name]: e.target.value }));
  }

  async function salvar() {
    const url = id ? `/evento/${id}` : "/evento";

    const res = await http(url, {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSave();
      onClose();
    } else {
      const resJson = await res.json();
      const campos = resJson.campos;
      if (!campos || campos.length === 0) {
        alert(`Erro ao salvar: ${resJson.message}`);
        return;
      }

      const elemsErro = document.getElementsByClassName("span-erro");
      for (const elemErro of elemsErro) {
        const erro = campos[elemErro.id.slice(0, -4)];
        if (erro) {
          elemErro.innerHTML = erro;
        } else {
          elemErro.innerHTML = "";
        }
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-x1 w-[500px]">
        <h2 className="text-x1 font-bold mb-4">
          {id ? "Editar Evento" : "Novo Evento"}
        </h2>

        <div className="mb-4">
          <label htmlFor="nome">Nome <span className="text-red-500">*</span></label>
          <input
            name="nome"
            value={form.nome}
            onChange={tratarMudanca}
            className="border b-2 w-full"
            placeholder="Nome do evento"
          />
          <span id="nome-err" className="text-red-500 span-erro" />
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="data" className="w-[100px] text-center">Data <span className="text-red-500">*</span></label>
            <div className="flex w-100px">
              <DatePicker
                locale={ptBR}
                dateFormat="dd/MM/yyyy"
                selected={new Date(`${form.data}T00:00:00`)}
                onChange={(d) => {
                  if (!d) return;
                  setForm(ant => ({ ...ant, data: d.toISOString().substring(0, 10) }));
                }}
                className="text-center border b-2 w-[100px]"
              />
            </div>
            <span id="data-err" className="text-red-500 span-erro" />
          </div>
          <div className="flex gap-3 flex-1">
            <div className="flex flex-col">
              <label htmlFor="hr_ini">Horário Inicial <span className="text-red-500">*</span></label>
              <TimePicker
                name="hr_ini"
                format="HH:mm"
                clearIcon={null}
                disableClock={true}
                value={form.hr_ini}
                onChange={(h) => {
                  if (!h) return;
                  setForm(ant => ({ ...ant, hr_ini: h }));
                }}
                className="text-center border b-2 w-full"
              />
              <span id="hr_ini-err" className="text-red-500 span-erro" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="hr_fim">Horário Final <span className="text-red-500">*</span></label>
              <TimePicker
                name="hr_fim"
                format="HH:mm"
                clearIcon={null}
                disableClock={true}
                value={form.hr_fim}
                onChange={(h) => {
                  if (!h) return;
                  setForm(ant => ({ ...ant, hr_fim: h }));
                }}
                className="text-center border b-2 w-full"
              />
              <span id="hr_fim-err" className="text-red-500 span-erro" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex flex-col flex-4">
            <label htmlFor="logradouro">Logradouro <span className="text-red-500">*</span></label>
            <input
              name="logradouro"
              value={form.logradouro}
              onChange={tratarMudanca}
              className="border b-2 w-full"
              placeholder="Logradouro do evento"
            />
            <span id="logradouro-err" className="text-red-500 span-erro" />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="numero">Número</label>
            <input
              name="numero"
              value={form.numero ?? ""}
              onChange={tratarMudanca}
              className="border b-2 w-full"
              placeholder="Nº"
            />
            <span id="numero-err" className="text-red-500 span-erro" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="palestrantes">Palestrantes <span className="text-red-500">*</span></label>
          <Select
            name="palestrantes"
            options={palestrantes}
            value={
              palestrantes.filter(p => form.palestrantes.includes(p.value))
            }
            isMulti={true}
            onChange={(ps) => {
              setForm(ant => ({ ...ant, palestrantes: ps.map(p => p.value) }));
            }}
            className="border b-2 w-full"
          />
          <span id="palestrantes-err" className="text-red-500 span-erro" />
        </div>

        <div className="mb-4">
          <label htmlFor="tema">Tema <span className="text-red-500">*</span></label>
          <input
            name="tema"
            value={form.tema}
            onChange={tratarMudanca}
            className="border b-2 w-full"
            placeholder="Tema"
          />
          <span id="tema-err" className="text-red-500 span-erro" />
        </div>

        <div className="mb-4">
          <label htmlFor="obs">Observações</label>
          <input
            name="obs"
            value={form.obs ?? ""}
            onChange={tratarMudanca}
            className="border b-2 w-full"
            placeholder="Observações"
          />
          <span id="obs-err" className="text-red-500 span-erro" />
        </div>

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