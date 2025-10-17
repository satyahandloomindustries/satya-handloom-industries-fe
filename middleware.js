// middleware.js
import { NextResponse } from "next/server";
import { AUTH_TOKEN } from "./constants";
import { verifyToken } from "./services/JWTServices";

export async function middleware(req) {
  const cookie = await req.cookies;
  const token = cookie.get(AUTH_TOKEN)?.value

  

  if (!token || !await verifyToken(token)) {
    // Redirect to login if no token or invalid
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Token is valid, proceed
  return NextResponse.next();
}

export const config = {
  matcher: [], // protected routes
};
