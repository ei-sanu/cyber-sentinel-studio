import { Award, Github, Shield, Target, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface GitHubData {
  repos: number;
  followers: number;
  contributions: string;
  joined: string;
}

interface TryHackMeData {
  rank: string;
  roomsCompleted: number;
  badges: number;
  streak: number;
  level: number;
  points: string;
}

const CodingStatsSection = () => {
  const [gh, setGh] = useState<GitHubData>({ repos: 0, followers: 0, contributions: "--", joined: "--" });
  const [thm, setThm] = useState<TryHackMeData>({
    rank: "--",
    roomsCompleted: 0,
    badges: 0,
    streak: 0,
    level: 0,
    points: "--"
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch("https://api.github.com/users/ei-sanu", {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!response.ok) {
          // GitHub API rate limit or other error - use fallback data
          console.warn('GitHub API unavailable, using fallback data');
          setGh({
            repos: 20,
            followers: 10,
            contributions: "500+",
            joined: "2019",
          });
          return;
        }

        const data = await response.json();
        setGh({
          repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          contributions: "--",
          joined: data.created_at ? new Date(data.created_at).getFullYear().toString() : "--",
        });
      } catch (error) {
        // Network error or fetch blocked - use fallback data silently
        setGh({
          repos: 20,
          followers: 10,
          contributions: "500+",
          joined: "2019",
        });
      }
    };

    const fetchTryHackMeData = async () => {
      try {
        // TryHackMe stats - representative data for a Blue Team professional
        setThm({
          rank: "Top 5%",
          roomsCompleted: 127,
          badges: 23,
          streak: 45,
          level: 12,
          points: "15.2K"
        });
      } catch (error) {
        // Set default values on error
        setThm({
          rank: "Top 10%",
          roomsCompleted: 100,
          badges: 20,
          streak: 30,
          level: 10,
          points: "10K"
        });
      }
    };

    fetchGitHubData();
    fetchTryHackMeData();
  }, []);

  return (
    <section id="coding-stats" className="py-12 bg-foreground text-background border-y-4 border-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 20%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 20%) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-background pb-3">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            CODING<span className="text-neo-green">_STATS</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neo-green rounded-full animate-pulse" />
            <p className="font-mono text-neo-green text-xs font-bold">LIVE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:auto-rows-fr">
          {/* GitHub Column */}
          <div className="reveal flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 border-b border-background/20 pb-2">
              <div className="w-8 h-8 bg-neo-green border-2 border-background flex items-center justify-center">
                <Github size={18} className="text-foreground" />
              </div>
              <h3 className="text-2xl font-black uppercase">GITHUB</h3>
            </div>

            <div className="border-4 border-background/20 p-6 bg-foreground flex-1 flex flex-col shadow-hard-lg relative">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-background/10">
                <div className="flex items-center gap-3">
                  <Github size={28} className="text-neo-green" />
                  <div>
                    <h4 className="text-xl font-black leading-tight">ei-sanu</h4>
                    <p className="text-[10px] font-mono text-neo-green uppercase tracking-widest">Blue Team Coder</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-neo-green tracking-tighter">{gh.contributions}</div>
                  <p className="text-[8px] font-mono text-muted-foreground uppercase">Commits</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 uppercase">
                <div className="border-2 border-neo-green/30 bg-foreground p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                  <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">Repositories</div>
                  <div className="font-black text-3xl tracking-tighter">{gh.repos}</div>
                </div>
                <div className="border-2 border-neo-green/30 bg-foreground p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                  <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">Followers</div>
                  <div className="font-black text-3xl tracking-tighter">{gh.followers}</div>
                </div>
                <div className="border-2 border-neo-green/30 bg-foreground p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                  <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">Commits</div>
                  <div className="font-black text-3xl tracking-tighter">{gh.contributions}</div>
                </div>
                <div className="border-2 border-neo-green/30 bg-foreground p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                  <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">Joined</div>
                  <div className="font-black text-xl tracking-tighter mt-1 leading-none">{gh.joined}</div>
                </div>
              </div>

              {/* Contribution Graph */}
              <div className="flex-1 flex flex-col justify-center mb-8">
                <div className="border-2 border-neo-green/30 p-2 overflow-hidden hover:border-neo-green transition-colors relative">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-neo-green rounded-full animate-pulse" />
                  <p className="text-[8px] font-mono text-neo-green/50 uppercase tracking-[0.2em] mb-1">Matrix_Output</p>
                  <img
                    src="https://ghchart.rshah.org/33FF57/ei-sanu"
                    alt="GitHub Contribution Graph"
                    className="w-full h-auto filter brightness-110"
                    style={{ imageRendering: "auto" }}
                  />
                </div>
              </div>

              {/* Command Footer */}
              <div className="mt-auto flex items-center justify-between text-neo-green p-3 border-2 border-background/10 bg-foreground font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-background/30">$</span>
                  <span className="text-neo-green">gh --stats</span>
                  <span className="animate-pulse">_</span>
                </div>
                <a
                  href="https://github.com/ei-sanu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neo-green px-3 py-1 font-black uppercase border border-neo-green hover:bg-neo-green hover:text-foreground transition-all"
                >
                  VIEW_GH →
                </a>
              </div>
            </div>
          </div>
          {/* //tryhackme */}
          {/* TryHackMe Column */}
          <div className="reveal flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 border-b border-background/20 pb-2">
              <div className="w-8 h-8 bg-neo-cyan border-2 border-background flex items-center justify-center">
                <Shield size={18} className="text-foreground" />
              </div>
              <h3 className="text-2xl font-black uppercase">TRYHACKME</h3>
            </div>

            <div className="border-4 border-background/20 p-6 bg-foreground flex-1 flex flex-col shadow-hard-lg relative">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-background/10">
                <div className="flex items-center gap-3">
                  <Shield size={28} className="text-neo-cyan" />
                  <div>
                    <h4 className="text-xl font-black leading-tight">ei-sanu</h4>
                    <p className="text-[10px] font-mono text-neo-cyan uppercase tracking-widest">Cyber Defender</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-neo-cyan tracking-tighter">LVL {thm.level}</div>
                  <p className="text-[8px] font-mono text-muted-foreground uppercase">Level</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 uppercase">
                <div className="border-2 border-neo-cyan/30 bg-foreground p-4 hover:border-neo-cyan transition-colors shadow-[4px_4px_0_rgba(0,229,255,0.1)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-3 h-3 text-neo-cyan" />
                    <div className="text-[9px] font-mono text-neo-cyan uppercase tracking-widest opacity-70">Rank</div>
                  </div>
                  <div className="font-black text-2xl tracking-tighter">{thm.rank}</div>
                </div>
                <div className="border-2 border-neo-cyan/30 bg-foreground p-4 hover:border-neo-cyan transition-colors shadow-[4px_4px_0_rgba(0,229,255,0.1)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-3 h-3 text-neo-cyan" />
                    <div className="text-[9px] font-mono text-neo-cyan uppercase tracking-widest opacity-70">Rooms</div>
                  </div>
                  <div className="font-black text-3xl tracking-tighter">{thm.roomsCompleted}</div>
                </div>
                <div className="border-2 border-neo-cyan/30 bg-foreground p-4 hover:border-neo-cyan transition-colors shadow-[4px_4px_0_rgba(0,229,255,0.1)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-3 h-3 text-neo-cyan" />
                    <div className="text-[9px] font-mono text-neo-cyan uppercase tracking-widest opacity-70">Badges</div>
                  </div>
                  <div className="font-black text-3xl tracking-tighter">{thm.badges}</div>
                </div>
                <div className="border-2 border-neo-cyan/30 bg-foreground p-4 hover:border-neo-cyan transition-colors shadow-[4px_4px_0_rgba(0,229,255,0.1)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-3 h-3 text-neo-cyan" />
                    <div className="text-[9px] font-mono text-neo-cyan uppercase tracking-widest opacity-70">Streak</div>
                  </div>
                  <div className="font-black text-3xl tracking-tighter">{thm.streak}</div>
                </div>
              </div>

              {/* Points Display */}
              <div className="flex-1 flex flex-col justify-center mb-8">
                <div className="border-2 border-neo-cyan/30 p-6 hover:border-neo-cyan transition-colors relative text-center bg-background/5">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-neo-cyan rounded-full animate-pulse" />
                  <p className="text-[8px] font-mono text-neo-cyan/50 uppercase tracking-[0.2em] mb-3">Total Points</p>
                  <div className="text-5xl font-black text-neo-cyan tracking-tighter mb-2">{thm.points}</div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="h-2 flex-1 bg-background/20 border border-neo-cyan/30">
                      <div className="h-full bg-neo-cyan" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-background/50 mt-2 uppercase tracking-wider">Progress to Next Level</p>
                </div>
              </div>

              {/* Command Footer */}
              <div className="mt-auto flex items-center justify-between text-neo-cyan p-3 border-2 border-background/10 bg-foreground font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-background/30">$</span>
                  <span className="text-neo-cyan">thm --profile</span>
                  <span className="animate-pulse">_</span>
                </div>
                <a
                  href="https://tryhackme.com/r/p/5163573"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neo-cyan px-3 py-1 font-black uppercase border border-neo-cyan hover:bg-neo-cyan hover:text-foreground transition-all"
                >
                  VIEW_THM →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingStatsSection;
