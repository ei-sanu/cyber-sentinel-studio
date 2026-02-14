import { Star } from "lucide-react";

const reports = [
  {
    id: "001",
    color: "neo-green",
    borderHover: "hover:border-neo-green/50",
    from: "Client @ Freelance Project",
    quote: "Somesh delivered a secure, high-performance web app that exceeded all expectations. Truly understands both dev and security.",
  },
  {
    id: "002",
    color: "neo-blue",
    borderHover: "hover:border-neo-blue/50",
    from: "Team Lead @ University Project",
    quote: "Fast, reliable, and actually has good taste in design. A rare combination of full-stack skills and security mindset.",
  },
  {
    id: "003",
    color: "neo-pink",
    borderHover: "hover:border-neo-pink/50",
    from: "Peer @ LPU",
    quote: "Cleanest code I've seen. He knows how to handle complex state management and secure architecture.",
  },
  {
    id: "004",
    color: "neo-yellow",
    borderHover: "hover:border-neo-yellow/50",
    from: "Mentor @ Cybersecurity Lab",
    quote: "Outstanding blue team skills. His threat hunting and incident response work is top-notch.",
  },
  {
    id: "005",
    color: "neo-orange",
    borderHover: "hover:border-neo-orange/50",
    from: "Client @ Web Dev Project",
    quote: "Highly intuitive UX. Delivered exactly what we needed with bulletproof security built in from day one.",
  },
];

const colorMap: Record<string, string> = {
  "neo-green": "hsl(134 100% 60%)",
  "neo-blue": "hsl(217 91% 60%)",
  "neo-pink": "hsl(340 100% 72%)",
  "neo-yellow": "hsl(59 100% 64%)",
  "neo-orange": "hsl(34 100% 55%)",
};

const UserReportsSection = () => (
  <section id="reports" className="py-24 bg-foreground border-t-4 border-foreground overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-16 bg-background/5 border-2 border-background/10 p-4 inline-flex shadow-hard">
        <div className="flex gap-2">
          <div className="h-3 w-3 bg-neo-red rounded-full border border-foreground" />
          <div className="h-3 w-3 bg-neo-yellow rounded-full border border-foreground" />
          <div className="h-3 w-3 bg-neo-green rounded-full border border-foreground" />
        </div>
        <h2 className="font-mono text-background text-xl font-bold ml-4 tracking-tighter">USER_REPORTS.txt</h2>
        <div className="ml-8 px-2 bg-neo-blue text-foreground text-[10px] font-black uppercase">LIVE_FEED</div>
      </div>
    </div>

    <div className="marquee-container group">
      <div className="marquee-content flex gap-8 py-12 px-4 select-none">
        {/* Original + duplicate set for seamless loop */}
        {[...reports, ...reports].map((r, i) => (
          <div
            key={`${r.id}-${i}`}
            className={`flex-shrink-0 w-[90vw] sm:w-[400px] md:w-[450px] max-w-[450px] bg-foreground border-4 border-background/10 p-8 shadow-hard ${r.borderHover} hover:-translate-y-2 transition-all duration-500 relative overflow-hidden text-left whitespace-normal`}
          >
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: colorMap[r.color] }}
            />
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-background/5 rotate-45" />
            <div className="flex justify-between items-start mb-6">
              <div
                className="font-mono text-xs font-bold tracking-widest uppercase"
                style={{ color: colorMap[r.color] }}
              >
                REPORT_{r.id}.log
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">2026.txt</div>
            </div>
            <div className="font-mono text-muted-foreground text-[10px] mb-2 uppercase tracking-tight">
              FROM: {r.from}
            </div>
            <p className="font-bold text-xl leading-snug mb-6 text-background/90">"{r.quote}"</p>
            <div className="flex gap-1 text-lg" style={{ color: `${colorMap[r.color]}99` }}>
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} fill="currentColor" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UserReportsSection;
