import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

export const publicRoutes = [
  "/",
  "/actualites-nationales",
  "/articles",
  "/podcasts",
  "/galerie",
  "/a-la-une",
  "/sports",
  "/dailies",
];

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const pathWithoutLocale =
    pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (pathWithoutLocale.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isPublicPage = publicRoutes.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(route + "/")
  );

  if (isPublicPage) {
    return intlMiddleware(req);
  }

  if (!token) {
    let callbackUrl = pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    const loginUrl = new URL(`/?callbackUrl=${encodedCallbackUrl}`, req.url);

    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|_vercel).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};