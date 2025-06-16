import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// https://nextjs.org/docs/app/api-reference/file-conventions/middleware

const isProtectedRoute = createRouteMatcher(['/reviews/add(.*)']);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  console.log('running Clerk middleware for auth');
  // Restrict admin routes to users with specific permissions
  if (isAdminRoute(req)) {
    await auth.protect((has) => has({ permission: 'org:admin' }));
  }
  // Restrict organization routes to signed in users
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
