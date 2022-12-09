import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAuthenticated = false; // Usuário "não autenticado"

export function middleware(request: NextRequest) {
  if (!isAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        message: "Fala na autenticação",
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.redirect(new URL("/dashboard-2", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard-2/:path*"],
};
