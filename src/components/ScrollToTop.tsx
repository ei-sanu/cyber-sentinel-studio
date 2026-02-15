import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[60] w-12 h-12 bg-neo-cyan border-2 border-foreground shadow-hard hover:shadow-hard-xl active:shadow-hard-xl hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center group animate-in fade-in slide-in-from-bottom-4"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6 text-foreground group-hover:animate-pulse" />
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
//clean tree
