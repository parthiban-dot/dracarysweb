"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Flame, Sparkles } from "lucide-react";
import Link from "next/link";

interface HistoryItem {
  type: "command" | "output" | "error" | "ascii";
  text?: string;
  lines?: string[];
  links?: { label: string; href: string }[];
}

const DRAGON_ASCII = [
  "              /|   /|",
  "             / |__/_|__",
  "           /  /     \\  \\",
  "          /  |  O O  |  \\      🔥 DRACARYS 🔥",
  "         |   |   ^   |   |     \"Build • Compete • Learn • Ship\"",
  "         |    \\_ - _/    |",
  "         /               \\",
  "        /  /\\         /\\  \\",
  "       (  (  \\       /  )  )",
  "        \\_\\_  \\_____/  /_/_",
  "",
  "   [+] The dragon is awake. Ready to deploy the future.",
];

export function TerminalAnimation() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "DRACARYS Enterprise Core [Version 2.4.0]" },
    { type: "output", text: "Environment: Production • Architecture: Next.js + PostgreSQL" },
    { type: "output", text: "Type 'help' or click the quick action chips below." },
    { type: "output", text: "" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: HistoryItem[] = [
      ...history,
      { type: "command", text: `$ ${cmdRaw.trim()}` },
    ];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          lines: [
            "Available DRACARYS commands:",
            "  dracarys    - Unleash the dragon easter egg 🔥",
            "  projects    - List active production deployments",
            "  team        - View core engineering roster",
            "  status      - Display system telemetry",
            "  join        - Apply to join the engineering cohort",
            "  clear       - Wipe terminal screen",
          ],
        });
        break;

      case "dracarys":
      case "dragon":
      case "fire":
        newHistory.push({
          type: "ascii",
          lines: DRAGON_ASCII,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          lines: [
            "Active Production Projects:",
            "  • TrueVault       - Zero-knowledge client-encrypted vault",
            "  • HostelHub       - Smart campus accommodation infrastructure",
            "  • LLM Evaluator   - Automated prompt benchmark platform",
            "  • SIET BGV        - Background verification verification engine",
          ],
          links: [
            { label: "View All Projects →", href: "/projects" },
          ],
        });
        break;

      case "team":
        newHistory.push({
          type: "output",
          lines: [
            "DRACARYS Engineering Roster:",
            "  • Parthiban V      - Founder & Lead Architect",
            "  • Student Engineers across Systems, AI, & Full-Stack cohorts",
          ],
          links: [
            { label: "Meet Full Team →", href: "/team" },
            { label: "Founder Profile →", href: "/founder" },
          ],
        });
        break;

      case "status":
        newHistory.push({
          type: "output",
          lines: [
            "SYSTEM STATUS: 100% OPERATIONAL",
            "  • Database: Connected (Prisma Singleton)",
            "  • Deployment: Edge Vercel Network",
            "  • Active Hackathons: 3+ Participated",
            "  • Open for Contracts: YES",
          ],
        });
        break;

      case "join":
      case "apply":
        newHistory.push({
          type: "output",
          lines: [
            "Membership Applications are currently OPEN.",
            "Complete your developer profile in the join cohort portal.",
          ],
          links: [
            { label: "Open Application Form →", href: "/join" },
          ],
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "error",
          text: `dracarys: command not found: '${cmd}'. Type 'help' for valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  const chips = [
    { label: "help", cmd: "help" },
    { label: "dracarys 🔥", cmd: "dracarys" },
    { label: "projects", cmd: "projects" },
    { label: "status", cmd: "status" },
    { label: "clear", cmd: "clear" },
  ];

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full h-[400px] md:h-[420px] rounded-2xl border border-white/10 bg-black/90 shadow-2xl overflow-hidden flex flex-col font-mono relative group cursor-text"
    >
      {/* Terminal Header */}
      <div className="h-11 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between shrink-0 select-none">
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs text-white/40 ml-2 font-mono hidden sm:inline-block">
            dracarys@terminal: ~
          </span>
        </div>
        <div className="flex items-center text-xs text-primary/80 gap-1.5 font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>interactive bash</span>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={scrollRef}
        className="p-5 flex-1 overflow-y-auto text-xs md:text-sm leading-relaxed text-white/80 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10"
      >
        {history.map((item, i) => (
          <div key={i} className="min-h-[1.25rem]">
            {item.type === "command" && (
              <span className="text-primary font-bold">{item.text}</span>
            )}
            {item.type === "output" && (
              <>
                {item.text && <div>{item.text}</div>}
                {item.lines?.map((line, idx) => (
                  <div key={idx} className="text-white/70">
                    {line}
                  </div>
                ))}
                {item.links && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-primary/20 text-primary border border-primary/40 text-xs font-semibold hover:bg-primary/30 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
            {item.type === "ascii" && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 my-2 text-primary font-bold leading-tight">
                {item.lines?.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            )}
            {item.type === "error" && (
              <span className="text-red-400">{item.text}</span>
            )}
          </div>
        ))}

        {/* Active Command Line Input */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold shrink-0">visitor@dracarys:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs md:text-sm p-0 m-0 focus:ring-0"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>

      {/* Quick Action Chips Footer */}
      <div className="p-2.5 border-t border-white/10 bg-white/[0.02] flex items-center gap-2 overflow-x-auto select-none shrink-0">
        <span className="text-[10px] text-white/30 uppercase tracking-wider shrink-0 hidden sm:inline-block pl-2">
          Presets:
        </span>
        {chips.map((chip) => (
          <button
            key={chip.cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(chip.cmd);
            }}
            className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-colors shrink-0"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}