import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// Define protected and public routes
const publicRoutes = ["/", "/team", "/founder", "/projects", "/sold-projects", "/hackathons"];
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || 
                        nextUrl.pathname.startsWith("/projects/") || 
                        nextUrl.pathname.startsWith("/hackathons/");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (!req.auth?.user?.onboarded) {
        return NextResponse.redirect(new URL("/onboarding", nextUrl));
      }
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Onboarding Protection
  if (isLoggedIn) {
    const isOnboarding = nextUrl.pathname === "/onboarding";
    const hasOnboarded = req.auth?.user?.onboarded;

    // Force onboarding if incomplete
    if (!hasOnboarded && !isOnboarding) {
      return NextResponse.redirect(new URL("/onboarding", nextUrl));
    }

    // Prevent onboarded users from accessing onboarding
    if (hasOnboarded && isOnboarding) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
