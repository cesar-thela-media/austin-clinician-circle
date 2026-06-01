import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextMiddleware } from "next/server";
import { hasClerkCredentials } from "@/lib/env";

const noopProxy: NextMiddleware = () => NextResponse.next();

export default hasClerkCredentials ? clerkMiddleware() : noopProxy;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};