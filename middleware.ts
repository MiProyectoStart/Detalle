// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// DEBE ser una exportación nombrada llamada 'middleware' o una exportación por defecto
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obtenemos la cookie de sesión
  const session = request.cookies.get('admin_session');

  // LÓGICA DE PROTECCIÓN
  // Si intenta entrar a cualquier ruta de /admin que no sea el login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Si no hay sesión iniciada, lo mandamos al login
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// El 'matcher' le dice a Next.js en qué rutas debe activarse este guardián
export const config = {
  matcher: [
    '/admin/:path*', // Protege /admin y todas sus sub-rutas
  ],
};