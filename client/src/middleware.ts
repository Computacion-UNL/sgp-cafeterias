import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    const url: NextURL = req.nextUrl.clone();
    const searchParams = url.search;
    url.search = "";
    url.searchParams.set("returnUrl", `${url.pathname}${searchParams}`);
    url.pathname = `/ingresar`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
