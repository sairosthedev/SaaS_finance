import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes (sign-in, sign-up, api) that should bypass authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',  // Allow sign-in routes
  '/sign-up(.*)',  // Allow sign-up routes
  '/api(.*)',      // Allow API routes to be accessed without authentication
]);

export default clerkMiddleware(async (auth, request) => {
  // If the route is not public (i.e., it is a protected route), apply authentication
  if (!isPublicRoute(request)) {
    await auth.protect(); // Protect the route with Clerk's auth
  }
  
  // Proceed with the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes, skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    // Always run for API routes (but these are public now)
    '/(api|trpc)(.*)', // Ensure API routes are not protected by authentication
  ],
};
