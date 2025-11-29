import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />

      <main className="flex flex-col items-center justify-center p-24">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Sistema</h1>
          <p className="text-gray-600">Conteúdo da página de início aqui.</p>
          <p style={{fontSize: '5em', marginTop: '20px', textAlign: 'center'}}>INICIO WORKS</p>
        </div>
      </main>
    </div>
  );
}