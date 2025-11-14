"use client";

import { useEffect } from "react";
import GoogleButton from "react-google-button";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);
  });

  const handleGoogleSignIn = () => {
    const client = (window as any).google?.accounts.id;
    if (!client) {
      alert("SDK do Google ainda não foi carregado");
      return;
    }

    client.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    client.prompt();
  };

  const handleCredentialResponse = async (response: any) => {
    const idToken = response.credential;

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    })

    const data = await res.json();
    console.log("Server response:", data);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Entrar com o Google</h1>
      <p>Utilize sua conta da Unipar</p>
      <GoogleButton onClick={handleGoogleSignIn} />
    </main>
  );
}
