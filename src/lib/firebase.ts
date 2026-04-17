// Clerk configuration file
// Clerk API keys and configuration are loaded automatically from environment variables
// VITE_CLERK_PUBLISHABLE_KEY is required in .env

export const clerkConfig = {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
};
