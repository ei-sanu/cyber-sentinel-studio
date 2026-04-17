import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Check, Github, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);

      // Save to Supabase database
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          user_id: user?.uid || null
        });

      if (error) {
        console.error('Error saving contact submission:', error);
        throw error;
      }

      setShowSuccess(true);

      toast({
        title: '✓ Message Sent!',
        description: 'Thanks for reaching out! I\'ll get back to you soon.',
      });

      setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setShowSuccess(false);
      }, 2000);

    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 max-w-5xl mx-auto">
      <div className="bg-card border-2 sm:border-4 border-foreground shadow-hard-xl p-5 sm:p-8 md:p-12 relative reveal mt-8 sm:mt-12">
        <div className="absolute -top-8 sm:-top-10 left-2 sm:-left-6 bg-neo-yellow border-2 sm:border-4 border-foreground px-4 sm:px-6 py-1 sm:py-2 shadow-hard rotate-[-5deg] animate-bounce-in">
          <span className="font-black text-lg sm:text-2xl">GET IN TOUCH</span>
        </div>

        {showSuccess && (
          <div className="absolute inset-0 bg-neo-green/95 z-10 flex items-center justify-center border-2 sm:border-4 border-foreground animate-in fade-in zoom-in duration-500">
            <div className="text-center animate-bounce-in">
              <Check size={64} className="mx-auto mb-4 text-foreground animate-success-pulse" />
              <h3 className="text-3xl sm:text-4xl font-black text-foreground uppercase">Message Sent!</h3>
              <p className="font-mono text-foreground mt-2">I'll get back to you soon.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-4">
          <div className="animate-in slide-in-from-left duration-700">
            <h2 className="text-3xl sm:text-5xl font-black uppercase mb-4 sm:mb-6 leading-[0.85]">Let's<br />Secure<br />Together.</h2>
            <p className="font-mono text-sm sm:text-lg mb-6 sm:mb-8 text-muted-foreground">
              Have a project in mind or want to discuss security solutions? Feel free to reach out.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground text-background flex items-center justify-center border-2 border-foreground shrink-0 group-hover:bg-neo-cyan transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="font-bold text-sm sm:text-lg">Odisha, India</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground text-background flex items-center justify-center border-2 border-foreground shrink-0 group-hover:bg-neo-pink transition-colors">
                  <Mail size={18} />
                </div>
                <span className="font-bold text-sm sm:text-lg">Click to email</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground text-background flex items-center justify-center border-2 border-foreground shrink-0 group-hover:bg-neo-yellow transition-colors">
                  <Phone size={18} />
                </div>
                <span className="font-bold text-sm sm:text-lg">+91 7008450074</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground text-background flex items-center justify-center border-2 border-foreground shrink-0 group-hover:bg-neo-blue transition-colors">
                  <Github size={18} />
                </div>
                <a href="https://github.com/ei-sanu" target="_blank" rel="noopener noreferrer" className="font-bold text-sm sm:text-lg hover:bg-neo-green px-1 transition-colors">
                  ei-sanu
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-muted p-4 sm:p-6 border-2 border-foreground animate-in slide-in-from-right duration-700">
            <div className="flex flex-col">
              <label className="font-mono font-bold mb-1 uppercase text-xs">Your Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={isLoading}
                className="bg-card border-2 border-foreground p-2 sm:p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all text-sm sm:text-base disabled:opacity-50"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-mono font-bold mb-1 uppercase text-xs">Your Email</label>
              <input
                type="email"
                placeholder="yourname@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={isLoading}
                className="bg-card border-2 border-foreground p-2 sm:p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all text-sm sm:text-base disabled:opacity-50"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-mono font-bold mb-1 uppercase text-xs">Your Message</label>
              <textarea
                rows={4}
                placeholder="Tell me about your project or inquiry..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                disabled={isLoading}
                className="bg-card border-2 border-foreground p-2 sm:p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all resize-none text-sm sm:text-base disabled:opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="neo-btn w-full bg-neo-blue text-background font-black text-lg sm:text-xl py-3 sm:py-4 border-2 border-foreground shadow-hard hover:bg-foreground hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  <Send size={20} />
                  SEND MESSAGE
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
