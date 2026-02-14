const experiences = [
  {
    title: "Freelance Full-Stack Developer",
    period: "Nov 2025 - PRESENT",
    company: "@ SELF_EMPLOYED",
    color: "text-neo-yellow",
    dotColor: "bg-neo-yellow",
    items: [
      "Building responsive and interactive web applications using React, Node.js, and modern frameworks",
      "Developing secure full-stack solutions with cybersecurity best practices",
      "Creating custom web solutions tailored to client requirements",
    ],
  },
  {
    title: "Blue Team Security Analyst",
    period: "Aug 2025 - PRESENT",
    company: "@ FREELANCE",
    color: "text-neo-green",
    dotColor: "bg-neo-green",
    items: [
      "Monitoring and analyzing security events using SIEM tools",
      "Conducting vulnerability assessments and threat hunting operations",
      "Implementing incident response procedures and security hardening",
    ],
  },
  {
    title: "Project Manager",
    period: "Dec 2024 - Aug 2025",
    company: "@ SELF_EMPLOYED",
    color: "text-neo-blue",
    dotColor: "bg-neo-blue",
    items: [
      "Managing multiple client projects from initiation to completion",
      "Coordinating with development teams and ensuring project milestones",
      "Maintaining client relationships and handling project communications",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24 px-4 max-w-7xl mx-auto">
    <h2 className="text-5xl md:text-8xl font-black uppercase mb-12 tracking-tighter text-center">
      Experience<span className="text-neo-red">_Log</span>
    </h2>

    <div className="relative border-l-4 border-foreground ml-4 md:ml-10 space-y-12">
      {experiences.map((exp) => (
        <div key={exp.title} className="reveal relative pl-8 md:pl-16">
          <div className={`absolute -left-[14px] top-2 w-6 h-6 ${exp.dotColor} border-4 border-foreground`} />
          <div className="bg-card border-4 border-foreground p-6 shadow-hard hover:shadow-hard-xl transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-muted pb-4 mb-4">
              <h3 className="text-3xl font-black uppercase">{exp.title}</h3>
              <span className="font-mono font-bold bg-foreground text-background px-2 py-1">{exp.period}</span>
            </div>
            <p className={`font-mono text-xl mb-2 ${exp.color} font-bold`}>{exp.company}</p>
            <ul className="list-disc list-inside font-mono text-muted-foreground space-y-1">
              {exp.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
