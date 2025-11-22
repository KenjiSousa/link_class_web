"use client";

import { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
      log_level: 'debug',
      client_id: process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      callback: handleCredentialResponse,
      use_fedcm_for_prompt: true,
    });

    client.prompt();
  };

  const handleCredentialResponse = async (response: any) => {
    console.log(1)
    const idToken = await response.credential;

    console.log(2)
    const res = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      credentials: "include",
    });

    console.log(3)
    if (res.status !== 200) {
      alert((await res.json()).message);
      return;
    }

    console.log(4)
    router.push('/inicio');
    console.log(5)
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Entrar com o Google</h1>
      <p>Utilize sua conta da Unipar</p>
      <GoogleButton onClick={handleGoogleSignIn} />
    </main>
  );
}
