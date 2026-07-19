import type { NextAuthConfig } from "next-auth";

const PROTECTED_PATHS = ["/", "/planner", "/settings"];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      const isProtected = PROTECTED_PATHS.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`)
      );
      if (isProtected && !isLoggedIn) return false;
      return true;
    },
  },
};