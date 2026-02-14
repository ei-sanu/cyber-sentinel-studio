const AboutSection = () => (
  <section id="about" className="py-24 px-4 max-w-7xl mx-auto border-x-4 border-foreground bg-card my-12 shadow-hard-lg">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      {/* Terminal card */}
      <div className="md:col-span-5 reveal">
        <div className="bg-foreground text-neo-green border-4 border-foreground p-6 shadow-hard font-mono text-sm leading-relaxed">
          <div className="flex gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-neo-red inline-block" />
            <span className="w-3 h-3 rounded-full bg-neo-yellow inline-block" />
            <span className="w-3 h-3 rounded-full bg-neo-green inline-block" />
          </div>
          <p className="text-muted-foreground">sanu@kali:~</p>
          <p>$ cat skills.txt</p>
          <p className="text-neo-cyan">- Network Security</p>
          <p className="text-neo-cyan">- Penetration Testing</p>
          <p className="text-neo-cyan">- Vulnerability Assessment</p>
          <p className="text-neo-cyan">- Security Architecture</p>
          <p className="text-neo-cyan">- Incident Response</p>
          <p className="text-neo-cyan">- Cryptography</p>
          <br />
          <p>$ ls projects/</p>
          <p className="text-neo-yellow">secure-chat-app.py</p>
          <p className="text-neo-yellow">intrusion-detection.js</p>
          <p className="text-neo-yellow">vulnerability-scanner.go</p>
          <p className="text-neo-yellow">encryption-tool.cpp</p>
          <p className="text-neo-green cursor-blink">$ </p>
        </div>
      </div>

      {/* About text */}
      <div className="md:col-span-7 flex flex-col justify-center reveal">
        <h2 className="text-6xl font-black uppercase mb-6">About Me</h2>
        <p className="font-mono text-xl leading-relaxed mb-6">
          I'm a passionate cybersecurity specialist with expertise in{" "}
          <span className="bg-neo-yellow px-1 border border-foreground">ethical hacking</span>,{" "}
          <span className="bg-neo-green px-1 border border-foreground">penetration testing</span>, and{" "}
          <span className="bg-neo-cyan px-1 border border-foreground">secure system design</span>. My mission is to make the digital world safer by identifying vulnerabilities before they can be exploited.
        </p>
        <p className="font-mono text-lg mb-8 text-muted-foreground border-l-4 border-neo-blue pl-4">
          With experience in various security domains and a deep understanding of hacker methodologies, I provide comprehensive security solutions that protect organizations from emerging threats.
        </p>
        <div className="flex gap-4 flex-wrap">
          <div className="bg-foreground text-background px-4 py-2 font-mono text-sm border-2 border-transparent">
            📍 Odisha, India
          </div>
          <div className="bg-neo-green text-foreground px-4 py-2 font-mono text-sm border-2 border-foreground">
            🟢 STATUS: DEFENDING
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
