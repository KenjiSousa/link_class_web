import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />

      <main className="flex flex-col items-center justify-center p-24">
        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-(--unired)">
          <h1 className="text-2xl font-bold mb-4">Bem-vindo ao LinkClass!</h1>
          <p className="text-gray-600">Clique nas opções acima para continuar.</p>
        </div>
      </main>
    </div>
  );
}