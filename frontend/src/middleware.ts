import axios from "axios";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api";
axios.defaults.withCredentials = true;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authRoutes = ["/login", "/signup"];
  const isOnAuthRoute = authRoutes.includes(pathname);

  if (pathname === "/") {
    return NextResponse.next();
  }

  try {
    const response = await axios.get(`${API_URL}/users/verify-session`, {
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
      withCredentials: true,
    });

    const user = response.data;

    if (user) {
      if (isOnAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      if (!isOnAuthRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    if (!isOnAuthRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
