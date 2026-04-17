import { useSignIn } from '@clerk/clerk-react';
import { Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const { signIn, isLoaded } = useSignIn();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleGoogleSignIn = async () => {
        if (!isLoaded || !signIn) return;

        setLoading(true);
        setError('');
        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: `${window.location.origin}/`,
                redirectUrlComplete: `${window.location.origin}/`,
            });
        } catch (err: any) {
            console.error('Error signing in with Google:', err);
            setError(err.errors?.[0]?.message || 'Failed to sign in with Google');
            setLoading(false);
        }
    };

    const handleGithubSignIn = async () => {
        if (!isLoaded || !signIn) return;

        setLoading(true);
        setError('');
        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_github',
                redirectUrl: `${window.location.origin}/`,
                redirectUrlComplete: `${window.location.origin}/`,
            });
        } catch (err: any) {
            console.error('Error signing in with Github:', err);
            setError(err.errors?.[0]?.message || 'Failed to sign in with Github');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-50 w-full max-w-md mx-4">
                <div className="bg-background border-4 border-foreground shadow-hard p-8 relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-neo-red hover:text-background border-2 border-foreground transition-colors"
                        disabled={loading}
                    >
                        <X size={24} />
                    </button>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="inline-block bg-neo-green border-2 border-foreground px-3 py-1 mb-4 shadow-hard rotate-[-2deg]">
                            <span className="font-mono font-bold">● SECURE ACCESS</span>
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">
                            AUTHENTICATE
                        </h2>
                        <p className="font-mono text-sm text-foreground/70">
                            $ sudo login --secure-mode
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-neo-red/10 border-2 border-neo-red">
                            <p className="font-mono text-sm text-neo-red">{error}</p>
                        </div>
                    )}

                    {/* Auth Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading || !isLoaded}
                            className="neo-btn w-full bg-background text-foreground border-2 border-foreground px-6 py-4 text-lg shadow-hard hover:bg-neo-blue hover:text-background flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <FaGoogle size={24} />
                                    <span className="font-bold">CONTINUE WITH GOOGLE</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleGithubSignIn}
                            disabled={loading || !isLoaded}
                            className="neo-btn w-full bg-background text-foreground border-2 border-foreground px-6 py-4 text-lg shadow-hard hover:bg-foreground hover:text-background flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <FaGithub size={24} />
                                    <span className="font-bold">CONTINUE WITH GITHUB</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 p-4 bg-foreground text-neo-green font-mono text-xs border-2 border-foreground">
                        <p>🔒 ENCRYPTION: AES-256</p>
                        <p>🛡️ SECURITY: MAXIMUM</p>
                        <p>✓ AUTHENTICATION: OAUTH 2.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
