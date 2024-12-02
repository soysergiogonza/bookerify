import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Request URL:', request.url);

  // Redirigir /dashboard/User a /dashboard
  if (request.nextUrl.pathname === '/dashboard/User') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
}; 