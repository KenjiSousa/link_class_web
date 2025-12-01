import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { http } from "./api/http";

export async function proxy(request: NextRequest) {
  if (!await loginValido(request.cookies.get('token')?.value)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

async function loginValido(token: string | undefined): Promise<boolean> {
  const res = await http(`/login/validate`, {
    headers: {
      "authorization": `Bearer ${token}`
    },
  });

  return res.status === 200;
}

export const config = {
  matcher: ['/((?!login|favicon.ico|_next/static|_next/image).*)'],
};