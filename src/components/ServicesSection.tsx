import { Shield, Lock, GraduationCap } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Penetration Testing",
    desc: "Comprehensive security assessments to identify vulnerabilities in your systems before attackers do.",
    color: "bg-neo-green",
  },
  {
    icon: Lock,
    title: "Security Consulting",
    desc: "Expert advice on securing your digital assets and implementing robust security measures.",
    color: "bg-neo-blue",
  },
  {
    icon: GraduationCap,
    title: "Security Training",
    desc: "Educate your team on security best practices and ethical hacking techniques.",
    color: "bg-neo-yellow",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24 px-4 max-w-7xl mx-auto">
    <h2 className="text-5xl md:text-8xl font-black uppercase mb-12 tracking-tighter text-center">
      Services<span className="text-neo-pink">_Offered</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((s) => (
        <div
          key={s.title}
          className="reveal bg-card border-4 border-foreground p-8 shadow-hard hover:shadow-hard-xl transition-all group"
        >
          <div className={`w-16 h-16 ${s.color} border-2 border-foreground flex items-center justify-center mb-6 shadow-hard-sm group-hover:rotate-12 transition-transform`}>
            <s.icon size={32} />
          </div>
          <h3 className="text-2xl font-black uppercase mb-4">{s.title}</h3>
          <p className="font-mono text-muted-foreground">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ServicesSection;
