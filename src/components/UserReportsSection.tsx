import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Comment, supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import { Check, Send, Star, Terminal, X } from "lucide-react";
import { useEffect, useState } from "react";

const defaultReports = [
  {
    id: "001",
    color: "neo-green",
    borderHover: "hover:border-neo-green/50",
    from: "Client @ Freelance Project",
    quote: "Somesh delivered a secure, high-performance web app that exceeded all expectations. Truly understands both dev and security.",
    isComment: false,
  },
  {
    id: "002",
    color: "neo-blue",
    borderHover: "hover:border-neo-blue/50",
    from: "Team Lead @ University Project",
    quote: "Fast, reliable, and actually has good taste in design. A rare combination of full-stack skills and security mindset.",
    isComment: false,
  },
  {
    id: "003",
    color: "neo-pink",
    borderHover: "hover:border-neo-pink/50",
    from: "Peer @ LPU",
    quote: "Cleanest code I've seen. He knows how to handle complex state management and secure architecture.",
    isComment: false,
  },
  {
    id: "004",
    color: "neo-yellow",
    borderHover: "hover:border-neo-yellow/50",
    from: "Mentor @ Cybersecurity Lab",
    quote: "Outstanding blue team skills. His threat hunting and incident response work is top-notch.",
    isComment: false,
  },
  {
    id: "005",
    color: "neo-orange",
    borderHover: "hover:border-neo-orange/50",
    from: "Client @ Web Dev Project",
    quote: "Highly intuitive UX. Delivered exactly what we needed with bulletproof security built in from day one.",
    isComment: false,
  },
];

const colorMap: Record<string, string> = {
  "neo-green": "hsl(134 100% 60%)",
  "neo-blue": "hsl(217 91% 60%)",
  "neo-pink": "hsl(340 100% 72%)",
  "neo-yellow": "hsl(59 100% 64%)",
  "neo-orange": "hsl(34 100% 55%)",
};

const colors = ["neo-green", "neo-blue", "neo-pink", "neo-yellow", "neo-orange"];

const MAX_COMMENT_LENGTH = 300;

const UserReportsSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showTerminal, setShowTerminal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [reports, setReports] = useState<any[]>(defaultReports);
  const [showSuccess, setShowSuccess] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    // Combine default reports with user comments
    const commentReports = comments.map((comment, index) => ({
      id: `comment-${comment.id}`,
      color: colors[index % colors.length],
      borderHover: `hover:border-${colors[index % colors.length]}/50`,
      from: comment.user_name || "Anonymous",
      quote: comment.text,
      isComment: true,
      createdAt: comment.created_at,
    }));

    // Interleave comments with default reports
    const combined = [...defaultReports, ...commentReports];
    setReports(combined);
  }, [comments]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = () => {
    setShowTerminal(true);
    setTerminalLines([
      "$ initializing terminal...",
      "$ loading comment system v2.0.1",
      "$ system ready. type your message below:",
    ]);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Comment cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    if (commentText.length > MAX_COMMENT_LENGTH) {
      toast({
        title: 'Validation Error',
        description: `Comment must be ${MAX_COMMENT_LENGTH} characters or less.`,
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      setTerminalLines(prev => [...prev, "$ submitting comment...", "$ encrypting data..."]);

      const commentData = {
        text: commentText.trim(),
        user_id: user?.uid || null,
        user_name: user?.displayName || 'Anonymous',
      };

      const { data, error } = await supabase
        .from('comments')
        .insert([commentData])
        .select()
        .single();

      if (error) throw error;

      setTerminalLines(prev => [...prev, "$ SUCCESS: comment published!", "$ adding to marquee feed..."]);
      setShowSuccess(true);

      setTimeout(() => {
        setComments([data, ...comments]);
        setCommentText('');
        setShowTerminal(false);
        setShowSuccess(false);
        setTerminalLines([]);

        toast({
          title: '✓ Success!',
          description: 'Your comment is now live in the feed!',
        });
      }, 2000);

    } catch (error: any) {
      console.error('Error posting comment:', error);

      // Detailed error logging
      const errorMessage = error?.message || 'Unknown error';
      const errorDetails = error?.details || '';
      const errorHint = error?.hint || '';

      setTerminalLines(prev => [
        ...prev,
        "$ ERROR: failed to submit comment",
        `$ ${errorMessage}`,
        "$ please try again"
      ]);

      toast({
        title: 'Error',
        description: `Failed to post comment: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseTerminal = () => {
    setShowTerminal(false);
    setCommentText('');
    setTerminalLines([]);
    setShowSuccess(false);
  };

  return (
    <section id="reports" className="py-24 bg-foreground border-t-4 border-foreground overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-2 bg-background/5 border-2 border-background/10 p-4 shadow-hard flex-wrap">
            <div className="flex gap-2">
              <div className="h-3 w-3 bg-neo-red rounded-full border border-foreground animate-pulse" />
              <div className="h-3 w-3 bg-neo-yellow rounded-full border border-foreground" />
              <div className="h-3 w-3 bg-neo-green rounded-full border border-foreground" />
            </div>
            <h2 className="font-mono text-background text-xl font-bold ml-4 tracking-tighter">USER_REPORTS.txt</h2>
            <div className="ml-2 md:ml-8 px-2 bg-neo-blue text-foreground text-[10px] font-black uppercase animate-pulse">LIVE_FEED</div>
          </div>

          <button
            onClick={handleAddComment}
            className="neo-btn bg-neo-green text-foreground border-2 border-background px-4 md:px-6 py-3 font-black shadow-hard hover:bg-neo-yellow hover:scale-105 transition-all duration-300 flex items-center gap-2 uppercase text-xs md:text-sm w-full md:w-auto justify-center"
          >
            <Terminal size={20} />
            Add Your Comment
          </button>
        </div>
      </div>

      {/* Terminal Comment Box */}
      {showTerminal && (
        <div className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-3xl bg-background border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-bottom-4 duration-500">
            {/* Terminal Header */}
            <div className="bg-foreground border-b-4 border-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 bg-neo-red rounded-full border border-background hover:scale-110 transition-transform cursor-pointer" onClick={handleCloseTerminal} />
                  <div className="h-3 w-3 bg-neo-yellow rounded-full border border-background" />
                  <div className="h-3 w-3 bg-neo-green rounded-full border border-background" />
                </div>
                <span className="font-mono text-background text-sm font-bold">root@sentinel:~/comments#</span>
              </div>
              <button
                onClick={handleCloseTerminal}
                className="text-background hover:text-neo-red transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-6 bg-foreground font-mono text-sm min-h-[400px]">
              {/* Terminal Output */}
              <div className="mb-6 space-y-2 min-h-[100px]">
                {terminalLines.map((line, index) => (
                  <div
                    key={index}
                    className="text-neo-blue font-bold text-base animate-in fade-in slide-in-from-left-2 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Success Animation */}
              {showSuccess && (
                <div className="mb-4 p-4 bg-neo-green/20 border-2 border-neo-green animate-in zoom-in duration-500">
                  <div className="flex items-center gap-3 text-neo-green font-bold">
                    <Check size={24} className="animate-in zoom-in duration-300" />
                    <span className="animate-in slide-in-from-right-2 duration-500">COMMENT SUCCESSFULLY ADDED TO FEED!</span>
                  </div>
                </div>
              )}

              {/* Comment Form */}
              {!showSuccess && (
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-foreground">
                      <Terminal size={16} className="text-neo-blue" />
                      <span className="font-bold text-xs">
                        USER: {user?.displayName || 'Anonymous'} |
                        CHARS: {commentText.length}/{MAX_COMMENT_LENGTH}
                      </span>
                    </div>
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="> type your comment here..."
                      className="w-full min-h-[150px] bg-foreground/5 border-2 border-foreground p-4 font-mono text-foreground focus:outline-none focus:border-neo-green focus:bg-foreground/10 transition-all resize-none"
                      disabled={isLoading}
                      maxLength={MAX_COMMENT_LENGTH}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isLoading || !commentText.trim()}
                      className="flex-1 neo-btn bg-neo-green text-foreground border-2 border-foreground px-6 py-3 font-black shadow-hard hover:bg-neo-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase transition-all duration-300 hover:scale-105"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Submit Comment
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseTerminal}
                      className="neo-btn bg-neo-red text-foreground border-2 border-foreground px-6 py-3 font-black shadow-hard hover:bg-background hover:text-foreground transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Marquee */}
      <div className="marquee-container group">
        <div className="marquee-content flex gap-8 py-12 px-4 select-none">
          {/* Original + duplicate set for seamless loop */}
          {[...reports, ...reports].map((r, i) => (
            <div
              key={`${r.id}-${i}`}
              className={`flex-shrink-0 w-[90vw] sm:w-[400px] md:w-[450px] max-w-[450px] bg-foreground border-4 border-background/10 p-8 shadow-hard ${r.borderHover} hover:-translate-y-2 transition-all duration-500 relative overflow-hidden text-left whitespace-normal animate-in fade-in slide-in-from-right-8`}
              style={{ animationDelay: `${i * 50}ms` }}
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
                  {r.isComment ? `COMMENT_${r.id.split('-')[1]?.substring(0, 6)}.log` : `REPORT_${r.id}.log`}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  {r.isComment && r.createdAt
                    ? formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })
                    : '2026.txt'
                  }
                </div>
              </div>
              <div className="font-mono text-muted-foreground text-[10px] mb-2 uppercase tracking-tight">
                FROM: {r.from}
              </div>
              <p className="font-bold text-xl leading-snug mb-6 text-background/90">"{r.quote}"</p>
              {!r.isComment && (
                <div className="flex gap-1 text-lg" style={{ color: `${colorMap[r.color]}99` }}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
              )}
              {r.isComment && (
                <div className="flex items-center gap-2">
                  <Terminal size={14} style={{ color: colorMap[r.color] }} />
                  <span className="text-xs font-mono font-bold" style={{ color: colorMap[r.color] }}>
                    PUBLIC_COMMENT
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserReportsSection;
