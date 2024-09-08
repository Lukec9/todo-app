import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import axiosInstance from "./utils/axiosInstance";
import axios from "axios";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authRoutes = ["/login", "/signup"];
  const isOnAuthRoute = authRoutes.includes(pathname);

  if (pathname === "/") {
    return NextResponse.next();
  }

  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/verify-session`,
      {
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );

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
    console.log(error.response?.data, "is verified");
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
