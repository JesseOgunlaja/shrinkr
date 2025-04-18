import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/signin", "/signup"]);
const isProtectedRoute = createRouteMatcher([
  "/update-plan",
  "/dashboard",
  "/create-link",
  "/edit-link",
  "/api/stripe",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(
      new URL("/signin?returnUrl=" + req.nextUrl.pathname, req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
