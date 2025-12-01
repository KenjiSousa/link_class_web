import { http } from "@/api/http";
import { useQRCode } from "next-qrcode";
import { useState } from "react";

export default function QrModal({ idEvento, nomeEvento, onClose }: any) {
  const [textoQr, setTextoQr] = useState("");
  http(`/presenca-link/generate?id_evento=${idEvento}`)
    .then(res => res.text())
    .then(text => {setTextoQr(text)});

  const { Canvas } = useQRCode();

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-x1 w-[500px] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4">
          Confirmar Presença: {nomeEvento}
        </h2>

        {textoQr && (
          <Canvas
            text={textoQr}
            options= {{
              errorCorrectionLevel: 'H',
              margin: 3,
              width: 500,
            }}
          />
        )}

        <button
          className="mt-6 px-4 py-2 bg-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:active:bg-gray-500"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}