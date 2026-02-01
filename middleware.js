// middleware.js
import { NextResponse } from 'next/server';
import { AUTH_TOKEN } from './constants';
import { verifyToken } from './services/JWTServices';

const excludeRoutes = [
  '/api/send-otp',
  '/api/verify-otp',
  '/api/categories',
  '/api/aggregate-categories',
  '/api/create-product',
];

export async function middleware(req) {
  const cookie = await req.cookies;
  const token = cookie.get(AUTH_TOKEN)?.value;
  const { pathname } = req.nextUrl;

  if (excludeRoutes.includes(pathname)) return NextResponse.next();
  const isApiRoute = pathname.startsWith('/api');

  if (!token || !(await verifyToken(token))) {
    // Redirect to login if no token or invalid
    if (isApiRoute) {
      return NextResponse.json(
        { message: 'Unauthorized user' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Token is valid, proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/profile'], // protected routes
};
