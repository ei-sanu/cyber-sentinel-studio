import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Coffee, Loader2 } from "lucide-react";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Email validation regex
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await supabase
        .from('newsletter')
        .insert([{ email: email.toLowerCase().trim() }]);

      if (error) {
        // Check for duplicate email error
        if (error.code === '23505') {
          toast({
            title: 'Already Subscribed',
            description: 'This email is already subscribed to our newsletter.',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Success!',
          description: 'Thank you for subscribing to our newsletter!',
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-foreground text-background border-y-4 border-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 20%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 20%) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
          Subscribe to My <span className="text-neo-green">Newsletter</span>
        </h2>
        <p className="font-mono text-muted-foreground mb-8">
          Stay updated with the latest in cybersecurity trends and tips
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-12">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isLoading}
            className="flex-1 bg-background text-foreground border-2 border-background p-3 font-mono font-bold focus:outline-none focus:bg-neo-yellow focus:text-foreground transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="neo-btn bg-neo-green text-foreground px-8 py-3 font-black text-lg border-2 border-background shadow-hard hover:bg-neo-pink disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        <div className="border-t-2 border-background/20 pt-8">
          <h3 className="text-2xl font-black mb-2">Support My Work</h3>
          <p className="font-mono text-muted-foreground mb-6 text-sm">
            If you find my work helpful, consider buying me a coffee to keep me energized!
          </p>
          <a
            href="#"
            className="neo-btn inline-flex items-center gap-2 bg-neo-yellow text-foreground px-8 py-4 font-black text-lg border-2 border-background shadow-hard hover:bg-neo-orange"
          >
            <Coffee size={24} /> Buy me a coffee
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
