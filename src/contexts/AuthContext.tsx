import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';
import { ReactNode, createContext, useContext } from 'react';

interface AuthContextType {
    user: any;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
    isSignedIn: boolean;
    userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to extract email from Clerk user object
const getUserEmail = (clerkUser: any): string | null => {
    if (!clerkUser) return null;
    return clerkUser.primaryEmailAddress?.emailAddress ||
        clerkUser.emailAddresses?.[0]?.emailAddress ||
        null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const { signOut: clerkSignOut, isSignedIn } = useClerkAuth();
    const { user, isLoaded } = useUser();

    const userEmail = getUserEmail(user);

    const signInWithGoogle = async () => {
        try {
            // Clerk handles Google sign-in through its SignIn component
            // This function is called from AuthModal where we can trigger the sign-in flow
            if (window.__clerkSignInGoogle) {
                await window.__clerkSignInGoogle();
            }
        } catch (error: any) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    const signInWithGithub = async () => {
        try {
            // Clerk handles Github sign-in through its SignIn component
            // This function is called from AuthModal where we can trigger the sign-in flow
            if (window.__clerkSignInGithub) {
                await window.__clerkSignInGithub();
            }
        } catch (error: any) {
            console.error('Error signing in with Github:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await clerkSignOut();
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    // For backward compatibility, add email property to user object
    const userWithEmail = user ? { ...user, email: userEmail } : null;

    const value = {
        user: userWithEmail,
        loading: !isLoaded,
        signInWithGoogle,
        signInWithGithub,
        signOut,
        isSignedIn,
        userEmail,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
