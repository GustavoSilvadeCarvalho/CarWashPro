import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas que não precisam de autenticação
const publicRoutes = ["/", "/login", "/register", "/auth/callback"];

export async function middleware(request: NextRequest) {
  // Debug: Listar todos os cookies
  const allCookies = request.cookies.getAll();
  console.log("Todos os cookies:", allCookies);

  // Verificar o cookie de autenticação do Supabase
  const supabaseToken = request.cookies.get("sb:token")?.value;
  console.log("Token do Supabase:", supabaseToken);

  // Pega o caminho atual da URL
  const path = request.nextUrl.pathname;
  console.log("Caminho atual:", path);

  // Considera autenticado se tiver o token
  const isAuthenticated = !!supabaseToken;
  console.log("Está autenticado?", isAuthenticated);

  // Se o usuário está autenticado e tenta acessar login ou registro
  if (isAuthenticated && (path === "/login" || path === "/register")) {
    console.log(
      "Usuário autenticado tentando acessar login/register - redirecionando para dashboard"
    );
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Verifica se é uma rota pública
  const isPublicRoute = publicRoutes.includes(path);
  console.log("É rota pública?", isPublicRoute);

  // Se for uma rota pública, permite o acesso
  if (isPublicRoute) {
    console.log("Permitindo acesso à rota pública");
    return NextResponse.next();
  }

  // Se não for uma rota pública e não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    console.log(
      "Usuário não autenticado tentando acessar rota protegida - redirecionando para login"
    );
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se estiver autenticado, permite o acesso
  console.log("Usuário autenticado - permitindo acesso");
  return NextResponse.next();
}

// Configuração para definir em quais caminhos o middleware será executado
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
