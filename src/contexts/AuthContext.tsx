import { auth, facebookProvider, githubProvider, googleProvider } from '@/lib/firebase';
import {
    User,
    browserPopupRedirectResolver,
    signOut as firebaseSignOut,
    getRedirectResult,
    onAuthStateChanged,
    signInWithPopup,
    signInWithRedirect
} from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for redirect result on mount
        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    setUser(result.user);
                }
            })
            .catch((error) => {
                console.error('Error getting redirect result:', error);
            });

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
        } catch (error: any) {
            console.error('Error signing in with Google:', error);
            // If popup fails (e.g., blocked by browser, COOP issues), try redirect
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                try {
                    await signInWithRedirect(auth, googleProvider);
                } catch (redirectError) {
                    console.error('Error with redirect:', redirectError);
                    throw redirectError;
                }
            } else {
                throw error;
            }
        }
    };

    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, facebookProvider, browserPopupRedirectResolver);
        } catch (error: any) {
            console.error('Error signing in with Facebook:', error);
            // If popup fails, try redirect
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                try {
                    await signInWithRedirect(auth, facebookProvider);
                } catch (redirectError) {
                    console.error('Error with redirect:', redirectError);
                    throw redirectError;
                }
            } else {
                throw error;
            }
        }
    };

    const signInWithGithub = async () => {
        try {
            await signInWithPopup(auth, githubProvider, browserPopupRedirectResolver);
        } catch (error: any) {
            console.error('Error signing in with Github:', error);
            // If popup fails, try redirect
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                try {
                    await signInWithRedirect(auth, githubProvider);
                } catch (redirectError) {
                    console.error('Error with redirect:', redirectError);
                    throw redirectError;
                }
            } else {
                throw error;
            }
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signInWithFacebook,
        signInWithGithub,
        signOut,
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
