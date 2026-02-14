const MarqueeBanner = () => (
  <div className="border-b-4 border-foreground bg-neo-blue py-3 relative z-20">
    <div className="marquee-container font-mono font-bold text-2xl text-background">
      <div className="marquee-content">
        {[1, 2].map((i) => (
          <span key={i} className="whitespace-nowrap">
            &nbsp;/// BLUE TEAM DEFENDER /// NETWORK SECURITY /// PENETRATION TESTING /// INCIDENT RESPONSE /// THREAT HUNTING /// VULNERABILITY ASSESSMENT /// SECURE BY DEFAULT&nbsp;
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default MarqueeBanner;
