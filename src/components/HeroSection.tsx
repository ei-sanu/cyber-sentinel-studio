import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Download } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const handleDownload = () => {
    window.location.href = "someshCV.pdf";
    setShowDownloadDialog(false);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-20 relative overflow-hidden border-b-4 border-foreground">
      {/* Decorative shapes */}
      <div className="absolute top-1/3 left-[10%] w-16 h-16 bg-neo-blue border-4 border-foreground shadow-hard animate-bounce hidden lg:block rotate-12" />
      <div className="absolute bottom-1/3 right-[10%] w-24 h-24 bg-neo-green rounded-full border-4 border-foreground shadow-hard hidden lg:block animate-pulse" />
      <div className="absolute top-20 right-20 text-9xl opacity-5 font-black select-none pointer-events-none">CYBER</div>

      <div className="relative z-10 text-center max-w-5xl">
        {/* Status badge */}
        <div className="inline-block bg-background border-2 border-foreground px-4 py-1 mb-6 shadow-hard rotate-[-2deg] reveal">
          <span className="font-mono font-bold text-neo-green bg-foreground px-2 mr-2">●</span>
          <span className="font-mono font-bold">SYSTEM STATUS: SECURED</span>
        </div>

        {/* Title */}
        <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter mb-4 reveal">
          CYBERSECURITY<br />
          <span className="text-background text-stroke-black">ENTHUSIAST</span>
        </h1>

        {/* Tagline */}
        <p className="font-mono text-sm sm:text-lg md:text-2xl max-w-3xl mx-auto mb-6 bg-neo-green border-2 border-foreground p-3 sm:p-4 shadow-hard reveal rotate-1">
          Full-Stack Developer & Blue Team Defender.<br />
          <b>React • No-SQL & P-SQL • AUTH • Security</b>
        </p>

        {/* Terminal */}
        <div className="max-w-md mx-auto mb-8 bg-foreground text-neo-green border-2 border-foreground p-4 shadow-hard font-mono text-left text-sm reveal">
          <div className="flex gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-neo-red inline-block" />
            <span className="w-3 h-3 rounded-full bg-neo-yellow inline-block" />
            <span className="w-3 h-3 rounded-full bg-neo-green inline-block" />
          </div>
          <p>sanu@kali:~</p>
          <p>$ whoami</p>
          <p className="text-neo-cyan">blue-team-defender | full-stack-dev<span className="cursor-blink"></span></p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 reveal">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="neo-btn bg-foreground text-background border-2 border-foreground px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl shadow-hard hover:bg-neo-yellow hover:text-foreground"
          >
            VIEW PROJECTS
          </a>
          <button
            onClick={() => setShowDownloadDialog(true)}
            className="neo-btn bg-background text-foreground border-2 border-foreground px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl shadow-hard hover:bg-neo-pink hover:text-foreground flex items-center justify-center gap-2"
          >
            <Download size={20} /> DOWNLOAD CV
          </button>
        </div>
      </div>

      {/* Download Confirmation Dialog */}
      <AlertDialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <AlertDialogContent className="border-4 border-foreground shadow-hard bg-background max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-2xl uppercase tracking-tight border-b-4 border-foreground pb-3">
              🔐 Download Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-mono pt-4 text-foreground">
              <div className="bg-neo-blue/10 border-2 border-foreground p-4 mb-4">
                <p className="font-bold mb-2">⚠️ SECURITY CHECK</p>
                <p>You are about to download my CV. This document contains my professional information.</p>
              </div>
              <p className="font-semibold">Do you wish to proceed with the download?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3">
            <AlertDialogCancel className="neo-btn bg-background border-2 border-foreground shadow-hard hover:bg-neo-red hover:text-background font-bold uppercase">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDownload}
              className="neo-btn bg-neo-green border-2 border-foreground shadow-hard hover:bg-foreground hover:text-background font-bold uppercase"
            >
              ✓ Proceed Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default HeroSection;
