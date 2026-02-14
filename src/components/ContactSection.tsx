import { useState } from "react";
import { Mail, MapPin, Phone, Github } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for reaching out! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 max-w-5xl mx-auto">
      <div className="bg-card border-2 sm:border-4 border-foreground shadow-hard-xl p-5 sm:p-8 md:p-12 relative reveal mt-8 sm:mt-12">
        <div className="absolute -top-8 sm:-top-10 left-2 sm:-left-6 bg-neo-yellow border-2 sm:border-4 border-foreground px-4 sm:px-6 py-1 sm:py-2 shadow-hard rotate-[-5deg]">
          <span className="font-black text-lg sm:text-2xl">GET IN TOUCH</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase mb-4 sm:mb-6 leading-[0.85]">Let's<br />Secure<br />Together.</h2>
            <p className="font-mono text-sm sm:text-lg mb-6 sm:mb-8 text-muted-foreground">
              Have a project in mind or want to discuss security solutions? Feel free to reach out.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground text-background flex items-center justify-center border-2 border-foreground shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="font-bold text-sm sm:text-lg">Odisha, India</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground text-background flex items-center justify-center border-2 border-foreground shrink-0">
                  <Mail size={18} />
                </div>
                <span className="font-bold text-sm sm:text-lg">Click to email</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground text-background flex items-center justify-center border-2 border-foreground shrink-0">
                  <Phone size={18} />
                </div>
                <span className="font-bold text-sm sm:text-lg">+91 7008450074</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground text-background flex items-center justify-center border-2 border-foreground shrink-0">
                  <Github size={18} />
                </div>
                <a href="https://github.com/ei-sanu" target="_blank" rel="noopener noreferrer" className="font-bold text-sm sm:text-lg hover:bg-neo-green px-1">
                  ei-sanu
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-muted p-4 sm:p-6 border-2 border-foreground">
            <div className="flex flex-col">
              <label className="font-mono font-bold mb-1 uppercase text-xs">Your Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-card border-2 border-foreground p-2 sm:p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all text-sm sm:text-base"
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
                className="bg-card border-2 border-foreground p-2 sm:p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all text-sm sm:text-base"
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
                className="bg-card border-2 border-foreground p-2 sm:p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all resize-none text-sm sm:text-base"
                required
              />
            </div>
            <button
              type="submit"
              className="neo-btn w-full bg-neo-blue text-background font-black text-lg sm:text-xl py-3 sm:py-4 border-2 border-foreground shadow-hard hover:bg-foreground"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
