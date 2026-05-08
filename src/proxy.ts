import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/verify-otp'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Next.js middleware cannot access localStorage directly.
  // We check for a generic cookie 'auth-status' which we will set during login.
  const authStatus = request.cookies.get('auth-status');

  if (!authStatus || authStatus.value !== 'authenticated') {
    // Redirect unauthenticated users to /login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Protect all routes, but exclude static files, _next, etc.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons).*)',
  ],
};
