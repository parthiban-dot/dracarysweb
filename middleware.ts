import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// Define protected and public routes
const publicRoutes = ["/", "/team", "/founder", "/projects", "/sold-projects", "/hackathons", "/free-launchers"];
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || 
                        nextUrl.pathname.startsWith("/projects/") || 
                        nextUrl.pathname.startsWith("/hackathons/") || 
                        nextUrl.pathname.startsWith("/free-launchers/");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Dashboard / Admin protection logic can go here (role checks are handled via server actions/components but this prevents unauthorized access)

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
