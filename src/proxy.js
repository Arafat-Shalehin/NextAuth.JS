import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/private", "/dashboard", "/secret"];
const adminRoutes = ["/dashboard"];
// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  const token = await getToken({ req });
  console.log(token);
  const reqPath = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);
  const isUser = token?.role === "user";
  const isAdmin = token?.role == "admin";
  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => reqPath.startsWith(route));
  console.log({ isAuthenticated, isUser, reqPath, isPrivate });

  // Logic for private route only
  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("/api/auth/signIn", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  // Logic for admin route only
  if (isAuthenticated && !isAdmin && isAdminRoute) {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  // return NextResponse.redirect(new URL('/home', req.url))
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*", "/secret/:path*"],
};
