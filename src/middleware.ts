import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getTokenFromCookies from "./utils/getTokenFromCookies";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Current route
  const route = request.nextUrl.pathname;
  const token = await getTokenFromCookies();
  console.log("token from middleware", token);
  const isPublicRoute = route === "/";
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isPublicRoute && token) {
    const redirectRoute = "/dashboard";
    return NextResponse.redirect(new URL(redirectRoute, request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};